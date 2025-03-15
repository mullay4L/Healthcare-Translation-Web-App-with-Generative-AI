# Healthcare Translation Web App with Generative AI

## Overview
A web-based prototype for real-time multilingual translation between patients and healthcare providers, built in <24 hours using generative AI for Nao Medical’s pre-interview assignment.

## Live Demo
- **URL:** healthcareai-ashy.vercel.app

## Features
- **Voice-to-Text:** Real-time transcription via Web Speech API, optimized for medical terms.
- **Real-Time Translation:** Powered by OpenAI API for accurate multilingual translation.
- **Audio Playback:** Text-to-speech playback of translations using Web Speech Synthesis.
- **Mobile-First Design:** Responsive UI built with Tailwind CSS and V0 for mobile and desktop.
- **Security:** HTTPS via Vercel, no persistent data storage (client-side processing), Session Timeout to prevent sensitive data laying around.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (via V0)
- **AI Tools:** OpenAI API (translation), V0 (UI generation), Grok by xAI (coding assistance)
- **Deployment:** Vercel

## Installation
### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (or pnpm, yarn, bun)

### Setup
Clone the repo and install dependencies:
```bash
git clone <your-github-repo-url>
cd <repo-name>
npm install
