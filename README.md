# Healthcare Translation Web App with Generative AI

## Overview
This project is a **Healthcare Translation Web App** powered by **Generative AI** to provide real-time voice-to-text transcription and translation, with a focus on medical terminology.

## Features
- **Voice-to-Text**: Uses Web Speech API for speech recognition.
- **Real-Time Translation**: AI-powered translation with accurate handling of medical terminology.
- **Audio Playback**: Listen to translations via text-to-speech.
- **Mobile-First Design**: Fully responsive for both mobile and desktop use.
- **Secure Handling of Sensitive Data**: `.env` file ensures API keys are not exposed.

## Installation
### Prerequisites
Ensure you have the following installed:
- **pnpm** (Preferred package manager)
- **Node.js** (Recommended: v18+)

### Installing Dependencies
Since this project uses `pnpm`, install dependencies using:
```bash
pnpm install
```
If you prefer `npm`, remove `pnpm-lock.yaml` and run:
```bash
npm install
```

## Running the Application
To start the development server:
```bash
pnpm start
```
For npm:
```bash
npm start
```

## Environment Variables
Create a `.env` file and add the required API keys:
```
REACT_APP_API_KEY=your-api-key-here
```
**Note:** Ensure `.env` is included in `.gitignore` to prevent exposing sensitive data.

## Deployment
This project can be deployed on platforms like **Vercel** or **V0**. To deploy:
1. **Export your CodeSandbox project to GitHub**.
2. **Connect GitHub to Vercel/V0** and deploy the repository.

## Security Considerations
- API keys should never be hardcoded in the repository.
- No data is stored permanently.
- Consider adding session timeouts for added privacy.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

---
Let me know if you need any modifications! 🚀

