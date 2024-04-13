import sanityClient from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { SITE_QUERY } from "@/lib/sanity/queries";
import { SiteDataProps } from "@/types/site";
import { groq } from "next-sanity";
import { Toaster } from "@/components/ui/toaster";
import Promotion from "@/components/pages/home/promotion";

async function getSiteData(): Promise<SiteDataProps> {
  try {
    return await sanityClient.fetch(SITE_QUERY);
  } catch (error) {
    throw new Error(error as string);
  }
}

const METADATA_QUERY = groq`{
  "logos": *[_id == "siteLogos"][0] {favicon},
}`;
export async function generateMetadata() {
  let result;

  try {
    result = await sanityClient.fetch(METADATA_QUERY);
  } catch (error) {
    throw new Error(error as string);
  }

  let faviconImage = result.logos.favicon
    ? urlFor(result.logos.favicon).size(256, 256).ignoreImageParams().url()
    : null;

  return {
    title: "Tanzistretto",
    icons: [{ rel: "icon", url: faviconImage }],
  };
}

async function PageLayout({ children }: { children: React.ReactNode }) {
  const {
    promotions,
    logos: { favicon },
  } = await getSiteData();

  return (
    <>
      <Toaster />

      <div className="sticky inset-0 z-30">
        {!!promotions?.length && <Promotion promotions={promotions} />}

        {/* <Promotion {promotions} />
  <Navbar {logo} {nav} /> */}
      </div>

      {children}
      {/*  */}
    </>
  );
}

export default PageLayout;
