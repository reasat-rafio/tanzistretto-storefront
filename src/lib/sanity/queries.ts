import { groq } from "next-sanity";

export const asset = (attr: string, opts?: { as: string }) => groq`'${
  opts?.as ?? attr
}': ${attr} {
  ...,
  asset->{
    ...,
    metadata {
      lqip,
      dimensions
    }
  }
}`;

export const SITE_QUERY = groq`{
    "logos": *[_id == "siteLogos"][0] {
        ...,
        ${asset("logo")},
    },
    "nav": *[_id == "siteNavigation"][0],
    "footer": *[_id == "siteFooter"][0],
    "promotions": *[_type == "promotion"]|order(orderRank)[]{
		_id,
		title
	},
}`;
