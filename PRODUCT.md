# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Computing researchers, computer science faculty, graduate and undergraduate student researchers, conference attendees, and organizing committee stakeholders participating in the 26th Philippine Computing Science Congress (PCSC-UIC 2026).

## Product Purpose

Serves as the official web platform for PCSC-UIC 2026 (April 23-25, 2026 at UIC Bajada Campus, Davao City), organized by the Computing Society of the Philippines (CSP) in partnership with Google Developer Groups on Campus - UIC. The site facilitates the full conference lifecycle: Call for Papers guidelines & submission portal, 3-day program schedule, venue and accommodation guides, Student Research Workshop (SRW) details, and post-event stakeholder evaluations with automated certificate issuance.

## Positioning

The premier annual national computer science research congress in the Philippines, uniquely combining rigorous academic dissemination with rich Mindanao cultural heritage and Davao host hospitality.

## Operating Context

Accessed on mobile, tablet, and desktop devices by users before the event (researchers submitting papers, attendees planning schedules), during the event (participants checking session rooms and program flow), and after the event (stakeholders completing evaluations and generating official certificates).

## Capabilities and Constraints

- **Capabilities**: Next.js 15/16 App Router web application, TypeScript, Tailwind CSS v4, GSAP animations with ScrollTrigger, Lucide React icons, Supabase backend integration for stakeholder evaluation submission (`/evaluation`), certificate lookup/download (`/evaluation/certificate`), and admin management portal (`/admin/*`).
- **Constraints**: Biome linting and code formatting, Next.js Turbopack build system, standard web deployment (Vercel), and strict WCAG accessibility compliance.

## Brand Commitments

- Computing Society of the Philippines (CSP) official organizational identity.
- University of the Immaculate Conception (UIC) host institution identity.
- Mindanao/Davao local tribal pattern visual accents integrated into section design.
- Built by Google Developer Groups on Campus - UIC.

## Evidence on Hand

- Project repository containing full page route structure (`src/app/(pages)`), reusable UI components (`src/app/components`), and global styles.
- Supabase SQL migrations for evaluation & certificate system in `supabase/migrations/202604230001_evaluation_and_certificates.sql`.
- SVG tribal pattern component (`src/app/components/layouts/TribalPattern.tsx`).
- Detailed README.md documenting feature routes, database setup, and conference metadata.

## Product Principles

1. **Academic & Cultural Harmony**: Balance clean, modern academic design with rich Mindanao tribal visual elements.
2. **Seamless Lifecycle Guidance**: Effortlessly escort users from paper submission to schedule browsing and certificate retrieval.
3. **Inclusive Accessibility & Speed**: Maintain full WCAG compliance, screen reader support, keyboard navigation, and fast page performance across all viewports.
4. **Reliable Stakeholder Workflows**: Ensure robust and trustworthy evaluation collection and automated certificate issuance.

## Accessibility & Inclusion

WCAG 2.2 compliance required, including semantic HTML structure, proper ARIA attributes, color contrast standards, and full keyboard navigation.
