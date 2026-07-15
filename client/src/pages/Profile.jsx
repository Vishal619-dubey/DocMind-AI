export default function Profile() {
  return (
    <div className="p-10 text-white bg-slate-950 min-h-screen">
      <h1 className="text-4xl font-bold">👤 Vishal Dubey</h1>

      <div className="mt-8 bg-slate-900 rounded-2xl p-8 border border-slate-800">

        <p><strong>Name:</strong> Vishal Dubey</p>

        <p className="mt-4">
          <strong>Email:</strong> demo@gmail.com
        </p>

        <p className="mt-4">
          <strong>Plan:</strong> Free
        </p>

        <p className="mt-4">
          <strong>Storage:</strong> 0.4 / 10 GB
        </p>

      </div>
    </div>
  );
}