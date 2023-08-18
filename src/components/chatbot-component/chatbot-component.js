import React, { useState } from "react";
import { postRequest } from "../../helper/http-helper";

export default function ChatBotComponent({ botID }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [history, setHistory] = useState([]);

	const [sending, setSending] = useState(false);

	const handleSend = () => {
		if (newMessage.trim() !== "") {
			if (!sending) {
				setMessages([
					...messages,
					{ id: messages.length, text: newMessage, type: "outgoing" },
				]);
				setNewMessage("");
				setSending(true);
				postRequest("/reply", {
					botID: botID,
					query: newMessage,
					history: history,
				}).then((res) => {
					setHistory([...history, [res.result.query, res.result.query]]);
					setMessages((messages) => [
						...messages,
						{ id: messages.length, text: res.result.reply, type: "incoming" },
					]),
						setSending((sending) => false);
				});
			}
		}
	};

	return (
		<div>
			<div
				style={{
					height: "300px",
					overflowY: "scroll",
					border: "1px solid #ccc",
					padding: "10px",
				}}
			>
				{messages.map((message) => (
					<div
						key={message.id}
						style={{
							backgroundColor:
								message.type === "incoming" ? "#f0f0f0" : "#0084ff",
							color: message.type === "incoming" ? "#000" : "#fff",
							padding: "8px",
							borderRadius: "8px",
							marginBottom: "8px",
							alignSelf:
								message.type === "incoming" ? "flex-start" : "flex-end",
						}}
					>
						{message.text}
					</div>
				))}
			</div>
			<div style={{ marginTop: "10px" }}>
				<input
					type="text"
					placeholder="Type a message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					style={{
						padding: "8px",
						marginRight: "10px",
						borderRadius: "4px",
						border: "1px solid #ccc",
					}}
				/>
				<button
					onClick={handleSend}
					style={{
						padding: "8px",
						borderRadius: "4px",
						backgroundColor: "#0084ff",
						color: "#fff",
						border: "none",
						cursor: "pointer",
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}
