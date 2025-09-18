# PCSC UIC 2026 - Conference Website

Official website for the **26th Philippine Computing Science Congress (PCSC 2026)** hosted by the University of the Immaculate Conception, Davao City.

## 🎯 About PCSC 2026

The 26th Philippine Computing Science Congress is organized by the Computing Society of the Philippines to enable local and neighboring computing educators, researchers, ICT professionals, and students to interact and share their work.


## 🚀 Tech Stack

- **Frontend:** React 19.1.1 with TypeScript
- **Build Tool:** Vite 7.1.6
- **Styling:** Tailwind CSS 4.1.13
- **Routing:** React Router DOM 7.9.1
- **Package Manager:** Bun
- **Linting:** ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── Footer.tsx      # Site footer
│   └── Navbar.tsx      # Navigation bar
├── layouts/            # Layout components
│   └── MainLayout.tsx  # Main application layout
├── pages/              # Page components
│   ├── Home.tsx        # Landing page with countdown
│   ├── Program.tsx     # Conference program
│   ├── Registration.tsx # Registration information
│   ├── CallForPapers.tsx # Call for papers details
│   ├── Venue.tsx       # Venue information
│   └── ...             # Other conference pages
├── assets/             # Static assets
│   └── font/           # Custom Helvetica Neue fonts
├── router.tsx          # Application routing
└── main.tsx           # Application entry point
```

## 🛠️ Development Setup

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pcsc-uic-2026
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `bun dev` - Start development server with hot reload
- `bun build` - Build for production
- `bun preview` - Preview production build locally
- `bun lint` - Run ESLint for code quality
