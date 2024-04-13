import Hero from "@/components/pages/home/hero";
import sanityClient from "@/lib/sanity/client";
import { HOMEPAGE_QUERY } from "@/lib/sanity/queries";
import { HomePageProps } from "@/types/home";

async function getPageData(): Promise<HomePageProps> {
  try {
    return await sanityClient.fetch(HOMEPAGE_QUERY);
  } catch (error) {
    throw new Error(error as string);
  }
}

async function Home() {
  const { sections } = await getPageData();

  return (
    <div className="min-h-screen">
      {sections?.map((section) => {
        switch (section._type) {
          case "landing.hero":
            return <Hero {...section} />;

          default:
            null;
        }
      })}
    </div>
  );
}

export default Home;
