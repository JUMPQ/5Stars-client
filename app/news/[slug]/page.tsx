// "use client";
import Header from "@/components/layout/header";
import { newsArticles } from "@/lib/news-data";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsArticle({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((item) => item.slug === params.slug);

  if (!article) {
    return <div className="p-10">Article not found</div>;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />{" "}
      <main className="max-w-4xl mx-auto py-20 px-6">
        {/* Hero Media - Video or Image */}
      <div className="mb-10">
          {article.isVideo ? (
            <VideoPlayer
              thumbnail={article.thumbnail}
              videoSrc={article.video!}
              title={article.title}
            />
          ) : (
            <Image
              src={article.thumbnail}
              alt={article.title}
              width={1800}
              height={900}
              className="w-full rounded-2xl object-cover shadow-lg"
              priority
            />
          )}
        </div>

       

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase">
          {article.title}{" "}
          <span className="text-primary">{article.highlight}</span>
        </h1>

        {/* Content */}
        <p className="text-lg leading-relaxed whitespace-pre-lin text-muted-foreground max-w-5xl">
          {article.description}
        </p>
      </main>
    </div>
  );
}
