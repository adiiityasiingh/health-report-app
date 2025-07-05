import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

interface TrendData {
  date: string;
  Hemoglobin: number;
  WBC: number;
  Platelets: number;
}

export default function TrendChart({ data }: { data: TrendData[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadChart = async () => {
    if (chartRef.current) {
      const png = await toPng(chartRef.current);
    const link = document.createElement('a');
    link.download = 'health_trends.png';
    link.href = png;
    link.click();
  };
  return (
    <div className="mt-10 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Health Parameter Trends</h2>
      <div ref={chartRef}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Hemoglobin" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="WBC" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="Platelets" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      </div>
      <button
        onClick={downloadChart}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download as Image
      </button>
    </div>
  );
}
}