import Destination from "../Models/Destination.model.js";

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