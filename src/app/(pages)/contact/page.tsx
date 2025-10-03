import PageHero from "@/app/components/sections/PageHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Contact Us" description="Reach out for inquiries and support." />
      <section className="mx-auto max-w-7xl px-6 py-10 space-y-2">
        <p className="text-rose-100">Email: <a className="underline underline-offset-4" href="mailto:itconf@mail.com">itconf@mail.com</a></p>
        <p className="text-rose-100">Phone: <a className="hover:text-rose-50" href="tel:+1800123456789">+1 800 123 456 789</a></p>
      </section>
    </main>
  );
}


