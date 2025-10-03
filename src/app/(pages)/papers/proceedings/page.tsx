import PageHero from "../../components/sections/PageHero";

export default function ProceedingsPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Proceedings" description="Access conference proceedings and archives." />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-rose-100">Proceedings link will be available after the conference.</p>
      </section>
    </main>
  );
}


