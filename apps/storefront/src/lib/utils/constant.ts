export const pages = [
  { title: 'Landing - /', value: '/' },
  { title: 'New - /collection/new', value: '/collection/new' },
  {
    title: 'Restocked - /collection/restocked',
    value: '/collection/restocked',
  },
  { title: 'Bangles - /collection/bangles', value: '/collection/bangles' },
  { title: 'Shop - /shop', value: '/shop' },
];

export const pagesWithOutSlash = removeSlashFromArray(pages);
function removeSlashFromArray(arr: typeof pages) {
  return arr
    .map(({ value }) => value.replace(/^\//, ''))
    .filter((item) => item !== '');
}
