import groq from "groq";

export const siteQuery = groq`{
    "logos": *[_id == "siteLogos"][0] {
      ...,
    },
    "nav": *[_id == "siteNav"][0] {
      ...,
    },
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
