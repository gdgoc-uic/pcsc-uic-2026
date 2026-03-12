import PageHero from "../../components/sections/PageHero";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <main className="pt-[116px] min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Registration" />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center">
          <p className="text-lg mb-6">Registration is now open. Please fill out the form below to register.</p>
          <Link
            href="https://forms.gle/hqxPkvvTMph5UgTg8"
            target="_blank"
            className="inline-flex rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            Register Now
          </Link>
        </div>
      </section>
    </main>
  );
}


