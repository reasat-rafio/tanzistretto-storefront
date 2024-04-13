// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];

export const pages = [
  { title: "Landing - /", value: "/" },
  { title: "New - /collection/new", value: "/collection/new" },
  {
    title: "Restocked - /collection/restocked",
    value: "/collection/restocked",
  },
  { title: "Bangles - /collection/bangles", value: "/collection/bangles" },
  { title: "Shop - /shop", value: "/shop" },
];

export const pagesWithOutSlash = removeSlashFromArray(pages);
function removeSlashFromArray(arr: typeof pages) {
  return arr
    .map(({ value }) => value.replace(/^\//, ""))
    .filter((item) => item !== "");
}
