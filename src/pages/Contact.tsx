import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-black text-black font-sans min-h-screen">
      {/* Black borders on left and right, white content area in center */}
      <div className="bg-white max-w-screen-2xl mx-auto min-h-screen">
        <main className="px-8 sm:px-12 lg:px-16 py-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight">Contact Us</h1>
          <p className="text-lg mb-10 leading-relaxed">
            Get in touch with the PCSC 2026 organizing committee. Have questions about the conference? 
            We're here to help. Reach out to our organizing committee for any inquiries regarding registration, 
            submissions, or general conference information.
          </p>

          <div className="space-y-8">
            {/* Get in Touch Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
                  <p className="mb-2">For general questions about the conference</p>
                  <a href="mailto:info@pcsc2026.org" className="text-[#e11d48] underline hover:opacity-80">
                    info@pcsc2026.org
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Paper Submissions</h3>
                  <p className="mb-2">For questions about paper submissions and reviews</p>
                  <a href="mailto:papers@pcsc2025.org" className="text-[#e11d48] underline hover:opacity-80">
                    papers@pcsc2025.org
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Registration</h3>
                  <p className="mb-2">For registration and payment inquiries</p>
                  <a href="mailto:registration@pcsc2026.org" className="text-[#e11d48] underline hover:opacity-80">
                    registration@pcsc2026.org
                  </a>
                </div>
              </div>
            </div>

            {/* Host Institution Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Host Institution</h2>
              <div className="mb-2">
                <h3 className="text-xl font-bold mb-2">University of the Immaculate Conception</h3>
                <p className="mb-1">Father Selga Street, Davao City 8000</p>
                <p>Davao del Sur, Philippines</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#e11d48] focus:border-[#e11d48]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#e11d48] focus:border-[#e11d48]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#e11d48] focus:border-[#e11d48]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#e11d48] focus:border-[#e11d48]"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="submission">Paper Submission</option>
                    <option value="registration">Registration</option>
                    <option value="venue">Venue Information</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#e11d48] focus:border-[#e11d48]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#e11d48] text-white px-8 py-3 hover:opacity-90 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


