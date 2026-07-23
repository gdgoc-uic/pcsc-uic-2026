import PageHero from "../../components/sections/PageHero";

export default function SRWPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero
        title="Student Research Workshop"
        description="Opportunities for students to present and receive feedback."
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-rose-100">Details coming soon.</p>
      </section>
    </main>
  );
}
