
//  Schedule an Ad
function scheduleAd() {
    const adContent = document.getElementById("ad-content").value.trim();
    const adDate = document.getElementById("ad-date").value;
    if (!adContent || !adDate) {
        alert("Please enter ad content and date!");
        return;
    }

    let adItem = document.createElement("li");
    adItem.innerHTML = ` ${adContent} - Scheduled for <b>${adDate}</b>`;
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
        "bakery": " Promote fresh-baked goods daily on Instagram. Offer discounts for social shares!",
        "gym": " Engage with customers using transformation posts. Run Facebook ads for memberships.",
        "clothing": " Use influencers for brand promotion. Offer limited-time discount codes on Twitter.",
        "default": " Optimize your online presence with social media ads, content marketing, and SEO strategies."
    };

    document.getElementById("marketing-result").innerHTML = strategies[businessType.toLowerCase()] || strategies["default"];
}
// login page layout
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginBtn').classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
}

function showSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupBtn').classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
}


