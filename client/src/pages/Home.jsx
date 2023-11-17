import { useSelector } from "react-redux";
import { useFetchProductsQuery } from "../features/productApiSice";
import Card from "../components/Card";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";

const Home = () => {
  const { cartItems } = useSelector((state) => state?.cart);
  console.log({ cartItems });

  const { data, isLoading, error, isError } = useFetchProductsQuery();

  console.log({ data });

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl py-12 font-bold">Latest Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 place-items-center md:place-items-start">
        {isLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <Placeholder key={index} />
            ))}
          </>
        )}
        {isError && (
          <Message
            message={error?.data?.message || error?.message}
            variant="alert-error"
          />
        )}
        {data &&
          data?.products?.map((product, index) => (
            <Card
              key={index}
              btn="Buy Now"
              description={product.description}
              title={product.name}
              image={product.image}
              price={product.price}
              isLoading={isLoading}
              id={product.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
