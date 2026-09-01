export function add(left, right) {
  return left + right;
}

export function formatTotal(items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return `$${total.toFixed(2)}`;
}
