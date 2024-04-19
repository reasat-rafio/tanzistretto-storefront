import seo from './objects/seo';
import link from './objects/link';
import social from './objects/social';
import pages from './pages';
import site from './documents/site';
import promotion from './documents/promotion';
import product from './documents/product';

export const schemaTypes = [
  social,
  seo,
  link,
  promotion,
  ...site,
  ...pages,
  ...product,
];
