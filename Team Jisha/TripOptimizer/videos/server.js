const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/itineraries", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ItinerarySchema = new mongoose.Schema({
    destination: String,
    startDate: String,
    endDate: String,
    budget: Number,
    interests: [String],
    itinerary: String
});

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);

// Sample Itinerary Generator (You can improve this logic)
function generateItinerary(destination, interests) {
    let places = {
        food: ["Famous Street Food", "Top Restaurants"],
        adventure: ["Hiking Trails", "Water Sports"],
        history: ["Historical Museums", "Ancient Sites"],
        nature: ["Botanical Gardens", "Nature Reserves"],
        nightlife: ["Best Clubs", "Live Music Spots"]
    };

    let recommendations = interests.map(interest => places[interest] || []).flat();
    return ⁠ Your itinerary for ${destination}: ${recommendations.join(", ")}. ⁠;
}

// API Endpoint to Generate Itinerary
app.post("/generate-itinerary", async (req, res) => {
    const { destination, startDate, endDate, budget, interests } = req.body;
    const itineraryText = generateItinerary(destination, interests);

    const itinerary = new Itinerary({
        destination, startDate, endDate, budget, interests, itinerary: itineraryText
    });

    await itinerary.save();
    res.json({ itinerary: itineraryText });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));