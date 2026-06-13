# ⚖️ QanoonAI - آپ کا قانونی معاون

**QanoonAI** is an AI-powered Pakistani Legal Assistant that helps citizens understand Pakistani law, get legal guidance, search case law, and generate legal documents — in both **Urdu and English**.

> QanoonAI ایک AI پر مبنی پاکستانی قانونی معاون ہے جو شہریوں کو پاکستانی قانون سمجھنے، قانونی رہنمائی حاصل کرنے، مقدمات تلاش کرنے اور قانونی دستاویزات بنانے میں مدد کرتا ہے۔

---

## ✨ Features / خصوصیات

- 🤖 **AI Legal Chat** — Ask legal questions in Urdu or English and get expert-level answers powered by GPT
- 📄 **Document Generator** — Generate rental agreements, affidavits, power of attorney, and more
- 🔍 **Case Search** — Search Pakistani case law and legal precedents
- 🇵🇰 **Bilingual Support** — Full Urdu and English interface
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- ⚡ **Fast & Modern** — Built with Next.js 14 and FastAPI

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14, TypeScript, Tailwind CSS |
| Backend    | Python FastAPI                    |
| AI         | OpenAI GPT-4                      |
| Database   | SQLite                            |
| Deployment | Docker (optional)                 |

---

## 📁 Project Structure

```
QanoonAI/
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable components
│   │   └── lib/            # Utility functions
│   ├── package.json
│   └── tailwind.config.js
├── backend/                # FastAPI backend
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic & AI
│   ├── models/             # Data models
│   ├── data/               # Legal data
│   └── main.py
├── docker-compose.yml
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- OpenAI API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/QanoonAI.git
cd QanoonAI
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Run the backend server
uvicorn main:app --reload --port 8000
```

The backend API will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local if needed

# Run the development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

---

### 4. Docker Setup (Optional)

```bash
# From the project root
docker-compose up --build
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
APP_ENV=development
CORS_ORIGINS=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📖 Usage Guide

### AI Legal Chat
1. Navigate to the **Chat** page
2. Select your preferred language (Urdu/English)
3. Type your legal question
4. Receive AI-powered legal guidance

**Example questions:**
- "What are my rights as a tenant in Pakistan?"
- "پاکستان میں طلاق کا طریقہ کار کیا ہے؟"
- "How do I file an FIR?"

### Document Generator
1. Navigate to the **Documents** page
2. Select document type (Rental Agreement, Affidavit, etc.)
3. Fill in the required details
4. Generate and download your document

### Case Search
1. Navigate to the **Cases** page
2. Enter keywords, case number, or legal topic
3. Browse relevant case summaries

---

## 📸 Screenshots

> Screenshots will be added after the first deployment.

| Page | Description |
|------|-------------|
| Home | Landing page with hero section and feature cards |
| Chat | AI legal chat interface with bilingual support |
| Documents | Legal document generator with form UI |
| Cases | Case law search interface |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend code
- Follow PEP 8 for Python code
- Write tests for new features
- Update documentation as needed

---

## ⚠️ Disclaimer

QanoonAI provides general legal information for educational purposes only. It does **not** constitute legal advice. For specific legal matters, please consult a qualified lawyer.

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ for Pakistan's legal community.

---

## 🌟 Star this repo if you find it helpful!
