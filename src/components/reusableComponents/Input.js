/* eslint-disable react/prop-types */
export default function Input({
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
  className,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full bg-gray-100 border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-500 hover:bg-gray-200 py-2.5 px-4 mb-6 ${className}`} />
  );
}
