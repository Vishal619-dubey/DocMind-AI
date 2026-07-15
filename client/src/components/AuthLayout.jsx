export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-950">

        <div className="absolute w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-30 top-10 left-10"></div>

        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">

          <h1 className="text-6xl font-extrabold">
            DocMind AI
          </h1>

          <p className="text-2xl mt-6 text-indigo-100">
            Intelligent Cloud Document Management
          </p>

          <p className="text-gray-300 mt-8 leading-8 max-w-lg">
            Upload documents, organize files, chat with AI, generate summaries,
            and manage everything from one beautiful dashboard.
          </p>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center px-6">
        {children}
      </div>

    </div>
  );
}