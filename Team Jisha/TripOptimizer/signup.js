// Open and Close Signup Modal
document.getElementById("openSignup").addEventListener("click", () => {
    document.getElementById("signupModal").style.display = "flex";
  });
  
  document.getElementById("closeSignup").addEventListener("click", () => {
    document.getElementById("signupModal").style.display = "none";
  });
  
  // Handle Signup Form Submission
  document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Signup successful! (Backend connection needed)");
    document.getElementById("signupModal").style.display = "none";
  });