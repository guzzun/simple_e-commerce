import { Link } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/reusableComponents/Button";

const ProductPage = () => {
  const { data: products, isLoading, isError } = useGetData("product");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="mt-12 flex justify-center w-full">
        <h3 className="text-2xl text-red-600">Error loading products</h3>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="mt-12 flex justify-center w-full">
        <h3 className="text-2xl">No products</h3>
      </div>
    );
  }

  // th
  const renderTableHeading = (products) => {
    if (!products || products.length === 0) {
      return null;
    }

    const headers = Object.keys(products[0]).filter(
      (header) => header !== "brand",
    );

    return headers.map((header) => (
      <th key={header} className="px-4 py-4">
        {header}
      </th>
    ));
  };

  // td
  const renderProductCards = (products) => {
    return products.map((product) => (
      <tr key={product.id} className="border-b dark:border-gray-400 hover:bg-gray-200 transition">
        <td className="px-4 py-3 font-bold">{product.id}</td>
        <td className="px-4 py-3">{product.createdAt}</td>
        <td className="px-4 py-3">{product.updatedAt}</td>
        <td className="px-4 py-3">{product.name}</td>
        <td className="px-4 py-3 text-ellipsis">{product.description}</td>
        <td className="px-4 py-3">{product.currency}</td>
        <td className="px-4 py-3">{product.price}</td>
        <td className="px-4 py-3">{product.brandId}</td>
      </tr>
    ));
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 text-gray-600 p-3">
      <div className="mt-12 mx-auto px-4 lg:px-12 mb-12">
        <div className="overflow-hidden">
          <div className="w-40 ml-auto">
            <Link to="/addproduct">
              <Button text="Add Products" />
            </Link>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-base text-center bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>{renderTableHeading(products)}</tr>
              </thead>
              <tbody>{renderProductCards(products)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
