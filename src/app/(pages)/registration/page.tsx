import PageHero from "../../components/sections/PageHero";

export default function RegistrationPage() {
  return (
    <main className="pt-20 min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Registration" />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center">
          <p className="text-lg mb-6">Registration details will be announced soon. Please stay updated via our Facebook page.</p>
          <a
            className="inline-flex rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            href="https://fb.com/csp.pcsc2026"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Facebook
          </a>
        </div>
      </section>
    </main>
  );
}


