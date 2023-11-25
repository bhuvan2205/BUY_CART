import { useFetchProductsQuery } from "../features/productApiSice";
import Card from "../components/Card";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";

const Home = () => {
  const { data, isLoading, error, isError } = useFetchProductsQuery();

  return (
    <div className="container mx-auto">
      <h1 className="text-xl py-8 font-bold text-center md:text-left">
        Latest Products
      </h1>
      {isError && (
        <Message
          message={error?.data?.message || error?.message}
          variant="alert-error"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
        {isLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <Placeholder key={index} />
            ))}
          </>
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
              rating={product.rating}
              id={product._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
