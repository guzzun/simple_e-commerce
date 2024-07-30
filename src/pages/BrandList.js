import useGetData from "../hooks/useGetData";
import LoadingSpinner from "../components/LoadingSpinner";

const BrandList = () => {
  const { data: brands, isLoading, isError } = useGetData("brand");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="mt-12 flex justify-center w-full">
        <h3 className="text-2xl text-red-600">Error loading brands</h3>
      </div>
    );
  }

  if (!brands) {
    return (
      <div className="mt-12 flex justify-center w-full">
        <h3 className="text-2xl">No brands</h3>
      </div>
    );
  }

  const renderBrandCards = (brands) => {
    return brands.map((brand) => (
      <div key={brand.id} className="bg-white shadow-md p-4 m-4 w-64">
        <h2 className="text-3xl font-semibold">{brand.name}</h2>
        <h3 className="text-gray-500">{brand.createdAt}</h3>
      </div>
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto mt-2 p-4">
        <h1 className="text-3xl font-semibold mb-4 ml-4">Brand List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderBrandCards(brands)}
        </div>
      </div>
    </div>
  );
};

export default BrandList;
