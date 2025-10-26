# PCSC-UIC 2026 Conference Website

A modern, responsive website for the 26th Philippine Computing Science Congress (PCSC-UIC 2026) organized by the Computing Society of the Philippines. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional interface with tribal pattern elements
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Animations**: GSAP-powered scroll animations and transitions
- **Conference Information**: Complete program schedule, venue details, and important dates
- **Paper Submission**: Call for papers with detailed guidelines and submission portal
- **Contact Information**: Leadership and organizing committee details
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP with ScrollTrigger
- **Icons**: Lucide React
- **Linting**: Biome
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/           # Route groups for pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── papers/        # Call for papers
│   │   ├── program/       # Conference program
│   │   ├── registration/  # Registration page
│   │   ├── srw/          # Student Research Workshop
│   │   └── venue/        # Venue information
│   ├── components/
│   │   ├── layouts/       # Header, Footer, Tribal Pattern
│   │   └── sections/      # Reusable page sections
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── public/                # Static assets
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pcsc-uic-2026
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## 🎨 Key Components

### Layout Components
- **SiteHeader**: Responsive navigation with mobile menu
- **SiteFooter**: Footer with navigation links
- **TribalPattern**: SVG tribal pattern background

### Page Sections
- **Hero**: Animated hero section with rotating background images
- **ImportantDates**: Calendar-style important dates display
- **Programs**: 3-day conference program schedule
- **AreaOfInterest**: Research areas with interactive cards
- **CallforPapers**: Paper submission guidelines and portal
- **Venue**: Venue information with maps and directions

## 🎯 Conference Information

- **Event**: 26th Philippine Computing Science Congress
- **Date**: April 23-25, 2026
- **Venue**: University of the Immaculate Conception - Bajada Campus, Davao City
- **Organizer**: Computing Society of the Philippines

## 🔧 Development

### Code Quality
- TypeScript for type safety
- Biome for linting and formatting
- ESLint configuration for Next.js
- Prettier for code formatting

### Performance
- Next.js Image optimization
- GSAP animations with ScrollTrigger
- Responsive images with multiple formats
- Optimized bundle size

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

---

Built by Google Developer Groups on Campus - UIC with ❤️ for the Philippine Computing Science Congress 2026
