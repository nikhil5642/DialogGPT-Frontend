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
            background-color: #333;
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
        }

        #chatbotIframe {
            width: 400px;
            height: 600px;
            position: fixed;
            bottom: 90px;
            right: 20px;
            border: none;
            z-index: 999;
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
	chatBubble.innerHTML = "🗨️"; // Initial chat icon
	document.body.appendChild(chatBubble);

	// Create the iframe
	var iframe = document.createElement("iframe");
	iframe.id = "chatbotIframe";
	iframe.src = "http://localhost:3000/iframe/" + chatbotID;
	document.body.appendChild(iframe);

	// Toggle iframe visibility and chat bubble icon on chat bubble click
	chatBubble.addEventListener("click", function () {
		var iframe = document.getElementById("chatbotIframe");
		if (iframe.style.display === "none" || iframe.style.display === "") {
			iframe.style.display = "block";
			chatBubble.innerHTML = "&#8595;"; // Down arrow icon when iframe is visible
		} else {
			iframe.style.display = "none";
			chatBubble.innerHTML = "🗨️"; // Chat icon when iframe is hidden
		}
	});
})();
