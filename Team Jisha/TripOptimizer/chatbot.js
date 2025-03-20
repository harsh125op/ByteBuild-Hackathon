
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        displayMessage(message, 'user');
        userInput.value = '';
        generateResponse(message);
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function generateResponse(userMessage) {
    let botResponse = "Sorry! Im not currently Able to answer this questions, Please try with some other questions. ";

    
    // Simple keyword-based responses
    if (userMessage.toLowerCase().includes('hello')) {
        botResponse = "Hello! How can I help you today?";
    } else if (userMessage.toLowerCase().includes('how are you')) {
        botResponse = "I'm just a bot, but thanks for asking!";
    } else if (userMessage.toLowerCase().includes('bye')) {
        botResponse = "Goodbye! Have a great day!";
    }
    else if (userMessage.toLowerCase().includes('best hotel in manali')) {
        botResponse = "The best hotels in Manali include The Manali Inn, a 5-star hotel offering luxurious rooms and breathtaking views, The Himalayan, a 4-star hotel with cozy rooms and stunning valley views, and Manu Allaya, a 4-star hotel featuring comfortable rooms and beautiful gardens.";
    }else if (userMessage.toLowerCase().includes('best beach in goa')) {
        botResponse = "Palolem Beach is often considered one of the best beaches in Goa, known for its picturesque views, calm waters, and serene atmosphere.";
    }else if (userMessage.toLowerCase().includes('best places in north india')) {
        botResponse = " North India's top destinations include the Taj Mahal, Delhi, Shimla, Manali, Amritsar, Varanasi, and Kashmir.";
    }else if (userMessage.toLowerCase().includes('budget for bali')) {
        botResponse = "A budget-friendly trip to Bali for 7-10 days can cost around ₹50,000-₹80,000 per person. Mid-range trips can cost ₹80,000-₹1,20,000 per person, while luxury trips can exceed ₹2,00,000 per person.";
    }else if (userMessage.toLowerCase().includes('places to vist in agra')) {
        botResponse = "Agra's top attractions: Taj Mahal, Agra Fort, Fatehpur Sikri, Itmad-Ud-Daulah's Tomb, Akbar's Mausoleum, and Mehtab Bagh. ";
    }

    displayMessage(botResponse, 'bot');
}
