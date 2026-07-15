const Activity = require("../models/Activity");

exports.addActivity = async (
  action,
  fileName,
  icon,
  color
) => {
  try {
    await Activity.create({
      action,
      fileName,
      icon,
      color,
    });
  } catch (err) {
    console.log("Activity Error:", err.message);
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(activities);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};