import GuestDetails from "../../Models/GuestDetails.model";

export const guestDetails = async (req, res) => {
  try {
    const { guestList, totalGuests, notes } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        message: "No userId found",
      });
    }
    if (!guestList || !totalGuests || !notes) {
      return res.status(400).json({
        message: "Please fill all details",
      });
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
