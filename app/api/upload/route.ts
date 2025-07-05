import { NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import pdf from 'pdf-parse';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function POST(req: Request) {
  console.log('API: POST request received');
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    console.log('API: No file provided');
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  console.log('API: File received:', file.name, file.size, 'bytes');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    let extractedText = '';

    // Check file type and process accordingly
    if (file.name.toLowerCase().endsWith('.pdf')) {
      console.log('API: Processing PDF file...');
      try {
        const pdfData = await pdf(buffer);
        extractedText = pdfData.text;
        console.log('API: PDF text length:', extractedText.length);
        console.log('API: PDF first 100 chars:', extractedText.substring(0, 100));
      } catch (pdfError) {
        console.error('API: PDF parsing error:', pdfError);
        return NextResponse.json({ error: 'PDF parsing failed' }, { status: 500 });
      }
    } else if (file.name.toLowerCase().endsWith('.txt')) {
      console.log('API: Processing text file...');
      extractedText = buffer.toString('utf-8');
      console.log('API: Text file length:', extractedText.length);
      console.log('API: Text first 100 chars:', extractedText.substring(0, 100));
    } else {
      // Process as image using Google Vision API
      console.log('API: Processing image file with Google Vision...');
      try {
        const [result] = await client.textDetection({ image: { content: buffer } });
        extractedText = result.textAnnotations?.[0]?.description || '';
        console.log('API: OCR result length:', extractedText.length);
        console.log('API: OCR first 100 chars:', extractedText.substring(0, 100));
      } catch (visionError) {
        console.error('API: Google Vision error:', visionError);
        return NextResponse.json({ error: 'Image OCR failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('API: Processing Error:', error);
    return NextResponse.json({ error: 'File processing failed' }, { status: 500 });
  }
}
