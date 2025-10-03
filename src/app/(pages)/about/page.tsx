import PageHero from "@/app/components/sections/PageHero";

const AboutPage = () => {
  return (
    <div className="pt-20 bg-rose-900">
      <PageHero title="About"/>

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* About CSP Section */}
        <section aria-label="About CSP" className="mb-20">
          <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 sm:p-10 ring-1 ring-white/5">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50">
              Computing Society of the Philippines
            </h2>
            
            <div className="mt-6 space-y-6 text-rose-100/90 leading-relaxed">
              <p className="text-lg">
                The Computing Society of the Philippines is a professional organization of
                computing researchers and educators in the Philippines.
              </p>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-rose-50 mb-3">Mission</h3>
                <p>
                  Recognizing the importance of a scientific culture among the Filipino people, the
                  Computing Society of the Philippines shall encourage and promote the advancement of
                  Computing Science and Technology.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-rose-50 mb-3">Objectives</h3>
                <p className="mb-4">The Society has the following objectives:</p>
                <ul className="space-y-3 ml-6">
                  <li className="flex gap-3">
                    <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                    <span>Promote research and development in Computing Science</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                    <span>Contribute in the improvement of Computing Science education, specially at the
                    tertiary and graduate levels</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                    <span>Promote the exchange of knowledge in Computing Science</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                    <span>Advocate for progressive policies and programs that affect the computing sector</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                    <span>Establish linkages with other organizations in the pursuit of common goals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About PCSC Section */}
        <section aria-label="About PCSC" className="mb-20">
          <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 sm:p-10 ring-1 ring-white/5">
            <h2 className="text-3xl font-bold tracking-tight text-rose-50">
              Philippine Computing Science Congress
            </h2>
            
            <div className="mt-6 space-y-5 text-rose-100/90 leading-relaxed">
              <p className="text-lg">
                The Philippine Computing Science Congress (PCSC) is an annual conference organized by
                the Computing Society of the Philippines to enable local and neighboring computing
                educators, researchers, ICT professionals, and students to interact and to share their
                work in computing, computer science, computational science, and information and
                communications technology (ICT).
              </p>
              <p>
                The conference features special lectures by prominent researchers and educators and
                contributed papers in ICT, computing, computer science, computational science, and
                related disciplines.
              </p>
            </div>
          </div>
        </section>

        {/* Committees Section */}
        <section aria-label="Committees">
          <h2 className="text-3xl font-bold tracking-tight text-rose-50 mb-8">Committees</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 ring-1 ring-white/5">
              <h3 className="text-xl font-semibold text-rose-50 mb-6">Organizing Committee</h3>
              <ul className="space-y-6 text-rose-100/90">
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    JA
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">General Chair</span>
                    <span>Dr. Judith J. Azcarraga</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    KA
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Local Chair</span>
                    <span>Ms. Kristine Mae M. Adlaon</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    MR
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Secretariat</span>
                    <span>Mr. Mon Rodriguez, Ma'am Tita Herradura</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    JA
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">General Program Chair</span>
                    <span>Dr. Judith J. Azcarraga</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    MB
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Documentation and Social Media Team</span>
                    <span>Mr. Michel Bolo</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    AO
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Webmaster</span>
                    <span>Al Gabriel Orig</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-rose-200/20 bg-rose-950/40 p-8 ring-1 ring-white/5">
              <h3 className="text-xl font-semibold text-rose-50 mb-6">Review Committee</h3>
              <ul className="space-y-6 text-rose-100/90">
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    MG
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Reviewer</span>
                    <span>Dr. Maria Garcia</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    RS
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Reviewer</span>
                    <span>Prof. Roberto Santos</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    AC
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Reviewer</span>
                    <span>Dr. Ana Cruz</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    JR
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Reviewer</span>
                    <span>Prof. John Reyes</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                    LT
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-rose-300">Reviewer</span>
                    <span>Dr. Lisa Torres</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;


