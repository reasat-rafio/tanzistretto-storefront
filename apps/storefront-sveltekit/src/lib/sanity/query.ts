import groq from 'groq';
import { asset } from './sanity-image';

// TODO fix the navigation schema and the query
export const siteQuery = groq`{
    "logos": *[_id == "siteLogos"][0] {
      ...,
      ${asset('logo')},
    },
    "nav": *[_id == "siteNavigation"][0],
    "footer": *[_id == "siteFooter"][0],
    "greetings": *[_id == "siteGreetings"][0],
    "promotions": *[_type == "promotion"]|order(orderRank)[]{
			_id,
			title
		},
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
