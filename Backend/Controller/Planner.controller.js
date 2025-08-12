import Destination from "../Models/Destination.model.js";
import Planner from "../Models/Planner.model.js";
import Vendor from "../Models/Vendor.model.js";
import WeddingPlan from "../Models/WeddingPlan.model.js";
import User from '../Models/User.model.js';

export const createDestination = async (req, res) => {
  try {
    const userRole = req.user?.role;
    if (userRole !== "planner"){
        return res.status(400).json({message: "You're not authorized for this task"});
    }

    const { name, location, style, availableDates, priceRange} = req.body;

    if (!name || !location || !style || !availableDates || !priceRange) {
      return res.status(400).json({ message: "Please fill all the mandatory fields" });
    }

    const validStyle = ["Beach", "Traditional", "Royal", "Modern"];
    if (!validStyle.includes(style)) {
      return res.status(400).json({ message: "Invalid style" });
    }

    const existingDestination = await Destination.findOne({ name, style});
    if (existingDestination) {
      return res.status(400).json({ message: "Destination already exists" });
    }

    const parsedDates = availableDates.map(date => new Date(date));
    const destination = await Destination.create({
      name,
      location,
      style,
      availableDates: parsedDates,
      priceRange
    });
    await destination.save();
    return res.status(201).json({ message: "Destination created successfully", destination });

  } catch (error) {
    console.error("Error creating destination:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const allDestination = async(req, res) =>{
    try {
        const destinations = await Destination.find();
        return res.status(200).json(destinations);
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return res.status(500).json({ message: "Server error while fetching destinations" });
    }
}

export const allVendors = async(req, res) =>{
    try {
      const role = req.user?.role;
      if (role !== "planner"){
        return res.status(400).json({message: "Unauthorized" });
      }

      const vendors = await Vendor.find();
      if (!vendors){
        return res.status(400).json({message: "No vendor found"});
      }
      return res.status(200).json(vendors);
    } catch (error) {
      console.error("Get all vendors error:", error);
      return res.status(500).json({ message: "Server error while fetching vendors"});
    }
}

export const allUsers = async(req, res) =>{
  try {
    const weddingPlans = await WeddingPlan.find({userId: req.user?.id});
    res.status(200).json(weddingPlans);

  } catch (error) {
      console.error("Wedding plan users error:", error);
      res.status(500).json({message: "Server error while fetching wedding users"})
  }
}

export const assignVendorsToPlanner = async (req, res) => {
  try {
    const { plannerId, vendorIds } = req.body;
    const role = req.user?.role;

    if (!["planner", "admin"].includes(role)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (!userId || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const planner = await Planner.findById(plannerId);
    if (!planner) return res.status(404).json({ message: "Planner not found" });

    const vendors = await Vendor.find({ _id: { $in: vendorIds } });
    if (vendors.length !== vendorIds.length) {
      return res.status(400).json({ message: "One or more vendors not found" });
    }

    const existingVendorIds = planner.vendorsList.map(id => id.toString());

    const alreadyAssigned = [];
    const newlyAssigned = [];

    for (let id of vendorIds) {
      const strId = id.toString();
      if (existingVendorIds.includes(strId)) {
        alreadyAssigned.push(strId);
      } else {
        newlyAssigned.push(strId);
      }
    }

    planner.vendorsList.push(...newlyAssigned);
    await planner.save();

    return res.status(200).json({
      message: "Vendor assignment completed",
      newlyAssigned,
      alreadyAssigned,
      finalVendorList: planner.vendorsList
    });

  } catch (error) {
    console.error("Assign Vendors Error:", error);
    res.status(500).json({ message: "Server error while assigning vendors" });
  }
};
