import PageHero from "@/app/components/sections/PageHero";

const ContactPage = () => {
  return (
    <div className="pt-[116px] bg-brick-red-950">
      <PageHero title="Contact Us" />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Contact Information Section */}
        <section aria-label="Contact Information" className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
            Get in Touch
          </h2>
          
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* CSP Leadership */}
            <div className="rounded-lg border border-brick-red-600 bg-brick-red-800 p-8 sm:p-10 ring-1 ring-white/5">
              <h3 className="text-2xl font-semibold text-white mb-6">CSP Leadership</h3>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Dr. Cherry Lyn Sta. Romana */}
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brick-red-400 to-brick-red-600 flex-shrink-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                    CS
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words">
                      Dr. Cherry Lyn Sta. Romana
                    </h4>
                    <p className="text-sm sm:text-base text-white mb-2">CSP President</p>
                    <a 
                      href="mailto:cstaromana@gmail.com" 
                      className="text-sm sm:text-base text-white hover:text-white transition-colors duration-200 underline underline-offset-4 break-all"
                    >
                      cstaromana@gmail.com
                    </a>
                  </div>
                </div>

                {/* Dr. Judith J. Azcarraga */}
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brick-red-500 to-brick-red-700 flex-shrink-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                    JA
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words">
                      Dr. Judith J. Azcarraga
                    </h4>
                    <p className="text-sm sm:text-base text-white mb-1">CSP Vice President</p>
                    <p className="text-sm sm:text-base text-rose-100/90 mb-2">PCSC 2026 Conference Chair</p>
                    <a 
                      href="mailto:judith.azcarraga@dlsu.edu.ph" 
                      className="text-sm sm:text-base text-white hover:text-white transition-colors duration-200 underline underline-offset-4 break-all"
                    >
                      judith.azcarraga@dlsu.edu.ph
                    </a>
                  </div>
                </div>  
              </div>
            </div>

            {/* PCSC 2026 Organizing Team */}
            <div className="rounded-lg border border-brick-red-600 bg-brick-red-800 p-8 sm:p-10 ring-1 ring-white/5">
              <h3 className="text-2xl font-semibold text-white mb-6">PCSC 2026 Organizing Team</h3>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Ms. Kristine Mae M. Adlaon */}
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brick-red-600 to-brick-red-800 flex-shrink-0 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                    KA
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words">
                      Ms. Kristine Mae M. Adlaon
                    </h4>
                    <p className="text-sm sm:text-base text-white mb-1">CSP Board Secretary</p>
                    <p className="text-sm sm:text-base text-white mb-2">PCSC 2026 Local-Conference Chair</p>
                    <a 
                      href="mailto:kadlaon@uic.edu.ph" 
                      className="text-sm sm:text-base text-white hover:text-white transition-colors duration-200 underline underline-offset-4 break-all"
                    >
                      kadlaon@uic.edu.ph
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


