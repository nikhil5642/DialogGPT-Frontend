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
            width: 2.5rem;
            height: 2.5rem;
			background: transparent;
            border-radius: 50%;
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 1rem;
            z-index: 100000;
            user-select: none;
        }

        #chatbotIframe {
            width: 22rem;
            height: 35rem;
            position: fixed;
            bottom: 4rem;
            right: 1rem;
            z-index: 100000;
            border-radius: 0.75rem;
			background-color: #fefdfc;
            border: 1px solid #e5e7eb;
            display: none; /* Initially hidden */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.25);
        }
		.roundLoader {
			border: 0.15rem solid transparent;
			border-top: 0.15rem solid #666;
			border-radius: 50%;
			width: 2rem;
			height: 2rem;
			animation: spin 2s linear infinite;
			position: fixed;
			right: 200px; 
			bottom: 350px; 
			z-index: 10000;
			display: none;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

        /* Adjustments for smaller screens */
        @media (max-width: 768px) {
			#chatbotBubble {
				width: 3rem;
				height: 3rem;
				bottom: 0.5rem;
				right: 0.5rem;
			}
            #chatbotIframe {
                width: 90%;
                height: 70%;
                bottom: 4rem;
                right: 5%;
            }
        }
    `;

	// Inject styles into the head
	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);

	const screenWidth = window.innerWidth;
	const largeIconSize = screenWidth >= 768 ? "2.5rem" : "3rem";
	const smallIconSize = screenWidth >= 768 ? "1rem" : "1.25rem"; // Use 2rem for screens larger than 768px

	// Create the chat bubble
	var chatBubble = document.createElement("div");
	chatBubble.id = "chatbotBubble";
	chatBubble.innerHTML = `<img src="http://localhost:3000/assets/chat_icon.png" alt="Chat" loading="lazy" style="height: ${smallIconSize}; width: ${smallIconSize};">`;

	document.body.appendChild(chatBubble);

	var loader = document.createElement("div");
	loader.className = "roundLoader";
	document.body.appendChild(loader);

	// Create the iframe
	var isIframeLoaded = false;
	var iframe = document.createElement("iframe");
	iframe.id = "chatbotIframe";
	iframe.src =
		"http://localhost:3000/iframe/" + chatbotID + "?source=chat-bubble";
	iframe.loading = "lazy";
	iframe.onload = function () {
		loader.style.display = "none";
		isIframeLoaded = true;
	};

	document.body.appendChild(iframe);

	function setChatBubbleAppearance() {
		if (window.chatbotSettings && window.chatbotSettings.chatIcon) {
			chatBubble.style.backgroundColor = "transparent"; // Ensure the background is transparent
			chatBubble.innerHTML = `<img src="${window.chatbotSettings.chatIcon}" alt="Chat" loading="lazy" style="height: ${largeIconSize}; width: ${largeIconSize}; object-fit: fill; border-radius: 50%;">`;
		} else {
			// Check if window.chatbotSettings exists before trying to access chatBubbleColor
			var bgColor =
				window.chatbotSettings && window.chatbotSettings.chatBubbleColor
					? window.chatbotSettings.chatBubbleColor
					: "#000000";
			chatBubble.style.backgroundColor = bgColor;
			chatBubble.innerHTML = `<img src="http://localhost:3000/assets/chat_icon.png" alt="Chat" loading="lazy" style="height: ${smallIconSize}; width: ${smallIconSize};">`;
		}
	}
	function cleanupEventListeners() {
		chatBubble.removeEventListener("click", handleChatBubbleClick);
	}
	function handleChatBubbleClick() {
		var iframe = document.getElementById("chatbotIframe");
		loader.style.display = "block"; // Hide the loader

		if (iframe.style.display === "none" || iframe.style.display === "") {
			iframe.style.display = "block";
			if (isIframeLoaded) {
				loader.style.display = "none";
			}
			var bgColor =
				window.chatbotSettings && window.chatbotSettings.chatBubbleColor
					? window.chatbotSettings.chatBubbleColor
					: "#000000";
			chatBubble.style.backgroundColor = bgColor;
			chatBubble.style.backgroundColor = bgColor;
			chatBubble.innerHTML = `<img src="http://localhost:3000/assets/down_arrow_white.png" alt="Down" loading="lazy" style="height: 32px; width: 32px;">`; // Down arrow icon when iframe is visible
		} else {
			iframe.style.display = "none";
			loader.style.display = "none"; // Hide the loader
			setChatBubbleAppearance(); // Reset the chat bubble's appearance
		}
	}
	// Toggle iframe visibility and chat bubble icon on chat bubble click
	cleanupEventListeners();
	chatBubble.addEventListener("click", handleChatBubbleClick);
	window.addEventListener("pagehide", cleanupEventListeners); // Example
	// Fetch chatbot settings from the server
	fetch("https://api.dialoggpt.io/public/fetch_chatbot_interface", {
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
			// console.error("Error fetching chatbot settings:", error);
		});
})();
