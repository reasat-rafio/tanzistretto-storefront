import seo from './seo';
import link from './link';
import social from './social';
import pages from './pages';
import site from './site';
import promotion from './promotion';

export const schemaTypes = [social, seo, link, promotion, ...site, ...pages];
