import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useFetchProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../features/productApiSice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { ROUTES } from "../constants/routes";

const ProductList = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useFetchProductsQuery({ page });
  const [createProduct, { isLoading: creatingProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deletingProduct }] =
    useDeleteProductMutation();

  const handleCreateProduct = async () => {
    try {
      await createProduct();
      toast.success("Product Created Successfully", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct({ id });
      toast.success("Product removed Successfully", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="py-8 flex justify-between">
        <Link to={"/admin/dashboard"}>
          <button className="btn  btn-primary">Go Back</button>
        </Link>
        <button
          className="btn btn-secondary"
          onClick={handleCreateProduct}
          disabled={creatingProduct}
        >
          {creatingProduct && <Spinner />}
          Create Product
        </button>
      </div>
      <div>
        {isError && (
          <Message
            variant="alert-error"
            message={error?.data?.message || error?.message}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-bold pb-4">List of Products</h2>
            <table className="table bg-base-200 shadow-xl rounded-lg overflow-hidden">
              {/* head */}
              <thead className="bg-base-300">
                <tr className="text-lg">
                  <th></th>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.products &&
                  data?.products?.map((product, index) => (
                    <tr key={product?._id}>
                      <th>{index + 1}</th>
                      <td>
                        <Link
                          className="btn-link p-0 m-0 no-underline"
                          to={`/product/${product?._id}`}
                        >
                          {product?._id}
                        </Link>
                      </td>
                      <td>{product?.name}</td>
                      <td>{product?.brand}</td>
                      <td>{product?.category}</td>
                      <td>${(product?.price ?? 0).toFixed(2)}</td>
                      <td>
                        <FaEdit
                          className="text-xl text-primary cursor-pointer"
                          onClick={() => {
                            navigate(`${ROUTES.PRODUCT_EDIT}/${product?._id}`);
                          }}
                        />
                      </td>
                      <td>
                        <FaTrashAlt
                          className="text-xl text-error cursor-pointer"
                          disabled={deletingProduct}
                          onClick={() => handleDeleteProduct(product?._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="py-8">
              <div className="join">
                <button
                  className="join-item btn text-primary"
                  disabled={!data?.hasPrevPage}
                  onClick={() => {
                    setPage((prevState) => prevState - 1);
                  }}
                >
                  «
                </button>
                <button className="join-item btn">Page {page}</button>
                <button
                  className="join-item btn text-primary"
                  disabled={!data?.hasNextPage}
                  onClick={() => {
                    setPage((prevState) => prevState + 1);
                  }}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
