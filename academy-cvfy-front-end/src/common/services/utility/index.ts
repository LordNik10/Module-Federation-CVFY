export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeNameOfArrayObj(array: { [key: string]: any }[]) {
  return array.map((el) => ({
    id: el.id,
    name: capitalize(el.name),
  }));
}
