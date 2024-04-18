import Navbar from "@/components/common/navbar/navbar";
import Promotion from "@/components/common/promotion";
import { Toaster } from "@/components/ui/toaster";
import { getCustomer } from "@/lib/medusa/data";
import sanityClient from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { SITE_QUERY } from "@/lib/sanity/queries";
import { User } from "@/types/common";
import { SiteDataProps } from "@/types/site";
import { groq } from "next-sanity";

async function getSiteData(): Promise<SiteDataProps> {
  try {
    return await sanityClient.fetch(SITE_QUERY);
  } catch (error) {
    throw new Error(error as string);
  }
}
async function getUser(): Promise<User | null> {
  try {
    return await getCustomer();
  } catch (error) {
    console.log(error);
    return null;
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
  const user = await getUser();
  const {
    promotions,
    nav,
    logos: { favicon, logo },
  } = await getSiteData();

  return (
    <>
      <Toaster />
      <div className="sticky inset-0 z-30">
        {!!promotions?.length && <Promotion promotions={promotions} />}
        <Navbar logo={logo} nav={nav} user={user} />
      </div>

      {children}
    </>
  );
}

export default PageLayout;
