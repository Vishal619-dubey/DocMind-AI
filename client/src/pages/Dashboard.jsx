import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import HeroSection from "../components/dashboard/HeroSection";
import StatsCards from "../components/dashboard/StatsCards";
import UploadCard from "../components/dashboard/UploadCard";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";

import StorageCard from "../components/dashboard/StorageCard";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import AICommandCenter from "../components/dashboard/AICommandCenter";
import NotificationCenter from "../components/dashboard/NotificationCenter";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import WorkspaceHealth from "../components/dashboard/WorkspaceHealth";
import AISuggestions from "../components/dashboard/AISuggestions";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Hero */}
          <HeroSection />

          {/* Stats */}
          <StatsCards />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="col-span-12 xl:col-span-8 space-y-6">

              <UploadCard />

              <RecentDocuments />

              <AnalyticsCharts />

            </div>

            {/* RIGHT */}
            <div className="col-span-12 xl:col-span-4 space-y-6">

              <StorageCard />

              <AnalyticsCard />

              <AICommandCenter />

              <NotificationCenter />

              <ActivityTimeline />

              <WorkspaceHealth />

              <AISuggestions />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}