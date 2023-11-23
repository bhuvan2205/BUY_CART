const CheckoutSteps = (props) => {
  const { steps = 1 } = props || {};
  return (
    <>
      <ul className="steps">
        <li className={`step ${steps >= 1 && "step-primary"}`}>Sign In</li>
        <li className={`step ${steps >= 2 && "step-primary"}`}>Address</li>
        <li className={`step ${steps >= 3 && "step-primary"}`}>Payment Method</li>
        <li className={`step ${steps >= 4 && "step-primary"}`}>Place Order</li>
      </ul>
    </>
  );
};

export default CheckoutSteps;
