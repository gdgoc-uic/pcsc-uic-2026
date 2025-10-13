import PageHero from "@/app/components/sections/PageHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-rose-900 text-rose-50">
      <PageHero title="Contact Us" description="Reach out for inquiries and support." />
      <section className="mx-auto max-w-7xl px-6 py-10 space-y-2">
        <p className="text-rose-100">Dr. Cherry Lyn Sta. Romana</p>
        <p className="text-rose-100">CSP President</p>
        <p className="text-rose-100">Email: <a className="underline underline-offset-4" href="mailto: cstaromana@gmail.com"> cstaromana@gmail.com</a></p>
        <br></br>

        <p className="text-rose-100">Dr. Judith J. Azcarraga</p>
        <p className="text-rose-100">CSP Vice President</p>
        <p className="text-rose-100">PCSC 2026 Conference Chair</p>
        <p className="text-rose-100">Email: <a className="underline underline-offset-4" href="mailto: judith.azcarraga@dlsu.edu.ph"> judith.azcarraga@dlsu.edu.ph</a></p>
        <br></br>

        <p className="text-rose-100">Ms. Kristine Mae M. Adlaon</p>
        <p className="text-rose-100">CSP Board Secretary</p>
        <p className="text-rose-100">PCSC 2026 Local-Conference Chair</p>
        <p className="text-rose-100">Email: <a className="underline underline-offset-4" href="mailto: kadlaon@uic.edu.ph"> kadlaon@uic.edu.ph</a></p>
        <br></br>
      </section>
    </main>
  );
}


