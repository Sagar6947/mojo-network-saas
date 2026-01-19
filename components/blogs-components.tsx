export default function BlogsPage() {
  return (
    <>
      <section className="py-20 bg-[#fef5f9]">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-4xl font-bold mb-2">
              Discover How <span className="text-red-600">Mojo</span> Works
            </h2>
            <p className="text-gray-600 mb-6">
              Watch our tutorials and guides to master the Mojo platform.
            </p>

            <div className="space-y-4">
              <a
                href="https://youtu.be/gDdtGj1nVxY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/gDdtGj1nVxY/hqdefault.jpg"
                  alt="How to Start Your Own News Channel"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">
                  How to Start Your Own News Channel
                </p>
              </a>

              <a
                href="https://youtu.be/nxWel9WiTgA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/nxWel9WiTgA/hqdefault.jpg"
                  alt="Mojo Dashboard Walkthrough"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">
                  Mojo Dashboard Walkthrough
                </p>
              </a>

              <a
                href="https://youtu.be/qmuwGWziRMc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/qmuwGWziRMc/hqdefault.jpg"
                  alt="Monetisation & Ads on Mojo"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">
                  Monetisation & Ads on Mojo
                </p>
              </a>

              <a
                href="https://youtu.be/VLwDwhEL568"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/VLwDwhEL568/hqdefault.jpg"
                  alt="Live Streaming Your Mojo Projects"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">Live Streaming Your Mojo Projects</p>
              </a>

              <a
                href="https://youtu.be/25p53M0IT-4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/25p53M0IT-4/hqdefault.jpg"
                  alt="Tips to Grow Your Mojo Channel"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">Tips to Grow Your Mojo Channel</p>
              </a>

              <a
                href="https://youtu.be/Ni7LhXZF3ok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/Ni7LhXZF3ok/hqdefault.jpg"
                  alt="Advanced Mojo Features & Tricks"
                  className="w-24 h-16 object-cover rounded"
                />
                <p className="text-black font-medium">Advanced Mojo Features & Tricks</p>
              </a>
            </div>

            <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Subscribe to Our YouTube Channel
            </button>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <img
              src="/images/mojo-blogs.png"
              alt="Mojo Platform Dashboard"
              className="w-full max-w-lg rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
