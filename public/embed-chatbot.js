(function () {
	var scriptTag =
		document.currentScript ||
		(function () {
			var scripts = document.getElementsByTagName("script");
			return scripts[scripts.length - 1];
		})();
	var chatbotID = scriptTag.getAttribute("id");

	// Styles for the chat bubble and iframe
	var styles = `
        #chatbotBubble {
            width: 60px;
            height: 60px;
            background-color: #000000;
            border-radius: 50%;
            position: fixed;
            bottom: 20px;
            right: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 24px;
            z-index: 1000;
            user-select: none;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.25);
        }

        #chatbotIframe {
            width: 400px;
            height: 600px;
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 999;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            display: none; /* Initially hidden */
        }

        /* Adjustments for smaller screens */
        @media (max-width: 768px) {
            #chatbotIframe {
                width: 90%;
                height: 70%;
                bottom: 80px;
                right: 5%;
            }
        }
    `;

	// Inject styles into the head
	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);

	// Create the chat bubble
	var chatBubble = document.createElement("div");
	chatBubble.id = "chatbotBubble";
	chatBubble.innerHTML = `<img src="https://dialoggpt.io/assets/chat_icon.png" style="height: 24px; width: 24px;">`;

	document.body.appendChild(chatBubble);

	// Create the iframe
	var iframe = document.createElement("iframe");
	iframe.id = "chatbotIframe";
	iframe.src =
		"https://dialoggpt.io/iframe/" + chatbotID + "?source=chat-bubble";
	document.body.appendChild(iframe);

	function setChatBubbleAppearance() {
		if (window.chatbotSettings && window.chatbotSettings.chatIcon) {
			chatBubble.style.backgroundColor = "transparent";
			chatBubble.innerHTML = `<img src="${window.chatbotSettings.chatIcon}" style="height: 64px; width: 64px; object-fit: fill; border-radius: 50%;">`;
		} else {
			// Check if window.chatbotSettings exists before trying to access chatBubbleColor
			var bgColor =
				window.chatbotSettings && window.chatbotSettings.chatBubbleColor
					? window.chatbotSettings.chatBubbleColor
					: "#000000";
			chatBubble.style.backgroundColor = bgColor;
			chatBubble.innerHTML = `<img src="https://dialoggpt.io/assets/chat_icon.png" style="height: 24px; width: 24px;">`;
		}
	}

	// Toggle iframe visibility and chat bubble icon on chat bubble click
	chatBubble.addEventListener("click", function () {
		var iframe = document.getElementById("chatbotIframe");
		if (iframe.style.display === "none" || iframe.style.display === "") {
			iframe.style.display = "block";
			chatBubble.innerHTML = `<img src="https://dialoggpt.io/assets/down_arrow_white.png" style="height: 32px; width: 32px;">`; // Down arrow icon when iframe is visible
		} else {
			iframe.style.display = "none";
			setChatBubbleAppearance(); // Reset the chat bubble's appearance
		}
	});

	// Fetch chatbot settings from the server
	fetch("https://api.dialoggpt.io/fetch_chatbot_interface", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			botID: chatbotID,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			// Store the fetched data in the window object for later use
			window.chatbotSettings = {
				chatIcon: data.result.chat_icon,
				chatBubbleColor: data.result.chat_bubble_color,
			};
			setChatBubbleAppearance();
		})
		.catch((error) => {
			console.error("Error fetching chatbot settings:", error);
		});
})();
