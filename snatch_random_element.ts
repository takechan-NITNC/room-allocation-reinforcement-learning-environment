export function snatchRandomElement<Type>(set: Set<Type>): Type {
  const ret = [...set][Math.floor(Math.random() * set.size)];
  set.delete(ret);
  return ret;
}
