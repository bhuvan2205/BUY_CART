import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useFetchProductQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../features/productApiSice";
import { toast } from "react-toastify";
import { ROUTES } from "../constants/routes";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect, useState } from "react";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading, isError, error } = useFetchProductQuery(id);

  const [updateProduct, { isLoading: updatingProduct }] =
    useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e?.target?.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res?.image);
      toast.success(res?.message, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !price ||
      !countInStock ||
      !category ||
      !brand
    ) {
      return toast.error("Fields cannot be empty", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    if (price <= 0 || countInStock <= 0) {
      return toast.error("Invalid data", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    if (!image) {
      return toast.error("Upload Image", {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }

    try {
      await updateProduct({
        id,
        name,
        image,
        description,
        price,
        countInStock,
        category,
        brand,
      });
      toast.success("Product Updated Successfully", {
        closeOnClick: true,
        pauseOnHover: false,
      });
      navigate(ROUTES.PRODUCT_LIST);
    } catch (error) {
      toast.error(error?.data?.message || error?.message, {
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setBrand(data?.product?.brand);
      setPrice(data?.product?.price);
      setCategory(data?.product?.category);
      setImage(data?.product?.image);
      setCountInStock(data?.product?.countInStock);
    }
  }, [data]);

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link to={ROUTES.PRODUCT_LIST}>
          <button className="btn  btn-primary">Go Back</button>
        </Link>
        <div className="flex justify-center items-center w-full my-8">
          <div className="bg-base-200 p-8">
            {isError && (
              <Message
                message={error?.data?.message || error?.message}
                variant="alert-error"
              />
            )}
            {isLoading && <Loader />}
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <label htmlFor="name" className="py-2 inline-block">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-primary w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-4">
                <label htmlFor="brand" className="py-2 inline-block">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input input-primary w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-4">
                <label htmlFor="price" className="py-2 inline-block">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value ?? 0))}
                  className="input input-primary w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-4">
                <label htmlFor="stock" className="py-2 inline-block">
                  Count In Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value ?? 0))}
                  className="input input-primary w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-4">
                <label htmlFor="category" className="py-2 inline-block">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input input-primary w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-4">
                <label htmlFor="image" className="py-2 inline-block">
                  Select Image
                </label>
                <input
                  id="image"
                  type="file"
                  className="file-input file file-input-primary w-full max-w-lg md:min-w-[200px]"
                  onChange={handleUpload}
                />
              </div>
              <div className="my-4">
                <label htmlFor="description" className="py-2 inline-block">
                  Brand
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-primary row-span-3 w-full max-w-lg md:min-w-[200px]"
                />
              </div>
              <div className="my-8">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={updatingProduct}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
