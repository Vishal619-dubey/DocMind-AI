import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Upload,
  Star,
  Pin,
  Sparkles,
} from "lucide-react";

export default function ActivityPanel() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/activity"
      );

      setActivities(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const getIcon = (icon) => {

    switch (icon) {

      case "trash":
        return <Trash2 size={18} className="text-red-400" />;

      case "upload":
        return <Upload size={18} className="text-green-400" />;

      case "star":
        return <Star size={18} className="text-yellow-400" />;

      case "pin":
        return <Pin size={18} className="text-indigo-400" />;

      default:
        return <Sparkles size={18} className="text-violet-400" />;
    }

  };

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-bold mb-6">

        Recent Activity

      </h2>

      <div className="space-y-5">

        {activities.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-4"
          >

            <div className="rounded-xl bg-slate-800 p-3">

              {getIcon(item.icon)}

            </div>

            <div>

              <h3 className="font-semibold">

                {item.action}

              </h3>

              <p className="text-sm text-slate-400">

                {item.fileName}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}