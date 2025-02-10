async function sendMessage() {
    var input = document.getElementById("chatbox-input");
    var message = input.value.trim();
    if (message !== "") {
        var chatBody = document.getElementById("chatbox-body");

        // Display user message
        var userMessage = document.createElement("div");
        userMessage.textContent = "You: " + message;
        userMessage.style.marginBottom = "10px";
        chatBody.appendChild(userMessage);

        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        // Display bot thinking message
        var botMessage = document.createElement("div");
        botMessage.textContent = "Bot: Thinking...";
        botMessage.style.marginBottom = "10px";
        chatBody.appendChild(botMessage);

        try {
            let response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer YOUR_OPENAI_API_KEY"  // Replace with your API key
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: message }],
                    max_tokens: 50
                })
            });

            let data = await response.json();
            botMessage.textContent = "Bot: " + (data.choices[0].message.content.trim() || "I'm not sure about that.");
        } catch (error) {
            botMessage.textContent = "Bot: Sorry, something went wrong.";
            console.error("Chatbot error:", error);
        }
    }
}

function toggleChatbox() {
    var chatbox = document.getElementById("chatbox");
    chatbox.style.display = (chatbox.style.display === "none" || chatbox.style.display === "") ? "flex" : "none";
}

function toggleMenu() {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
}

$(document).ready(function () {
    // Sticky Navbar & Scroll-Up Button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
        if ($(this).scrollTop() > 500) {
            $(".scroll-up-btn").addClass("show");
        } else {
            $(".scroll-up-btn").removeClass("show");
        }
    });

    $(".scroll-up-btn").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    // Mobile Menu Toggle
    $(".menu-btn").click(toggleMenu);

    // Ensure Typed.js only runs when elements exist
    if ($(".typing").length > 0) {
        new Typed(".typing", {
            strings: ["Developer", "Blogger", "Designer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    if ($(".typing-2").length > 0) {
        new Typed(".typing-2", {
            strings: ["Developer", "Blogger", "Designer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Owl Carousel for Team Section
    $(".carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});
