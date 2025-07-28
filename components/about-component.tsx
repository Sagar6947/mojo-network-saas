export default function AboutPage() {
  return (
    <>
      <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">About Us </h1>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src="/images/main-banner1.png"
              alt="Empowering Every Voice to Become a News Channel"
              className="max-w-full h-auto"
            />
          </div>

          <div>
            <h4 className="text-red-600 font-semibold uppercase mb-2">
              Who We Are
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Empowering Every Voice to Become a News Channel
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
            At <b>Mojo India Network</b>, we empower everyday storytellers, citizen reporters, and aspiring journalists to build their own <b>hyperlocal</b> digital news channels—right from their smartphones. Whether you're covering local events, community updates, or regional politics, our all-in-one <b>SaaS</b> platform gives you the tools to publish instantly, grow your brand, and earn revenue—without needing a technical background.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">
            Our Core Values That Drive Every Story
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border rounded-xl shadow-md pt-0 pb-6 p-0 transition hover:shadow-lg">
              <img
                src="/images/about/1.png"
                alt="Customer Centricity"
                className="w-full mx-auto mb-0 h-64"
              />
              <div className="pt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-sm pt-0 p-3">
                  To empower individuals and communities to become storytellers
                  by providing easy-to-use, AI-powered mobile journalism tools
                  that make publishing hyperlocal news accessible to everyone.
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-md pt-0 pb-6 p-0 transition hover:shadow-lg">
              <img
                src="/images/about/2.png"
                alt="Customer Centricity"
                className="w-full mx-auto mb-0 h-64"
              />
              <div className="pt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-sm pt-0 p-3">
                  To redefine journalism by enabling a decentralized network of
                  digital news creators who share real stories from real
                  people—building a more informed, connected, and democratic
                  world.
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-md pt-0 pb-6 p-0 transition hover:shadow-lg">
              <img
                src="/images/about/3.png"
                alt="Customer Centricity"
                className="w-full mx-auto mb-0 h-64"
              />
              <div className="pt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Our Core Values
                </h3>
                <p className="text-gray-600 text-sm pt-0 p-3">
                  At Mojo India Network, we believe in empowerment giving every
                  individual the voice and tools to become a news creator. With
                  a strong focus on innovation, we simplify journalism through
                  smart, accessible technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
