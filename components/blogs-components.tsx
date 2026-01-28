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
                href="https://youtu.be/zElO4imjvoE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/zElO4imjvoE/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to create channel on Mojo Network
                </p>
              </a>

              <a
                href="https://youtu.be/8dvirqA49hM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/8dvirqA49hM/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to Post News on Mojo Network
                </p>
              </a>

              <a
                href=" https://youtu.be/DewXfLcOzXY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/DewXfLcOzXY/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to Upload Soft Stories on Mojo Network
                </p>
              </a>

              <a
                href=" https://youtu.be/FMZwQWYziSw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/FMZwQWYziSw/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to upload Bulletin on Mojo Network
                </p>
              </a>

              <a
                href="https://youtu.be/5u8-6PGZa3k"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/5u8-6PGZa3k/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to connect whatsapp on Mojo Network
                </p>
              </a>

              <a
                href="https://youtu.be/Tqy6DYNI1_8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <img
                  src="https://img.youtube.com/vi/Tqy6DYNI1_8/hqdefault.jpg"
                  alt="YouTube Video Thumbnail"
                  className="w-24 h-16 object-cover rounded"
                />

                <p className="text-black font-medium">
                  How to use pull news on Mojo Network
                </p>
              </a>
            </div>

            <a
              href="https://www.youtube.com/@mojo_network"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Subscribe to Our YouTube Channel
              </button>
            </a>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <img
              src="/images/mojo-blogs.png"
              alt="Mojo Platform Dashboard"
              className="w-full max-w-lg rounded-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
