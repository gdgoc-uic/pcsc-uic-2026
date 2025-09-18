
export default function Venue() {
  return (
    <div className="bg-black text-black font-sans min-h-screen">
      {/* Black borders on left and right, white content area in center */}
      <div className="bg-white max-w-screen-2xl mx-auto min-h-screen">
        {/* Hero */}
        <section className="relative text-white text-center pt-20 pb-28 px-8 sm:px-12 lg:px-16" style={{ backgroundColor: '#e11d48' }}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
          ></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-4 leading-tight">Venue</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              The 26th Philippine Computing Science Congress will be held at the University of the Immaculate Conception (UIC),
              one of the most prestigious universities in Mindanao and a leading institution in computer science and engineering education.
            </p>
          </div>
        </section>
        <main className="px-8 sm:px-12 lg:px-16 pt-12 pb-16">
        {/* University Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">University of the Immaculate Conception</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-6">
                UIC is strategically located in Davao City, the largest city in Mindanao, providing attendees with access to 
                modern facilities, cutting-edge technology, and the vibrant culture of the Philippines' third most populous city.
              </p>
              <p className="text-lg leading-relaxed">
                Founded in 1905, UIC has grown into a premier university and a leader in science and technology education in Mindanao. 
                It is ISO 9001:2015 certified with multiple PAASCU-accredited programs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>15,000+</div>
                <div>Students</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>8</div>
                <div>Colleges</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>1905</div>
                <div>Founded</div>
              </div>
              <div className="text-center p-6" style={{ backgroundColor: '#fef2f2' }}>
                <div className="text-4xl font-bold mb-2" style={{ color: '#e11d48' }}>Level IV</div>
                <div>Accreditation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Conference Facilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Conference Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Auditorium */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-3">Main Auditorium</h3>
              <p className="mb-4">State-of-the-art 500-seat auditorium with advanced AV equipment, perfect for keynote presentations and main sessions.</p>
              <ul className="text-sm space-y-1">
                <li>• High-definition projection systems</li>
                <li>• Professional sound system</li>
                <li>• Live streaming capabilities</li>
                <li>• Comfortable theater seating</li>
              </ul>
            </div>

            {/* Breakout Rooms */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-3">Breakout Rooms</h3>
              <p className="mb-4">Multiple flexible meeting spaces for parallel sessions, workshops, and networking activities.</p>
              <ul className="text-sm space-y-1">
                <li>• 6 rooms with 50-100 seat capacity</li>
                <li>• Interactive whiteboards</li>
                <li>• Video conferencing setup</li>
                <li>• Flexible furniture arrangement</li>
              </ul>
            </div>

            {/* Exhibition Area */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold mb-3">Exhibition Area</h3>
              <p className="mb-4">Spacious exhibition hall for poster sessions, technology demonstrations, and sponsor displays.</p>
              <ul className="text-sm space-y-1">
                <li>• 3,000 sq ft exhibition space</li>
                <li>• Professional lighting</li>
                <li>• Power and internet access</li>
                <li>• Refreshment stations</li>
              </ul>
            </div>

            {/* Computer Labs */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-3">Computer Labs</h3>
              <p className="mb-4">Modern computer laboratories equipped with the latest hardware and software for hands-on workshops.</p>
              <ul className="text-sm space-y-1">
                <li>• 40 high-performance workstations</li>
                <li>• Latest development tools</li>
                <li>• High-speed internet</li>
                <li>• 24/7 technical support</li>
              </ul>
            </div>

            {/* Networking Spaces */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Networking Spaces</h3>
              <p className="mb-4">Comfortable lounge areas and outdoor spaces designed to facilitate networking and collaboration.</p>
              <ul className="text-sm space-y-1">
                <li>• Modern lounge areas</li>
                <li>• Outdoor terraces</li>
                <li>• Coffee stations</li>
                <li>• Comfortable seating</li>
              </ul>
            </div>

            {/* Dining Facilities */}
            <div className="p-6" style={{ backgroundColor: '#fef2f2' }}>
              <div className="text-2xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-3">Dining Facilities</h3>
              <p className="mb-4">Multiple dining options on campus, from casual cafes to full-service restaurants.</p>
              <ul className="text-sm space-y-1">
                <li>• Student union food court</li>
                <li>• Faculty dining room</li>
                <li>• Coffee shops and cafes</li>
                <li>• Catering services available</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Location & Transportation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Location & Transportation</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Campus Address */}
            <div className="p-8" style={{ backgroundColor: '#fef2f2' }}>
              <h3 className="text-2xl font-semibold mb-4">Campus Address</h3>
              <div className="space-y-2">
                <p className="font-medium">University of the Immaculate Conception</p>
                <p>300 Margarita Village Rd, Buhangin</p>
                <p>Davao City, Davao del Sur</p>
                <p>Philippines</p>
                <p className="mt-4">
                  <span className="font-medium">Phone:</span> (082) 227-8192
                </p>
                <p>
                  <span className="font-medium">Website:</span> 
                  <a href="https://www.uic.edu.ph" className="underline ml-1" style={{ color: '#e11d48' }}>www.uic.edu.ph</a>
                </p>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Campus Location</h4>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.2145412050313!2d125.61870867545751!3d7.101115792902179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96c4fc4bfbf1f%3A0x41426f341bce07d5!2sUniversity%20of%20the%20Immaculate%20Conception%20-%20Bajada%20Campus!5e0!3m2!1sen!2sph!4v1758216656780!5m2!1sen!2sph" 
                  width="100%" 
                  height="300" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Transportation Options */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Transportation Options</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✈️</div>
                  <div>
                    <h4 className="font-semibold mb-2">By Air</h4>
                    <p className="mb-2"><strong>Francisco Bangoy International Airport (DVO)</strong> - 30 minutes by taxi</p>
                    <p className="mb-2"><strong>Ninoy Aquino International Airport (MNL)</strong> - 2 hour flight to Davao</p>
                    <p className="text-sm">Direct flights available from Manila, Cebu, and other major Philippine cities</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚌</div>
                  <div>
                    <h4 className="font-semibold mb-2">By Public Transit</h4>
                    <p className="mb-2"><strong>Jeepneys</strong> - Regular routes to downtown Davao</p>
                    <p className="mb-2"><strong>Buses</strong> - City buses with stops near campus</p>
                    <p className="text-sm">Affordable public transportation throughout Davao City</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚗</div>
                  <div>
                    <h4 className="font-semibold mb-2">By Car</h4>
                    <p className="mb-2">Ample parking available on campus</p>
                    <p className="mb-2">Easy access via major Davao City roads</p>
                    <p className="text-sm">Free parking for conference attendees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Nearby Attractions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
              <span className="font-medium">People's Park</span>
              <span style={{ color: '#e11d48' }}>10 minutes</span>
            </div>
            <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
              <span className="font-medium">SM City Davao</span>
              <span style={{ color: '#e11d48' }}>15 minutes</span>
            </div>
            <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
              <span className="font-medium">Roxas Avenue Night Market</span>
              <span style={{ color: '#e11d48' }}>20 minutes</span>
            </div>
            <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
              <span className="font-medium">Davao Museum</span>
              <span style={{ color: '#e11d48' }}>25 minutes</span>
            </div>
            <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#fef2f2' }}>
              <span className="font-medium">Jack's Ridge</span>
              <span style={{ color: '#e11d48' }}>30 minutes</span>
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}


