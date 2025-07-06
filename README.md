
# 🧾 Health Report OCR App

This web app allows users to upload health reports (PDFs or images), automatically extract key parameters using OCR (Google Vision API), and view the data in a clean, interactive table with basic insights and trend simulation.

---

## 🔥 Features

- 📤 Upload PDF or image lab reports  
- 🔍 Extract health data using Google Vision API (OCR)  
- 📊 Interactive table displaying parameters, values, units, ranges  
- 🚩 AI-powered flagging of abnormal values (e.g. "Needs Attention")  
- 📈 Basic trend simulation using dummy historical data  
- 🔐 Secure login/auth with `next-auth`  
- ⚡ Clean, responsive UI built with TailwindCSS  
- ☁️ Backend powered by Node.js & Next.js API routes  

---

## 📁 Project Structure

```
/app
  /api/upload         ← Google Vision OCR API handler
  /pages/components   ← UploadForm component
  /pages/utils        ← Health report parser
  /auth               ← NextAuth config
  /page.tsx           ← Home page logic
/public
/gcloud
  vision-key.json     ← Your Google Vision credentials (keep private)
/.env.local           ← Environment variables
```

---

## 🛠 Tech Stack

| Layer       | Tools                     |
|-------------|---------------------------|
| Frontend    | Next.js (App Router), Tailwind CSS |
| Backend     | Node.js, Next.js API Routes |
| OCR         | Google Cloud Vision API   |
| Auth        | NextAuth.js               |
| Charts      | Recharts (for trends)     |
| Parsing     | Custom JS-based regex parser |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/health-report-ocr-app.git
cd health-report-ocr-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Google Vision API

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a service account with **Vision API access**
- Generate a JSON key
- Save it in a secure folder: `gcloud/vision-key.json`

### 4. Create `.env.local`

```env
GOOGLE_APPLICATION_CREDENTIALS=./gcloud/vision-key.json
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### 5. Start Dev Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage Guide

1. **Login** via the built-in `/login` route  
2. Upload a sample lab report (PDF or image)  
3. Wait for OCR extraction via Google Vision  
4. View structured data in a table  
5. See flagged abnormalities and simulated trends  

---

## 🧠 Future Ideas

- PDF parsing with `pdf-parse` or image conversion  
- Integration with real EHR APIs (like HL7/FHIR)  
- User profile & report history  
- Real-time AI suggestions or chatbot  
- Export to Excel/CSV  

---

## 🔐 Notes

- Keep your `vision-key.json` file **out of version control**
- Never expose secrets in client-side code
- This is a demo project — not HIPAA compliant for real medical data

---

## 🤝 Contributions

PRs and feature suggestions are welcome! If you’re interested in extending this further with AI or data viz, open an issue or reach out.

---

## 📧 Contact

Built by **Aditya Singh**  
📩 Email: ad69832@gmail.com  
🔗 GitHub: [@adiiityasiingh](https://github.com/adiiityasiingh)
