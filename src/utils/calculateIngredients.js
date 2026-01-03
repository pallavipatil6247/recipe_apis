module.exports = (ingredients, baseServings, requiredServings) => {
  const factor = requiredServings / baseServings;

  return ingredients.map(i => ({
    ...i,
    quantity: Number((i.quantity * factor).toFixed(2))
  }));
};
