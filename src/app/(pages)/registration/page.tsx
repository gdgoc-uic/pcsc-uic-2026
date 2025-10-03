import PageHero from "../../components/sections/PageHero";

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Registration" description="Register to attend the conference and workshops." />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <a
          className="inline-flex rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          href="https://pcsc.dlsu.edu.ph/#registration"
        >
          Go to Registration
        </a>
      </section>
    </main>
  );
}


