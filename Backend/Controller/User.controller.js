import GuestDetails from "../Models/GuestDetails.model.js";
import Vendor from "../Models/Vendor.model.js";
import User from "../Models/User.model.js";
import Planner from "../Models/Planner.model.js";
import WeddingPlan from "../Models/WeddingPlan.model.js";

export const guestDetails = async (req, res) => {
  try {
    const { guestList, totalGuests, notes } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }
    const userId = req.user?.id;
    const userRole = req.user?.role;
    if (!userId) {
      return res.status(400).json({
        message: "No userId found",
      });
    }
    if (userRole !== "user") {
      return res.status(403).json({
        message: "Only users with role 'user' can submit guest details",
      });
    }

    if (
      !guestList ||
      !Array.isArray(guestList) ||
      guestList.length === 0 ||
      !totalGuests
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required details" });
    }

    for (let guest of guestList) {
      if (!guest.name) {
        return res.status(400).json({
          message: "Each guest must have a name",
        });
      }
    }
    const newGuestDetails = new GuestDetails({
      userId,
      guestList,
      totalGuests,
      notes,
    });
    await newGuestDetails.save();
    return res.status(201).json({
      message: "Guest Details Saved Successfully",
      guestDetails: newGuestDetails,
    });
  } catch (error) {
    console.log("Error in guestDetails:", error);
    res.status(500).json({ message: "Something went wrong in guestDetails" });
  }
};

export const getAllPlanners = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        message: "UserId is missing",
      });
    }
    const listofallplanners = await Planner.find().select("-password");
    if (listofallplanners < 1) {
      return res.status(400).json({
        message: "No planner",
        planner: [],
      });
    }
    return res.status(200).json({
      message: "Here are the list of all Planner",
      planner: listofallplanners,
      count: listofallplanners.length,
    });
  } catch (error) {
    console.log("Error in fetching planner");
    return res.status(500).json({
      message: "Server error in getallplanner",
    });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        message: "UserId is missing",
      });
    }
    const listofallvendors = await Vendor.find()
      .select("-password")
      .populate("servicesOffered");
    if (listofallvendors.length < 1)
      return res.status(400).json({
        message: "No vendors are there",
        vendors: [],
      });
    return res.status(200).json({
      message: "Here are the list of all vendors",
      vendors: listofallvendors,
      count: listofallvendors.length,
    });
  } catch (error) {
    console.log("Error in getAllVendors ", error);
    res.status(500).json({ message: "Something went wrong in getAllVendors" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { emailOrUserName } = req.body;
    if (!emailOrUserName) {
      return res.status(400).json({ message: "Required email or username" });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUserName }, { username: emailOrUserName }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { emailOrUserName, prevData, updateData } = req.body;
  if (!emailOrUserName || !prevData || !updateData) {
    res.status(401).json({ message: "Missing required field" });
  }

  const user = await User.findOne({
    $or: [{ email: emailOrUserName }, { username: emailOrUserName }],
  });

  if (prevData == updateData) {
    return res.status(400).json({ message: "Same data found" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    if (prevData === user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData)) {
        return res.status(400).json({ message: "Invalid email provide" });
      }
      const updateUser = await User.findOneAndUpdate(
        { email: prevData },
        { $set: { email: updateData } },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        message: "User updated successfully",
        user: updateUser,
      });
    } else if (prevData === user.username) {
      const updateUser = await User.findOneAndUpdate(
        { username: prevData },
        { $set: { username: updateData } },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        message: "User updated successfully",
        user: updateUser,
      });
    } else if (prevData === user.contactDetails) {
      let contactStr = updateData.toString();
      const leadingZeros = contactStr.match(/^0+/g);
      const zeroCount = leadingZeros ? leadingZeros[0].length : 0;

      if (contactStr.length === 10 && /^[1-9]\d{9}$/.test(contactStr)) {
      } else if (
        contactStr.length === 11 &&
        zeroCount === 1 &&
        /^[0][1-9]\d{9}$/.test(contactStr)
      ) {
        contactStr = contactStr.slice(1);
      } else {
        return res.status(400).json({
          message: "Invalid contact number",
        });
      }

      const updateUser = await User.findOneAndUpdate(
        { contactDetails: prevData },
        { $set: { contactDetails: updateData } },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        message: "User updated successfully",
        user: updateUser,
      });
    } else {
      return res.status(400).json({ message: "Invalid data provided" });
    }
  }
};

export const createWeddingPlan = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (userRole !== "user") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      destination,
      customServices = [],
      budget,
      guestDetails = [],
      weddingDate,
    } = req.body;

    if (!destination || !budget || !weddingDate) {
      return res.status(400).json({ message: "Required missing field" });
    }

    if (!Array.isArray(customServices) || !Array.isArray(guestDetails)) {
      return res
        .status(400)
        .json({ message: "customServices and guestDetails must be arrays" });
    }

    const newPlan = new WeddingPlan({
      userId,
      destination,
      customServices,
      budget,
      guestDetails,
      weddingDate: new Date(weddingDate),
    });
    await newPlan.save();
    return res
      .status(201)
      .json({ message: "wedding plan created successfully", plan: newPlan });
  } catch (error) {
    console.error("wedding plan create error:", error);
    return res
      .status(500)
      .json({ message: "Server error while planning wedding" });
  }
};

export const assignPlannerAndUpdate = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id: plannerId } = req.params;

    if (!plannerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    const planner = await Planner.findById(plannerId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!planner) {
      return res.status(404).json({ message: "Planner not found" });
    }

    if (user.plannerId && user.plannerId.some(id => id.toString() === plannerId)) {
      return res.status(400).json({ message: "Planner already assigned to this user" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { plannerId } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Planner assigned successfully", updatedUser });

  } catch (error) {
    console.error("Planner assign error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const removePlanner = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id: plannerId } = req.params;

    if (!plannerId) {
      return res.status(400).json({ message: "Missing planner ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Not a valid user" });
    }

    if (!user.plannerId || !user.plannerId.some(id => id.toString() === plannerId)) {
      return res.status(400).json({ message: "Planner not assigned to this user" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { plannerId } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Planner removed successfully", updatedUser });

  } catch (error) {
    console.error("Planner remove error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

