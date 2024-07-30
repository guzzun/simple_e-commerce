import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import usePostData from "../hooks/usePostData";
import Button from "../components/reusableComponents/Button";
import Input from "../components/reusableComponents/Input";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState(0);
  const [brandId, setBrandId] = useState("");
  const [error, setError] = useState(null);

  const { data: brands, isError } = useGetData("brand");
  const mutation = usePostData("product");

  if (isError) {
    console.error("Error getting brands");
  }

  if (!brands) {
    return console.error("No brands");
  }

  const renderBrandId = (brands) => {
    return brands.map((brand) => {
      return (
        <option key={brand.id} value={brand.id}>
          {brand.id}
        </option>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({
        name,
        description,
        currency,
        price: Number(price),
        brandId: Number(brandId),
      });
      navigate("/products");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="my-12 w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-1/3">
          {error && (
            <p className="text-red-600 text-sm mb-2 text-right">{error}</p>
          )}

          <h2 className="text-2xl font-bold mb-6 text-right">Add Product</h2>
          <form className="mx-auto" onSubmit={handleSubmit}>
            <label className="block text-gray-600 font-medium mb-2">Name</label>

            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-gray-600 font-medium mb-2">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="block text-gray-600 font-medium mb-2">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-gray-100 border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 py-2.5 px-4 mb-6"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>

            <label className="block text-gray-600 font-medium mb-2">
              Price
            </label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label className="block text-gray-600 font-medium mb-2">
              BrandId
            </label>
            <select
              id="brand"
              name="brand"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full bg-gray-100 border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 py-2.5 px-4 mb-10"
            >
              {renderBrandId(brands)}
            </select>

            <Button
              text={mutation.isLoading ? "Submitting..." : "Submit"}
              disabled={mutation.isLoading}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
