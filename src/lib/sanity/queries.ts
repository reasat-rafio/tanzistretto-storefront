import { groq } from "next-sanity";

//   ${asset("logo")},
export const SITE_QUERY = groq`{
    "logos": *[_id == "siteLogos"][0] {
      ...,
    },
    "nav": *[_id == "siteNavigation"][0],
    "footer": *[_id == "siteFooter"][0],
    "promotions": *[_type == "promotion"]|order(orderRank)[]{
		_id,
		title
	},
}`;
