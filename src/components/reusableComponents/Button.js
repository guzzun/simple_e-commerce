/* eslint-disable react/prop-types */
export default function Button({ text, type, className }) {
  return (
    <button
      type={type}
      className={`w-full font-semibold bg-gray-800 text-white py-2.5 px-4 rounded-md hover:bg-gray-900 transition duration-300 mb-4 ${className}`}
    >
      {text}
    </button>
  );
}
