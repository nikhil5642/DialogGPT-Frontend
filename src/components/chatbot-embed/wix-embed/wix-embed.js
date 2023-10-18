import React from "react";
import { JSEmbedComponent } from "../js-embed/js-embed";
import { IFrameEmbedComponent } from "../iframe-embed/iframe-embed";
import styles from "./wix-embed.module.scss";

export const WixEmbedComponent = ({ botID }) => {
	return (
		<div className={styles.wixEmbedContainer}>
			<h1>Add Chatbot to Your Wix Website</h1>
			<section>
				<h2>Option 1: Adding a Chat Bubble</h2>
				<span>
					Follow these steps to add a chat bubble to the bottom right corner of
					your Wix website:
				</span>
				<ol>
					<li>
						Log in to your <strong>Wix</strong> account.
					</li>
					<li>Select the website where you want to add the chat bubble.</li>
					<li>
						Open the <strong>Wix Editor</strong>.
					</li>
					<li>
						Click on the <strong>Add</strong> button in the left-hand menu. Then
						select "Embed code".
						<ol type="a">
							<li>
								Select <strong>Embed code</strong>.
							</li>
							<li>
								Choose <strong>Marketing tools</strong>.
							</li>
							<li>
								Select <strong>Embed code</strong>.
							</li>
						</ol>
					</li>
				</ol>
				<p>Refer to the image below for visual guidance:</p>
				<img
					src="/assets/wix_add_element.png"
					alt="Step 4: Click on the 'Add' button and follow the sub-steps (a, b, c)"
				/>
				<br />
				<br />
				<ol start="5">
					<li>
						Select <strong>Add Custom Code</strong>.
					</li>
				</ol>
				<img
					src="/assets/wix_empty_script.png"
					alt="Step 1: Click on the 'Add' button"
				/>
				<br />
				<br />
				<ol start="7">
					<li>
						Copy this <strong>Code</strong>.{" "}
						{!botID && (
							<span>
								ChatBot ID can be found in <strong>General Settings</strong> of
								your Chatbot.
							</span>
						)}
					</li>
				</ol>
				<div className={styles.scriptContainer}>
					<JSEmbedComponent
						botID={botID}
						title={"Click the 'Copy' button below to copy the code"}
					></JSEmbedComponent>
				</div>
				<br />
				<br />
				<ol start="8">
					<li>Paste the Code into the section mentioned in the image below.</li>
				</ol>
				<img
					src="/assets/wix_enter_script.png"
					alt="Step 8: Paste the copied code into the designated section"
				/>
				<br />
				<br />
				<ol start="9">
					<li>Verify that the script has been successfully added.</li>
				</ol>
				<img
					src="/assets/wix_script_added.png"
					alt="Step 1: Click on the 'Add' button"
				/>
				<br />
				<br />
				<ol start="10">
					<li>
						Finally, close the dashboard and publish the changes. You will now
						see the chat bubble on your website.
					</li>
				</ol>

				<p>Here's how the ChatBubble will look on your website:</p>

				<img
					src="/assets/wix_chat_bubble_final.png"
					alt="Final Output: ChatBubble on Your Website"
				/>
			</section>
			<section>
				<h2>Option 2: Add the Chat Window Anywhere on the Website</h2>
				<span>
					If you want to add the chat window in any section of your website, you
					can do so with the following steps:
				</span>
				<ol>
					<li>
						Log in to your <strong>Wix</strong> account.
					</li>
					<li>Select the website where you want to add the chat bubble.</li>
					<li>
						Open the <strong>Wix Editor</strong>.
					</li>
					<li>
						Click on the <strong>Add</strong> button in the left-hand menu. Then
						select "Embed code".
						<ol type="a">
							<li>
								Select <strong>Embed code</strong>.
							</li>
							<li>
								Choose <strong>Popular Embeds</strong>.
							</li>
							<li>
								Select <strong>Embed HTML</strong>.
							</li>
						</ol>
					</li>
				</ol>
				<p>Refer to the image below for visual guidance:</p>
				<img
					src="/assets/wix_add_frame_element.png"
					alt="Step 4: Click on the 'Add' button and follow the sub-steps (a, b, c)"
				/>

				<br></br>
				<br></br>

				<ol start="5">
					<li>
						Copy this <strong>Code</strong>.{" "}
						{!botID && (
							<span>
								ChatBot ID can be found in <strong>General Settings</strong> of
								your Chatbot.
							</span>
						)}
					</li>
				</ol>

				<div className={styles.scriptContainer}>
					<IFrameEmbedComponent
						botID={botID}
						title={"Click the 'Copy' button below to copy the code"}
					></IFrameEmbedComponent>
				</div>

				<br />
				<br />

				<ol start="6">
					<li>
						Paste the Code into the section mentioned in the image below. And{" "}
						<strong>Update!</strong>
					</li>
				</ol>

				<p>Ensure there's enough space for the ChatBot:</p>

				<img
					src="/assets/wix_frame_adding.png"
					alt="Step 6: Paste the copied code into the designated section and update"
				/>

				<br />
				<br />

				<ol start="7">
					<li>
						Finally, publish the changes. You will now see the chat window
						embedded in your website.
					</li>
				</ol>

				<p>Here's how the ChatBot will appear on your website:</p>

				<img
					src="/assets/wix_frame_final.png"
					alt="Final Output: ChatBot on Your Website"
				/>
			</section>
		</div>
	);
};
