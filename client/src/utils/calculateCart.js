const calculateCart = (state) => {
  const subTotal =
    state?.cartItems?.length > 0
      ? state?.cartItems?.reduce((acc, item) => {
          return (acc += item?.price);
        }, 0)
      : 0;
  const shippingCost = subTotal > 2000 ? 0 : subTotal > 1000 ? 100 : 50;
  const taxCost = subTotal > 1000 ? subTotal / 5 : subTotal / 2.5;
  const orderTotal = subTotal + shippingCost + taxCost;

  state.subTotal = subTotal;
  state.taxCost = taxCost;
  state.shippingCost = shippingCost;
  state.orderTotal = orderTotal;
};

export default calculateCart;
