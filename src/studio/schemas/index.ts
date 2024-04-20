import seo from './objects/seo';
import link from './objects/link';
import social from './objects/social';
import pages from './pages';
import site from './documents/site';
import promotion from './documents/promotion';
import product from './documents/product';
import category from './documents/category';

export const schemaTypes = [
  social,
  seo,
  link,
  promotion,
  category,
  ...site,
  ...pages,
  ...product,
];
