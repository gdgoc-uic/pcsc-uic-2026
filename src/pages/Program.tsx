 

export default function Program() {
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
            <h1 className="text-6xl font-bold mb-4 leading-tight">Conference Program</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">Two days of innovation, learning, and networking</p>
            <p className="text-lg opacity-90">April 23–25, 2026</p>
          </div>
        </section>

        <main className="px-8 sm:px-12 lg:px-16 pt-12 pb-16">
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <strong className="text-sm tracking-wide" style={{ color: '#e11d48' }}>WEDNESDAY • APRIL 23, 2026</strong>
                <h3 className="text-xl font-semibold mt-2">Day 1: Innovative Technologies Unveiled</h3>
                <p className="text-sm mt-2">Keynotes and sessions on ML/AI, software engineering, and data science.</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <strong className="text-sm tracking-wide" style={{ color: '#e11d48' }}>THURSDAY • APRIL 24, 2026</strong>
                <h3 className="text-xl font-semibold mt-2">Day 2: Shaping Tomorrow's Tech Future</h3>
                <p className="text-sm mt-2">Keynote, SRW, posters, and emerging technologies tracks.</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
                <strong className="text-sm tracking-wide" style={{ color: '#e11d48' }}>FRIDAY • APRIL 25, 2026</strong>
                <h3 className="text-xl font-semibold mt-2">Day 3: Research Excellence & Future Directions</h3>
                <p className="text-sm mt-2">Best papers, awards, and closing ceremony.</p>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Friday, April 25, 2026</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Morning Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">8:00 – 9:00 AM</div>
                  <div className="text-sm">Final Registration & Morning Coffee — Last chance for registration</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">9:00 – 10:00 AM</div>
                  <div className="text-sm">Keynote Address — "Research Excellence in Computing Science" (Speaker: TBA)</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">10:00 – 11:30 AM</div>
                  <div className="text-sm">Best Paper Session — Presentations of outstanding research papers</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">11:30 – 12:00 PM</div>
                  <div className="text-sm">Coffee Break — Networking and refreshments</div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Afternoon Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">12:00 – 1:00 PM</div>
                  <div className="text-sm">Closing Lunch — Farewell networking lunch</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">1:00 – 2:30 PM</div>
                  <div className="text-sm">Research Collaboration Forum — Future directions and opportunities</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">2:30 – 3:30 PM</div>
                  <div className="text-sm">Awards Ceremony — Recognition of outstanding papers and contributions</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">3:30 – 4:00 PM</div>
                  <div className="text-sm">Closing Ceremony — Thank you remarks and PCSC 2027 announcement</div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Thursday, April 24, 2026</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Morning Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">8:00 – 9:00 AM</div>
                  <div className="text-sm">Registration & Morning Coffee — Final registration</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">9:00 – 10:00 AM</div>
                  <div className="text-sm">Keynote Address — "Computing Education for the Next Generation" (Speaker: TBA)</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">10:00 – 11:30 AM</div>
                  <div className="text-sm">Student Research Workshop — Presentations and mentorship sessions</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">11:30 – 12:00 PM</div>
                  <div className="text-sm">Coffee Break — Networking and refreshments</div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Afternoon Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">12:00 – 1:00 PM</div>
                  <div className="text-sm">Lunch Break — Final networking lunch</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">1:00 – 2:30 PM</div>
                  <div className="text-sm">Poster Session — Interactive presentations and discussions</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">2:30 – 3:30 PM</div>
                  <div className="text-sm">Technical Session 4: Emerging Technologies — Blockchain, IoT, and more</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">3:30 – 4:30 PM</div>
                  <div className="text-sm">Industry Panel Discussion — Computing trends and industry perspectives</div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Wednesday, April 23, 2026</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Morning Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">8:00 – 9:00 AM</div>
                  <div className="text-sm">Registration & Welcome Coffee — Network with fellow attendees</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">9:00 – 9:30 AM</div>
                  <div className="text-sm">Opening Ceremony — Welcome remarks from CSP President and UIC officials</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">9:30 – 10:30 AM</div>
                  <div className="text-sm">Keynote Address — "The Future of AI in Southeast Asia" (Speaker: TBA)</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">10:30 – 11:00 AM</div>
                  <div className="text-sm">Coffee Break — Networking opportunity</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">11:00 – 12:00 PM</div>
                  <div className="text-sm">Technical Session 1: Machine Learning & AI — Research paper presentations</div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-2">Afternoon Session</h3>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">12:00 – 1:00 PM</div>
                  <div className="text-sm">Lunch Break — Networking lunch</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">1:00 – 2:00 PM</div>
                  <div className="text-sm">Technical Session 2: Software Engineering — Trends and practices</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">2:00 – 3:00 PM</div>
                  <div className="text-sm">Technical Session 3: Data Science & Analytics — Big data and analytics</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">3:00 – 3:30 PM</div>
                  <div className="text-sm">Afternoon Break — Coffee and networking</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">3:30 – 4:30 PM</div>
                  <div className="text-sm">Panel Discussion — "Industry–Academia Collaboration in the Digital Age"</div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#fef2f2' }}>
                  <div className="font-medium">4:30 – 5:30 PM</div>
                  <div className="text-sm">Technology Demonstrations — Innovative computing technologies and solutions</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </div>
  );
}


