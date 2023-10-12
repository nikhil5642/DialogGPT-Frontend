export function formatTimestamp(timestamp) {
	if (timestamp === undefined || timestamp === null) {
		return "";
	}
	const date = new Date(timestamp);
	// Extracting date components
	const options = {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

	return formattedDate;
}

export function timeAgo(timestamp) {
	if (timestamp === undefined || timestamp === null) {
		return "";
	}
	const date = new Date(timestamp);
	const difference = new Date().getTime() - date.getTime();
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 24;

	if (difference < minute) {
		return "just now";
	} else if (difference < hour) {
		return Math.floor(difference / minute) + " minutes ago";
	} else if (difference < day) {
		return Math.floor(difference / hour) + " hours ago";
	} else {
		return Math.floor(difference / day) + " days ago";
	}
}
