document.getElementById("itineraryForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const budget = document.getElementById("budget").value;
    const interests = Array.from(document.getElementById("interests").selectedOptions).map(option => option.value);

    const response = await fetch("http://localhost:5000/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, startDate, endDate, budget, interests })
    });

    const data = await response.json();
    document.getElementById("itineraryResults").innerHTML = ⁠ <h2>Your Itinerary</h2><p>${data.itinerary}</p> ⁠;
});