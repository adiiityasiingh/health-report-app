'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UploadForm from './pages/components/UploadForm';
import { parseHealthReport } from './pages/utils/parseReport';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [structuredData, setStructuredData] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [router, status]);

  const handleExtractedText = (text: string) => {
    console.log('handleExtractedText called with:', text);
    const parsed = parseHealthReport(text);
    console.log('Extracted Text:', text);
    console.log('Parsed Data:', parsed);

    setStructuredData(parsed as never[]);
    console.log('setStructuredData called with:', parsed);
  };

  if (status === 'loading') return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Health Report Extractor</h2>
      <UploadForm onTextExtracted={handleExtractedText} />



      {structuredData.length > 0 && (
        <div className="mt-6 bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Extracted Parameters:</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1">Parameter</th>
                <th className="px-2 py-1">Value</th>
                <th className="px-2 py-1">Unit</th>
                <th className="px-2 py-1">Range</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {structuredData.map((item: { parameter: string; value: number; unit: string; range: string; status: string }, i: number) => (
                <tr key={i} className="border-t">
                  <td className="px-2 py-1">{item.parameter}</td>
                  <td className="px-2 py-1">{item.value}</td>
                  <td className="px-2 py-1">{item.unit}</td>
                  <td className="px-2 py-1">{item.range}</td>
                  <td className={`px-2 py-1 ${item.status === 'Needs Attention' ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
