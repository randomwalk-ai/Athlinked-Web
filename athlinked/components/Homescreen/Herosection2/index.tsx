import Image from 'next/image';

export default function Herosection2() {
  return (
    <div className="w-full bg-white">
      {/* Section 1: Everything You Need to Succeed */}
      <section className="w-full px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#525252] mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-[#525252] mb-12 max-w-3xl">
            AthLinked provides powerful tools to help young athletes showcase their talents and connect with opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Networking Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">Networking</h3>
              <p className="text-[#525252]">
                Connect directly with coaches, recruiters, and other athletes to expand your opportunities.
              </p>
            </div>

            {/* Stats Tracking Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">Stats Tracking</h3>
              <p className="text-[#525252]">
                Track and visualize performance statistics over time to measure growth and identify areas for improvement.
              </p>
            </div>

            {/* AthScore Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">AthScore</h3>
              <p className="text-[#525252]">
                Our proprietary rating system helps recruiters identify top talent based on verified performance metrics.
              </p>
            </div>

            {/* Dynamic Profiles Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">Dynamic Profiles</h3>
              <p className="text-[#525252]">
                Create comprehensive athlete profiles showcasing your skills, achievements and highlight videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#E5E5E5]"></div>

      {/* Section 2: Who We Support */}
      <section className="w-full px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#525252] mb-4">
            Who We Support
          </h2>
          <p className="text-lg text-[#525252] mb-12 max-w-3xl">
            Helping athletes grow, parents stay involved, coaches recruit, and organizations thrive with confidence and success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Athletes Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">For Athletes</h3>
              <p className="text-[#525252]">
                Connect directly with coaches, recruiters, and other athletes to expand your opportunities.
              </p>
            </div>

            {/* For Parents Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">For Parents</h3>
              <p className="text-[#525252]">
                Track and visualize performance statistics over time to measure growth and identify areas for improvement.
              </p>
            </div>

            {/* For Coaches and Recruiters Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">For Coaches and Recruiters</h3>
              <p className="text-[#525252]">
                Track and visualize performance statistics over time to measure growth and identify areas for improvement.
              </p>
            </div>

            {/* For Organization Card */}
            <div className="border border-[#E5E5E5] rounded-lg p-6 bg-white">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#525252] mb-2">For Organization</h3>
              <p className="text-[#525252]">
                Connect directly with coaches, recruiters, and other athletes to expand your opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="relative w-full px-8 py-20 md:px-16 lg:px-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Take Your Athletic Career to the Next Level?
          </h2>
          <p className="text-lg md:text-xl text-white mb-8">
            Join thousands of athletes, coaches, and recruiters already on AthLinked
          </p>
          <button className="px-10 py-4 bg-white text-[#002767] text-xl font-bold rounded-md hover:bg-gray-100 transition-colors shadow-lg">
            Join us
          </button>
        </div>
        {/* Background Image - Track */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-[#8B6F47] via-[#A0826D] to-[#8B6F47] opacity-90">
            {/* Track pattern overlay */}
            <div className="absolute inset-0 bg-[url('/assets/Homescreen/track-background.png')] bg-cover bg-center opacity-30"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

