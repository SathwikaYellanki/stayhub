const Notice = require("../models/Notice");

// Get all notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: -1,
    });

    res.json(notices);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Add Notice
const addNotice = async (req, res) => {
  try {

    const { title, description } = req.body;

    const notice = new Notice({
      title,
      description,
    });

    await notice.save();

    res.status(201).json({
      success: true,
      message: "Notice added successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
// Update Notice
const updateNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    notice.title = title;
    notice.description = description;

    await notice.save();

    res.json({
      success: true,
      message: "Notice updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Notice
const deleteNotice = async (req, res) => {
  try {

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Notice deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
module.exports = {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
};