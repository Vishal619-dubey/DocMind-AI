export default function Button({ children }) {
  return (
    <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition duration-300 font-semibold">
      {children}
    </button>
  );
}