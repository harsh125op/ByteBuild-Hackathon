// 📊 SEO Performance Analytics
const seoChartCtx = document.getElementById("seoChart")?.getContext("2d");
if (seoChartCtx) {
    new Chart(seoChartCtx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Website Traffic",
                data: [200, 400, 600, 800, 1000],
                borderColor: "#00ff7f",
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

// 📊 Ad Performance Analytics
const adChartCtx = document.getElementById("adChart")?.getContext("2d");
if (adChartCtx) {
    new Chart(adChartCtx, {
        type: "bar",
        data: {
            labels: ["Instagram", "Facebook", "Google Ads", "LinkedIn"],
            datasets: [{
                label: "Engagement (Clicks & Views)",
                data: [200, 350, 500, 120],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]
            }]
        },
        options: { responsive: true }
    });
}

// 📅 Schedule an Ad
function scheduleAd() {
    const adContent = document.getElementById("ad-content").value.trim();
    const adDate = document.getElementById("ad-date").value;
    if (!adContent || !adDate) {
        alert("Please enter ad content and date!");
        return;
    }

    let adItem = document.createElement("li");
    adItem.innerHTML = `📢 ${adContent} - Scheduled for <b>${adDate}</b>`;
    document.getElementById("scheduled-ads").appendChild(adItem);
}

// 🎯 AI-Based Marketing Strategy Generator
function generateMarketingStrategy() {
    const businessType = document.getElementById("business-type").value.trim();
    if (!businessType) {
        alert("Please enter your business type!");
        return;
    }

    const strategies = {
        "bakery": "🍞 Promote fresh-baked goods daily on Instagram. Offer discounts for social shares!",
        "gym": "🏋️ Engage with customers using transformation posts. Run Facebook ads for memberships.",
        "clothing": "👕 Use influencers for brand promotion. Offer limited-time discount codes on Twitter.",
        "default": "🚀 Optimize your online presence with social media ads, content marketing, and SEO strategies."
    };

    document.getElementById("marketing-result").innerHTML = strategies[businessType.toLowerCase()] || strategies["default"];
}

// 📩 Function to Send Chatbot Message
function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    let userMessage = document.createElement("p");
    userMessage.classList.add("user");
    userMessage.innerText = `🧑 ${userInput}`;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    setTimeout(() => {
        let botResponse = document.createElement("p");
        botResponse.classList.add("bot");
        botResponse.innerText = "🤖 AI: That's a great question! Let's explore more.";
        chatBox.appendChild(botResponse);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// 🎤 Voice Recognition (Speech-to-Text)
function startVoiceRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById("user-input").value = event.results[0][0].transcript;
        sendMessage();
    };
}

// 🎬 Smooth GSAP Animations
gsap.from(".navbar", { duration: 1, opacity: 0, y: -30, delay: 0.5 });
gsap.from("h2", { duration: 1, opacity: 0, y: -20, delay: 0.7 });
gsap.from("button", { duration: 1, opacity: 0, scale: 0.8, delay: 1 });
