import React, { useState, useEffect, useRef } from "react";
import { postRequest } from "../../helper/http-helper";
import styles from "./chatbot-component.module.scss";
import Image from "next/image";

export default function ChatBotComponent({ botID }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [history, setHistory] = useState([]);
	const messagesEndRef = useRef(null);
	const [sending, setSending] = useState(false);
	const [rows, setRows] = useState(1);

	useEffect(() => {
		const numOfLineBreaks = (newMessage.match(/\n/g) || []).length;
		setRows(Math.min(numOfLineBreaks + 1, 5));
	}, [newMessage]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

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
				})
					.then((res) => {
						setHistory([...history, [res.result.query, res.result.query]]);
						setMessages((messages) => [
							...messages,
							{ id: messages.length, text: res.result.reply, type: "incoming" },
						]),
							setSending(() => false);
					})
					.catch(() => {});
			}
		}
	};

	return (
		<div className={styles.chatbotContainer}>
			<div className={styles.chatbotMessagesContainer}>
				{messages.map((message) => (
					<div
						key={message.id}
						className={
							message.type === "incoming"
								? styles.incomingBubble
								: styles.outgoingBubble
						}
					>
						<div
							className={
								message.type === "incoming"
									? styles.incomingMessageContainer
									: styles.outgoingMessageContainer
							}
						>
							{message.text}
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<div className={styles.inputContainer}>
				<textarea
					rows={rows}
					placeholder="Type a message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className={styles.inputTextArea}
				></textarea>

				<button onClick={handleSend} className={styles.sendButton}>
					<Image
						src="/assets/send_message.png"
						alt={"Send"}
						title={"Send"}
						loading="eager"
						height={24}
						width={24}
					></Image>
				</button>
			</div>
		</div>
	);
}
