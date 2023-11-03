import React, { useState, useEffect, useRef, use } from "react";
import { postRequest } from "../../helper/http-helper";
import styles from "./chatbot-component.module.scss";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ChatBotSource } from "./chatbot-component.utils";
import ChatHistoryService from "../../helper/ChatHistoryService";
import LoadingButton from "../loading-button/loading-button";

export default function ChatBotComponent({ config }) {
	const {
		botID,
		initialMessage = "",
		source = ChatBotSource.CHATBOT,
		quickPrompts = "",
		theme = ChatTheme.LIGHT,
		profilePicture = null,
		userMsgColor = "#ff0000",
		displayName = "",
		leadsCollection = [],
	} = config;
	const [messages, setMessages] = useState([]);
	const [chatId, setChatId] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const [leadsSubmitted, setLeadsSubmitted] = useState(true);
	const messagesEndRef = useRef(null);
	const [sending, setSending] = useState(false);
	const [rows, setRows] = useState(1);

	useEffect(() => {
		if (
			initialMessage != "" &&
			source != ChatBotSource.SETTINGS &&
			source != ChatBotSource.CHATBOT
		) {
			ChatHistoryService.getChatHistory(botID)
				.then((res) => {
					if (res) {
						setChatId(res.chatId);
						setMessages(res.history);
						setLeadsSubmitted(res.leadsSubmitted);
						if (res.history.length == 0) {
							initialView();
						}
					}
				})
				.catch((e) => {
					initialView();
				});
		} else {
			initialView();
		}
	}, [initialMessage, source]);

	const renderers = {
		a: ({ href, children }) => {
			return (
				<a href={href} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		},
	};
	const getSplittedParagraphs = (text) => {
		const lines = text
			.split("\n\n")
			.map((line) => line.replace(/^\n+|\n+$/g, "").trim())
			.filter((line) => line.trim() !== "");
		return lines;
	};
	const getSplittedMessages = (text) => {
		const lines = text
			.split("\n")
			.map((line) => line.replace(/^\n+|\n+$/g, "").trim())
			.filter((line) => line.trim() !== "");
		return lines;
	};

	const addMessage = (text, messageType) => {
		const lines = getSplittedParagraphs(text);
		// Add each line as a separate message with a delay
		lines.forEach((line, index) => {
			setTimeout(() => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ id: prevMessages.length + 1, text: line, type: messageType },
				]);
			}, index * 500); // 0.5s delay between each message
		});
	};

	const initialView = () => {
		setMessages([]);
		const lines = getSplittedMessages(initialMessage);
		lines.forEach((line, _) => {
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: prevMessages.length + 1, text: line, type: "incoming" },
			]);
		});

		if (source === ChatBotSource.SETTINGS) {
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: 1000, text: "hi", type: "outgoing" },
			]);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault(); // Prevents the default action (newline) when pressing Enter
			handleSend();
		}
	};
	useEffect(() => {
		const numOfLineBreaks = (newMessage.match(/\n/g) || []).length;
		setRows(Math.min(numOfLineBreaks + 1, 5));
	}, [newMessage]);

	useEffect(() => {
		if (messagesEndRef.current) {
			const container = messagesEndRef.current.parentElement;
			container.scrollTop = container.scrollHeight;
		}
		if (chatId != null) {
			ChatHistoryService.storeChatHistory(
				botID,
				chatId,
				leadsSubmitted,
				messages,
			);
		}
	}, [messages, chatId]);

	const handleLeadSubmit = () => {
		setLeadsSubmitted(true);
		if (chatId != null) {
			ChatHistoryService.storeChatHistory(botID, chatId, true, messages);
		}
	};

	const handleSend = () => {
		if (source === ChatBotSource.SETTINGS) {
			return;
		}
		if (newMessage.trim() !== "") {
			if (!sending) {
				setMessages((prevMessages) => [
					...prevMessages,
					{ id: prevMessages.length + 1, text: newMessage, type: "outgoing" },
				]);
				setNewMessage("");
				setSending(true);
				postRequest(
					"/reply",
					{
						botID: botID,
						chatId: chatId,
						query: newMessage,
						history: messages,
					},
					{},
					100000,
				)
					.then((res) => {
						addMessage(res.result.reply, "incoming");
						setSending(() => false);
					})
					.catch((e) => {
						setSending(() => false);
					});
			}
		}
	};

	const refresh = () => {
		ChatHistoryService.clearChatHistory(botID).then(() => {
			ChatHistoryService.getChatHistory(botID)
				.then((res) => {
					if (res) {
						setChatId(res.chatId);
						setMessages(res.history);
						setLeadsSubmitted(res.leadsSubmitted);
						if (res.result.length == 0) {
							initialView();
						}
					}
				})
				.catch((e) => {
					initialView();
				});
		});
	};

	return (
		<div className={styles.chatbotContainer}>
			<div className={styles.chatbotHeaderContainer}>
				{profilePicture && (
					<img src={profilePicture} className={styles.headerImage} />
				)}
				{displayName && <h5>{displayName}</h5>}

				<div className={styles.chatbotHeaderRightContainer}>
					<button onClick={refresh}>
						<img src="/assets/refresh_grey.png"></img>
					</button>
					{source === ChatBotSource.SETTINGS && (
						<button onClick={() => {}}>
							<img src="/assets/close.png" className={styles.closePng}></img>
						</button>
					)}
				</div>
			</div>
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
							style={{
								backgroundColor:
									message.type === "incoming" ? "f0f0f0" : userMsgColor,
							}}
						>
							<ReactMarkdown components={renderers}>
								{message.text}
							</ReactMarkdown>
						</div>
					</div>
				))}
				{sending && (
					<div className={styles.loaderBubble}>
						<div className={styles.loader}>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
						</div>
					</div>
				)}
				{!sending &&
					leadsCollection.length > 0 &&
					leadsSubmitted == false &&
					source != ChatBotSource.SETTINGS &&
					messages.filter((message) => message.type === "outgoing").length >
						0 && (
						<LeadCollectionView
							botID={botID}
							chatId={chatId}
							leadsCollection={leadsCollection}
							onLeadSubmit={handleLeadSubmit}
							onLeadCancelled={handleLeadSubmit}
						/>
					)}
				{source != ChatBotSource.SETTINGS && <div ref={messagesEndRef} />}
			</div>
			<div className={styles.chatbotPromptsContainer}>
				{getSplittedMessages(quickPrompts).map((prompt) => (
					<button
						key={prompt}
						className={styles.quickPrompt}
						onClick={() => {
							setNewMessage(prompt);
							handleSend();
						}}
					>
						{prompt}
					</button>
				))}
			</div>
			<div className={styles.inputContainer}>
				<textarea
					rows={rows}
					placeholder=""
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					className={styles.inputTextArea}
				></textarea>
				<button onClick={handleSend} className={styles.sendButton}>
					<Image
						src="/assets/send_message.png"
						alt={"Send"}
						title={"Send"}
						loading="lazy"
						height={24}
						width={24}
					></Image>
				</button>
			</div>
			{/* TODO: This is to show powered by, will add this again after gaining some traction*/}
			{/* {source === ChatBotSource.CHATBOT && (
				<div className={styles.poweredBy}>
					<p>
						Powered by{" "}
						<a
							href="https://www.dialoggpt.io"
							target="_blank"
							rel="noopener noreferrer"
						>
							DialogGPT
						</a>
					</p>
				</div>
			)} */}
		</div>
	);
}

const LeadCollectionView = ({
	botID,
	chatId,
	leadsCollection,
	onLeadSubmit,
}) => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [saving, setSaving] = useState(false);
	const submitLead = () => {
		setSaving(true);
		postRequest("/store_lead_info", {
			botID: botID,
			chatId: chatId,
			email: email,
			phone: phone,
			name: name,
		})
			.then(() => {
				setSaving(false);
				onLeadSubmit();
			})
			.catch((e) => {
				setSaving(false);
			});
	};
	return (
		<div className={styles.leadCollectionContainer}>
			<p> Help us with your details:</p>
			<img src="/assets/close_grey.png" onClick={onLeadSubmit} />
			{leadsCollection.includes("lead_name") && (
				<div className={styles.leadInput}>
					<p>Name:</p>
					<textarea
						rows="1"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			)}
			{leadsCollection.includes("lead_email") && (
				<div className={styles.leadInput}>
					<p>Email:</p>
					<textarea
						rows="1"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			)}
			{leadsCollection.includes("lead_phone") && (
				<div className={styles.leadInput}>
					<p>Phone</p>
					<textarea
						rows="1"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
			)}

			<div className={styles.submitButton}>
				<LoadingButton
					title={"Submit"}
					onClick={submitLead}
					isLoading={saving}
				></LoadingButton>
			</div>
		</div>
	);
};
