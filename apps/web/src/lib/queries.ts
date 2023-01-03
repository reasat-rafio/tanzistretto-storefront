import groq from "groq";

export const siteQuery = groq`*[_id == "site"][0] {
  ...,
}`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
