export default function About() {
  return (
    <div className="bg-black text-black font-sans min-h-screen">
      <div className="bg-white max-w-screen-2xl mx-auto min-h-screen">
        {/* Hero */}
        <section className="relative text-white text-center pt-20 pb-28 px-8 sm:px-12 lg:px-16" style={{ backgroundColor: '#e11d48' }}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
          ></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 leading-tight">About</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              The 26th Philippine Computing Science Congress (PCSC 2026) is organized by the Computing Society of the Philippines to enable local and neighboring computing educators, researchers, ICT professionals, and students to interact and share their work in computing, computer science, computational science, and ICT.
            </p>
          </div>
        </section>

        <main className="px-8 sm:px-12 lg:px-16 pt-12 pb-16">
          <div className="space-y-24">
          {/* Conference Objectives */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Conference Objectives</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-2">Knowledge Sharing</h3>
                <p>Facilitate the exchange of cutting-edge research findings, innovative solutions, and best practices in computing science and related fields.</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-2">Networking</h3>
                <p>Create opportunities for researchers, educators, industry professionals, and students to build meaningful connections and collaborations.</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p>Showcase emerging technologies, innovative research methodologies, and breakthrough applications in computing science.</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p>Provide learning opportunities through workshops, tutorials, and presentations that advance the field of computing education.</p>
              </div>
            </div>
          </section>

          {/* About CSP */}
          <section>
            <h2 className="text-3xl font-bold mb-4">About the Computing Society of the Philippines</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <p className="text-lg leading-relaxed">
                  The Computing Society of the Philippines (CSP) is the premier organization for computing professionals, educators, and researchers in the Philippines. Founded to advance the field of computing science and technology, CSP has been at the forefront of promoting excellence in computing education, research, and practice.
                </p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <p className="text-lg leading-relaxed">
                  Through initiatives like the Philippine Computing Science Congress, CSP continues to foster innovation, collaboration, and knowledge sharing within the computing community, contributing to the technological advancement of the Philippines.
                </p>
              </div>
            </div>
          </section>

          {/* Host Institution */}
          <section>
            <h2 className="text-3xl font-bold mb-2">Host Institution</h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-semibold mb-2">University of the Immaculate Conception</h3>
                <p className="mb-1">Davao City, Philippines</p>
                <p className="text-lg leading-relaxed mt-4">
                  The University of the Immaculate Conception (UIC) is a prestigious Catholic institution founded in 1905 by the Religious of the Virgin Mary (RVM). From its humble beginnings as "Escuela Catolica de San Pedro," UIC has evolved into a premier university, achieving university status in 1992. Today, it stands as a leader in science and technology education in Mindanao, with ISO 9001:2015 certification and multiple PAASCU-accredited programs.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>1905</div>
                  <div>Founded</div>
                </div>
                <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>ISO 9001:2015</div>
                  <div>Certified</div>
                </div>
                <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>PAASCU</div>
                  <div>Accredited Programs</div>
                </div>
                <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>Mindanao</div>
                  <div>STEM Leader</div>
                </div>
              </div>
            </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}


