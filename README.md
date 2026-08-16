# Aditya Anil Kokate - Portfolio

Welcome to the source code of my personal portfolio website! 🚀

This is a modern, responsive, and highly interactive portfolio built to showcase my experience, projects, and research in **Agentic AI**, **GraphRAG**, and **Full-Stack Development**.

## 🌟 Features

- **Modern Tech Stack**: Built with Next.js (App Router), React, and Tailwind CSS.
- **Beautiful UI/UX**: Sleek dark mode, glassmorphism, animated Bento Grids, and fluid interactions powered by Framer Motion.
- **Terminal Aesthetics**: A unique hacker/developer aesthetic with interactive code blocks and terminal interfaces.
- **Live Contact Form**: Fully functional email dispatcher supporting Resend, Nodemailer/SMTP, and Web3Forms.
- **Responsive Design**: Optimized for seamless viewing across mobile, tablet, and desktop devices.
- **Production Ready**: Fully static and optimized deployment configuration.

## 🛠️ Technology Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS & `lucide-react` icons
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Email Service**: Resend / Web3Forms / Nodemailer

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and add your keys (for the contact form):
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` to include your `RESEND_API_KEY` or `SMTP_USER`.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Add the required environment variables (from `.env.example`) in the Vercel dashboard.
4. Deploy!

## 📄 License

© 2026 Aditya Anil Kokate. All rights reserved.
