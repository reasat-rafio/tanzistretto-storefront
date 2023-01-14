export const renderObjectArray = (objects: any[], objectMap: any) => {
  let components: any = [];
  objects.map((o) => {
    Object.keys(objectMap).find((k) => k === o._type)
      ? (() => {
          const { _key, _type, ...props } = o;
          const component = objectMap[_type];
          components = [{ component, props }, ...components];
        })()
      : null;
  });
  return components;
};
