// server/visionClient.js
import vision from '@google-cloud/vision';
import path from 'path';

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, 'credentials', 'vision-key.json'),
});

export default client;
