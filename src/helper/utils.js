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
