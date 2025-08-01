"use client";

export function AboutSection() {
  const features = [
    {
      icon: "/images/problems/1.png",
      title: "I do all the hard work",
      desc: `But no one knows my name. You've spent years chasing stories across towns, but your name rarely gets the recognition it deserves.`,
    },
    {
      icon: "/images/problems/2.png",
      title: "I’m stuck under someone else's brand",
      desc: "You've always reported under another editor’s name or portal—never had the platform to be the face of journalism in your area.",
    },
    {
      icon: "/images/problems/3.png",
      title: "My peers get more visibility with less effort",
      desc: "You’ve broken big stories, but the spotlight always seems to land on someone else.",
    },
    {
      icon: "/images/problems/4.png",
      title: "I don’t have time to chase ads or sponsors",
      desc: "You want to earn more, but juggling news collection and ad outreach is overwhelming.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white md:pt-10">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          The Problem What Every{" "}
          <span className="gradient-text leading-tight">
             Hyperlocal <br />Journalist 
          </span>{" "}
        Faces   Solved by <span className="gradient-text leading-tight">
            SaaS
          </span>{" "} 
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl shadow-md border flex flex-col sm:flex-row gap-4 ${
                  idx % 2 === 0
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800"
                } items-center sm:items-start text-center sm:text-left`}
              >
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={item.icon}
                    alt="Feature Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold md:pb-3 ${
                      idx % 2 === 0 ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      idx % 2 === 0 ? "text-white/90" : "text-black"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 md:order-2 block relative lg:absolute lg:right-0 h-full max-h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-end">
              <img
                src="/images/problem-main.png"
                alt="Phone Preview"
                className="max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
