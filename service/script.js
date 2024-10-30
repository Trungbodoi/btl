document.addEventListener("DOMContentLoaded", () => {
    // Toggle FAQ answers
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });

    // Contact form validation
    const supportForm = document.getElementById("supportForm");
    const formMessage = document.getElementById("formMessage");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    supportForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Email validation
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            emailError.textContent = "Email is required.";
            emailError.style.display = "block";
            return;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.style.display = "block";
            return;
        } else {
            emailError.style.display = "none";
        }

        // Display success message
        formMessage.textContent = "Cảm ơn câu hỏi của bạn chúng tôi sẽ phản hồi sớm nhất có thể";
        formMessage.style.color = "greenyellow";
        supportForm.reset();
    });

    // Remove error message on input
    emailInput.addEventListener("input", () => {
        emailError.style.display = "none";
    });
});
