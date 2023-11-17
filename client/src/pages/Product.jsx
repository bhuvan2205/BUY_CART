import { Link, useParams } from "react-router-dom";
import { useFetchProductQuery } from "../features/productApiSice";
import Message from "../components/Message";
import Placeholder from "../components/Placeholder";
import Reviews from "../components/Reviews";

const Product = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchProductQuery(id);
  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link to="/">
          <button className="btn btn-secondary">Go Back</button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 place-items-center">
          {isLoading && (
            <>
              {[...Array(2)].map((_, index) => (
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
          {data && (
            <>
              <div>
                <figure>
                  <img src={data?.product?.image} alt={data?.product?.name} />
                </figure>
              </div>
              <div className="text-center">
                <h1 className="text-3xl pb-8">{data?.product?.name}</h1>
                <h2 className="text-2xl py-4">Ratings:</h2>
                <Reviews className="py-8" rating={data?.product?.rating} />
                <p className="py-4">{data?.product?.description}</p>
              </div>
              <div className="flex justify-around gap-8">
                <div className="stats stats-vertical shadow bg-base-200 p-8">
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">Price</div>
                    <div className="stat-value">${data?.product?.price}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">
                      {data?.product?.countInStock > 0 ? (
                        <span className="badge badge-success">In Stock</span>
                      ) : (
                        <span className="badge badge-error">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-xl font-bold">
                      Select Quantity
                    </div>
                    <select id="quantity" className="py-2 mt-2">
                      {[...Array(data?.product?.countInStock)].map(
                        (_, index) => (
                          <option key={index}>{index + 1}</option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="stat">
                    <div className="stat-actions">
                      <button className="btn btn-info">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
