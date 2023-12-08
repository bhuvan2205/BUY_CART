import { useFetchProductsQuery } from "../features/productApiSice";
import Card from "../components/Card";
import Placeholder from "../components/Placeholder";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Hero from "../components/Hero";

const Home = () => {
  const { keywords } = useParams();
  const { data, isLoading, error, isError } = useFetchProductsQuery({
    keywords,
  });

  return (
    <div className="container mx-auto">
      {!!keywords && (
        <div className="pt-8">
          <Link to={ROUTES.HOME}>
            <button className="btn  btn-primary">Go Home</button>
          </Link>
        </div>
      )}
      {!keywords && <Hero />}
      <h1
        className="text-xl py-8 font-bold text-center md:text-left"
        id="products"
      >
        {!keywords ? "Latest Products" : "Product Results"}
      </h1>
      {isError && (
        <Message
          message={error?.data?.message || error?.message}
          variant="alert-error"
        />
      )}
      <div className="gap-12 pb-8 lg:pb-12 grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-between md:place-items-stretch">
        {isLoading && (
          <>
            {[...Array(4)]?.map((_, index) => (
              <Placeholder key={index} />
            ))}
          </>
        )}

        {keywords && data?.products?.length === 0 && (
          <h4 className="text-3xl font-bold">No Products available :(</h4>
        )}

        {data &&
          data?.products?.map((product, index) => (
            <Card
              key={index}
              btn="Buy Now"
              description={product?.description}
              title={product?.name}
              image={product?.image}
              price={product?.price}
              isLoading={isLoading}
              rating={product?.rating}
              id={product?._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
