import PageHero from "@/app/components/sections/PageHero";

const ContactPage = () => {
  return (
    <div className="pt-20 bg-rose-900">
      <PageHero title="Contact Us" description="Reach out for inquiries and support." />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Contact Information Section */}
        <section aria-label="Contact Information" className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">
            Get in Touch
          </h2>
          
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* CSP Leadership */}
            <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 sm:p-10 ring-1 ring-white/5">
              <h3 className="text-2xl font-semibold text-rose-50 mb-6">CSP Leadership</h3>
              
              <div className="space-y-8">
                {/* Dr. Cherry Lyn Sta. Romana */}
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    CS
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-rose-300 mb-1">
                      Dr. Cherry Lyn Sta. Romana
                    </h4>
                    <p className="text-rose-100/90 mb-2">CSP President</p>
                    <a 
                      href="mailto:cstaromana@gmail.com" 
                      className="text-rose-400 hover:text-rose-300 transition-colors duration-200 underline underline-offset-4"
                    >
                      cstaromana@gmail.com
                    </a>
                  </div>
                </div>

                {/* Dr. Judith J. Azcarraga */}
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    JA
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-rose-300 mb-1">
                      Dr. Judith J. Azcarraga
                    </h4>
                    <p className="text-rose-100/90 mb-1">CSP Vice President</p>
                    <p className="text-rose-100/90 mb-2">PCSC 2026 Conference Chair</p>
                    <a 
                      href="mailto:judith.azcarraga@dlsu.edu.ph" 
                      className="text-rose-400 hover:text-rose-300 transition-colors duration-200 underline underline-offset-4"
                    >
                      judith.azcarraga@dlsu.edu.ph
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* PCSC 2026 Organizing Team */}
            <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 sm:p-10 ring-1 ring-white/5">
              <h3 className="text-2xl font-semibold text-rose-50 mb-6">PCSC 2026 Organizing Team</h3>
              
              <div className="space-y-8">
                {/* Ms. Kristine Mae M. Adlaon */}
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    KA
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-rose-300 mb-1">
                      Ms. Kristine Mae M. Adlaon
                    </h4>
                    <p className="text-rose-100/90 mb-1">CSP Board Secretary</p>
                    <p className="text-rose-100/90 mb-2">PCSC 2026 Local-Conference Chair</p>
                    <a 
                      href="mailto:kadlaon@uic.edu.ph" 
                      className="text-rose-400 hover:text-rose-300 transition-colors duration-200 underline underline-offset-4"
                    >
                      kadlaon@uic.edu.ph
                    </a>
                  </div>
                </div>

                {/* General Contact */}
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    PC
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-rose-300 mb-1">
                      General Inquiries
                    </h4>
                    <p className="text-rose-100/90 mb-2">For general questions about PCSC 2026</p>
                    <a 
                      href="mailto:info@pcsc2026.org" 
                      className="text-rose-400 hover:text-rose-300 transition-colors duration-200 underline underline-offset-4"
                    >
                      info@pcsc2026.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;


