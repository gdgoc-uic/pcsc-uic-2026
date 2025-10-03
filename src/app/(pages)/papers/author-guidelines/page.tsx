import PageHero from "../../components/sections/PageHero";

export default function AuthorGuidelinesPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Author Guidelines" description="Templates, submission rules, and camera-ready instructions." />
      <section className="mx-auto max-w-7xl px-6 py-10 space-y-4">
        <a className="text-rose-100 underline underline-offset-4" href="https://pcsc.dlsu.edu.ph/">Visit official guidelines</a>
        <ul className="list-disc pl-6 text-rose-100 text-sm">
          <li>Use PCSC template; 6–8 pages including references.</li>
          <li>Double-blind review: remove names/affiliations and self-citations.</li>
          <li>Do not include acknowledgments during review.</li>
        </ul>
      </section>
    </main>
  );
}


