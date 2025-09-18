export default function CallForPapers() {
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
            <h1 className="text-6xl font-bold mb-4 leading-tight">Call for Papers</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Submit your research and contribute to the advancement of computing science in the Philippines.
            </p>
          </div>
        </section>

        <main className="px-8 sm:px-12 lg:px-16 pt-12 pb-16">
          {/* Congress Intro */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Join the 26th Philippine Computing Science Congress</h2>
            <p className="text-lg leading-relaxed max-w-4xl">
              The 26th Philippine Computing Science Congress is organized by the Computing Society of the Philippines to enable local and neighboring computing educators, researchers, information and communications technology (ICT) professionals, and students to interact and share their work in computing, computer science, computational science, and ICT.
            </p>
          </section>

          {/* Paper Submission Guidelines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Paper Submission Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="p-8" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-2xl font-semibold mb-4">Submission Portal</h3>
                <a href="#" className="inline-block text-white px-6 py-3 hover:opacity-90" style={{ backgroundColor: '#e11d48' }}>Submit Your Paper →</a>
              </div>
              <div className="p-8" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-2xl font-semibold mb-4">Format Requirements</h3>
                <ul className="space-y-2">
                  <li>• Use the prescribed PCSC 2026 template</li>
                  <li>• Minimum 6 pages, maximum 8 pages (including references)</li>
                  <li>• PDF format only</li>
                  <li>• Original work not submitted elsewhere</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Review Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Review Process</h2>
            <div className="p-8" style={{ backgroundColor: '#fef2f2' }}>
              <p className="leading-relaxed">
                All papers undergo double-blind peer review by at least two reviewers. Papers must receive an average positive rating for inclusion in the conference program and proceedings.
              </p>
            </div>
          </section>

          {/* Double-Blind Review Guidelines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Double-Blind Review Guidelines</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>1</div>
                <div>Remove author names and affiliations from the manuscript</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>2</div>
                <div>Remove citations and references that identify the authors. Use [Anonymous, 2025] format</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>3</div>
                <div>Do not include acknowledgments or funding sources</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>4</div>
                <div>For blinded references, write '[Anonymous 2026] Details omitted for double-blind reviewing.'</div>
              </div>
            </div>
          </section>

          {/* Important Dates */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Important Dates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
                <span className="font-medium">Paper Submission Deadline</span>
                <span style={{ color: '#e11d48' }}>January 15, 2026</span>
              </div>
              <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
                <span className="font-medium">Author Notification</span>
                <span style={{ color: '#e11d48' }}>February 28, 2026</span>
              </div>
              <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
                <span className="font-medium">Camera-Ready Submission</span>
                <span style={{ color: '#e11d48' }}>March 15, 2026</span>
              </div>
              <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
                <span className="font-medium">Early-Bird Registration</span>
                <span style={{ color: '#e11d48' }}>March 31, 2026</span>
              </div>
              <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
                <span className="font-medium">Conference Dates</span>
                <span style={{ color: '#e11d48' }}>April 23-25, 2026</span>
              </div>
            </div>
          </section>

          {/* Student Research Workshop */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Student Research Workshop</h2>
            <div className="p-8" style={{ backgroundColor: '#fef2f2' }}>
              <p className="leading-relaxed mb-4">
                The PCSC 2026 Student Research Workshop invites students at various stages of their research to present their work and receive mentorship and feedback from the research community.
              </p>
              <p className="leading-relaxed">
                This is an opportunity to present exciting contributions that showcase innovative technologies and detail preliminary experiments that foster discussions to provoke new ideas.
              </p>
              <a href="#" className="inline-block mt-6 text-white px-6 py-3 hover:opacity-90" style={{ backgroundColor: '#e11d48' }}>Learn More →</a>
            </div>
          </section>

          {/* Areas of Interest */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Areas of Interest</h2>
            <p className="mb-6">Include (But are Not Limited to)</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Artificial Intelligence</h3>
                <ul className="text-sm space-y-1">
                  <li>• Natural Language Processing</li>
                  <li>• Machine Learning</li>
                  <li>• Computer Vision</li>
                  <li>• Intelligent Systems</li>
                  <li>• Affective and Empathic Computing</li>
                </ul>
              </div>

              {/* CS Theory */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Computer Science Theory</h3>
                <ul className="text-sm space-y-1">
                  <li>• Computational Theory and Algorithms</li>
                  <li>• Data Structures</li>
                  <li>• Complexity Theory</li>
                  <li>• Formal Methods</li>
                  <li>• Cryptography</li>
                </ul>
              </div>

              {/* Systems & Networks */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Systems & Networks</h3>
                <ul className="text-sm space-y-1">
                  <li>• Computer Networks</li>
                  <li>• Distributed Systems</li>
                  <li>• Operating Systems</li>
                  <li>• Cybersecurity</li>
                  <li>• Cloud Computing</li>
                </ul>
              </div>

              {/* Software Engineering */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Software Engineering</h3>
                <ul className="text-sm space-y-1">
                  <li>• Software Development</li>
                  <li>• Software Architecture</li>
                  <li>• Testing and Quality Assurance</li>
                  <li>• Agile Methodologies</li>
                  <li>• DevOps</li>
                </ul>
              </div>

              {/* Data & Information */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Data & Information</h3>
                <ul className="text-sm space-y-1">
                  <li>• Databases and Information Retrieval</li>
                  <li>• Data Mining</li>
                  <li>• Big Data Analytics</li>
                  <li>• Information Systems</li>
                  <li>• Data Visualization</li>
                </ul>
              </div>

              {/* Emerging Technologies */}
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <h3 className="text-xl font-semibold mb-3">Emerging Technologies</h3>
                <ul className="text-sm space-y-1">
                  <li>• Ubiquitous and Pervasive Computing</li>
                  <li>• Internet of Things (IoT)</li>
                  <li>• Blockchain Technology</li>
                  <li>• Quantum Computing</li>
                  <li>• Modeling and Simulation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-white px-6 py-3 hover:opacity-90" style={{ backgroundColor: '#e11d48' }}>Submit Paper</a>
              <a href="#" className="px-6 py-3 underline" style={{ color: '#e11d48' }}>Author Guidelines</a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}


