import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100"
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Scuze, a apărut o eroare neașteptată.
      </p>
      <p className="text-gray-600 italic">
        {error?.statusText || error?.message}
      </p>
    </div>
  );
}
