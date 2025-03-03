/**
 * Banner Slider (Slower Auto-Slide)
 * Initializes the slide index and sets up the slideshow functionality.
 */

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

/**
 * Displays the current slide and updates the slide index.
 */
function showSlides() {

    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? "block" : "none";
    });
    slideIndex = (slideIndex + 1) % slides.length;
}

/**
 * Sets the interval for the slideshow to change slides every 8 seconds.
 */

setInterval(showSlides, 8000);
showSlides();

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userMessage = document.getElementById("user-message");

    // Get modals
    const signInModal = document.getElementById("signin-modal");
    const signUpModal = document.getElementById("signup-modal");

    // Open modal function
    window.openModal = function (id) {
        document.getElementById(id).style.display = "block";
    }

    // Close modal function
    window.closeModal = function (id) {
        document.getElementById(id).style.display = "none";
    }

    // Handle Sign Up
    window.signUp = function () {
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const signupMessage = document.getElementById("signup-message");

        if (!username || !password) {
            signupMessage.innerText = "Please fill out all fields.";
            return;
        }

        if (localStorage.getItem(username)) {
            signupMessage.innerText = "Username already exists!";
        } else {
            localStorage.setItem(username, password);
            signupMessage.innerText = "Account created successfully!";
            setTimeout(() => {
                closeModal("signup-modal");
            }, 1500);
        }
    }

    // Handle Sign In
    window.signIn = function () {
        const username = document.getElementById("signin-username").value;
        const password = document.getElementById("signin-password").value;
        const loginMessage = document.getElementById("login-message");

        if (!username || !password) {
            loginMessage.innerText = "Please enter a username and password.";
            return;
        }

        if (localStorage.getItem(username) === password) {
            localStorage.setItem("loggedInUser", username);
            loginMessage.innerText = "Logged in successfully!";
            setTimeout(() => {
                closeModal("signin-modal");
                updateUI();
            }, 1500);
        } else {
            loginMessage.innerText = "Incorrect username or password!";
        }
    }

    // Handle Log Out
    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        updateUI();
    }

    // Update UI based on login status
    function updateUI() {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            loginBtn.style.display = "none";
            signupBtn.style.display = "none";
            logoutBtn.style.display = "block";
            userMessage.innerText = `Welcome, ${loggedInUser}!`;
        } else {
            loginBtn.style.display = "block";
            signupBtn.style.display = "block";
            logoutBtn.style.display = "none";
            userMessage.innerText = "";
        }
    }

    // Assign click events
    loginBtn.addEventListener("click", () => openModal("signin-modal"));
    signupBtn.addEventListener("click", () => openModal("signup-modal"));
    logoutBtn.addEventListener("click", logout);

    // Close modals when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === signInModal) closeModal("signin-modal");
        if (event.target === signUpModal) closeModal("signup-modal");
    });

    // Initialize login state
    updateUI();
});
