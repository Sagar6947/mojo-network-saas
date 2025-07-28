import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ContentData {
  id: number;
  title: string;
  description: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: ContentData;
}

const contentMap: Record<string, number> = {
  'terms-and-condition': 1,
  'privacy': 2,
  'saas-service-agreement': 3,
  'advertising-and-monetization-policy': 4,
  'grievance-redressal-policy': 5,
  'content-responsibility-and-licensing-policy': 6,
};

async function fetchContent(id: number): Promise<ContentData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appContent/${id}`, {
    next: { revalidate: 3600 }, // 1 hour cache
  });

  if (!res.ok) throw new Error('Failed to fetch content');

  const { data }: ApiResponse = await res.json();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const id = contentMap[params.slug];
  if (!id) return notFound();

  const content = await fetchContent(id);

  return {
    title: `${content.title} | Mojo India Network`,
    description: `Read about ${content.title} in detail.`,
  };
}

export default async function PolicyPage({ params }: { params: { slug: string } }) {
  const id = contentMap[params.slug];
  if (!id) return notFound();

  const content = await fetchContent(id);

  return (
    <>
      <Header />

      <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">{content.title}</h1>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="space-y-6 text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
