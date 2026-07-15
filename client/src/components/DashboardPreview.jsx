export default function DashboardPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Powerful Dashboard
        </h2>

        <p className="text-gray-400 mt-4">
          Manage documents, AI summaries and cloud storage from one place.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

        <div className="grid lg:grid-cols-4">

          {/* Sidebar */}

          <div className="bg-slate-950 p-6">

            <h2 className="text-2xl font-bold text-indigo-500">
              DocMind
            </h2>

            <div className="mt-10 space-y-5">

              <div>🏠 Dashboard</div>
              <div>📄 Documents</div>
              <div>🤖 AI Chat</div>
              <div>📊 Analytics</div>
              <div>⚙ Settings</div>

            </div>

          </div>

          {/* Main */}

          <div className="lg:col-span-3 p-8">

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-slate-800 rounded-2xl p-6">
                <h3>Total Files</h3>

                <p className="text-4xl font-bold mt-4">
                  245
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <h3>AI Summaries</h3>

                <p className="text-4xl font-bold mt-4">
                  89
                </p>
              </div>

              <div className="bg-indigo-600 rounded-2xl p-6">
                <h3>Storage Used</h3>

                <p className="text-4xl font-bold mt-4">
                  68%
                </p>
              </div>

            </div>

            <div className="mt-10 bg-slate-800 rounded-2xl p-6">

              <h3 className="text-xl font-semibold">
                Recent Documents
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                  <span>📄 AI_Project.pdf</span>
                  <span>2 min ago</span>
                </div>

                <div className="flex justify-between">
                  <span>📑 Resume.docx</span>
                  <span>10 min ago</span>
                </div>

                <div className="flex justify-between">
                  <span>📊 Report.pptx</span>
                  <span>Today</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}