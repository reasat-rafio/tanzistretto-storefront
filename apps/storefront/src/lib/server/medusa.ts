// import { MedusaClient } from 'sveltekit-medusa-client';
import { MEDUSA_BACKEND_URL } from '$env/static/private';
import { MedusaClient } from './sveltekit-medusa-client';

export default new MedusaClient(MEDUSA_BACKEND_URL, {
  // headers: {
  //    'CF-Access-Client-Id': CLOUDFLARE_ACCESS_ID,
  //    'CF-Access-Client-Secret': CLOUDFLARE_ACCESS_SECRET,
  // },
  retry: 0,

  persistentCart: true,
});
