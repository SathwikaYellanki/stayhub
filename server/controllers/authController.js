
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerRequest = async (req, res) => {
  try {
    const { name, email, phone, flatNo } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { flatNo }],
    });

    if (user) {
      return res.status(400).json({
        message: "Resident already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      phone,
      flatNo,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration request sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get all pending registration requests
const getPendingRequests = async (req, res) => {
  try {
    const users = await User.find({ status: "Pending" });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Approve resident
const approveResident = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    user.status = "Approved";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resident approved successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Reject resident
const rejectResident = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    user.status = "Rejected";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resident rejected successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const createAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({
      email: "admin@stayhub.com",
    });

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "StayHub Admin",
      email: "admin@stayhub.com",
      phone: "9999999999",
      flatNo: "ADMIN",
      password: hashedPassword,
      role: "admin",
      status: "Approved",
      isPasswordCreated: true,
    });

    await admin.save();

    res.json({
      success: true,
      message: "Admin created successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin",
    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const createPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    if (user.status !== "Approved") {
      return res.status(400).json({
        message: "Your registration is not approved yet.",
      });
    }

    if (user.isPasswordCreated) {
      return res.status(400).json({
        message: "Password already created.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isPasswordCreated = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password created successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const checkStatus = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Resident not found"
      });
    }

    res.status(200).json({
      status: user.status,
      isPasswordCreated: user.isPasswordCreated
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const residentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resident = await User.findOne({
      email,
      role: "resident",
    });

    if (!resident) {
      return res.status(400).json({
        message: "Resident not found",
      });
    }

    if (resident.status !== "Approved") {
      return res.status(400).json({
        message: "Your account is not approved yet.",
      });
    }

    if (!resident.isPasswordCreated) {
      return res.status(400).json({
        message: "Please create your password first.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      resident.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: resident._id,
        role: resident.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      resident: {
        id: resident._id,
        name: resident.name,
        email: resident.email,
        flatNo: resident.flatNo,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get Resident Profile
const getResidentProfile = async (req, res) => {
  try {

    const resident = await User.findById(req.params.id).select("-password");

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    res.json(resident);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Change Password
const changePassword = async (req, res) => {

  try {

    const {
      residentId,
      currentPassword,
      newPassword,
    } = req.body;

    const resident = await User.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      resident.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    resident.password = await bcrypt.hash(
      newPassword,
      10
    );

    await resident.save();

    res.json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getResident = async (req, res) => {
  try {

    const resident = await User.findById(req.params.id);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    res.json(resident);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
module.exports = {
  registerRequest,
  getPendingRequests,
  approveResident,
  rejectResident,
  createAdmin,
  adminLogin,
  createPassword,
  checkStatus,
  residentLogin,
  getResidentProfile,
  changePassword,
  getResident,
};