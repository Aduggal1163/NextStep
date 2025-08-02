import GuestDetails from "../../Models/GuestDetails.model.js";
import Vendor from "../../Models/Vendor.model.js";
import Review from '../../Models/Review.model.js'
import Planner from "../../Models/Planner.model.js";
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
export const getAllVendors= async(req,res)=>{
    try {
        const userId=req.user?.id;
        if(!userId)
        {
            return res.status(400).json({
                message:"UserId is missing"
            })
        }
        const listofallvendors=await Vendor.find().select('-password').populate("servicesOffered");
        if(listofallvendors.length<1) return res.status(400).json({
            message:"No vendors are there",
            vendors:[]
        })
        return res.status(200).json({
            message:"Here are the list of all vendors",
            vendors:listofallvendors,
            count:listofallvendors.length
        })
    } catch (error) {
        console.log("Error in getAllVendors ",error);
        res.status(500).json({message:"Something went wrong in getAllVendors"});
    }
}

export const getAllPlanners=async(req,res)=>{
    try {
        const userId=req.user?.id;
        if(!userId)
        {
            return res.status(400).json({
                message:"UserId is missing"
            })
        }
        const listofallplanners=await Planner.find().select("-password");
        if(listofallplanners<1)
        {
            return res.status(400).json({
                message:"No planner",
                planner:[]
            })
        }
        return res.status(200).json({
            message:"Here are the list of all Planner",
            planner:listofallplanners,
            count:listofallplanners.length
        })
        
    } catch (error) {
        console.log("Error in fetching planner");
        return res.status(500).json({
            message:"Server error in getallplanner"
        })
    }
}

export const addReview = async (req, res) => {
  try {
    const { userId, targetId, targetType, rating, comment } = req.body;

    if (!userId || !targetId || !targetType || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = new Review({
      userId,
      targetId,
      targetType,
      rating,
      comment,
    });

    await review.save();

    return res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Add Review Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

