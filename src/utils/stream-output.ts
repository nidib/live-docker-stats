export function handleDockerStatsStreamOutput(output: Buffer) {
	const dataStr = output.toString('utf-8');

	if (dataStr.includes('\x1B')) {
		return;
	}

	const listOfContainers = dataStr
		.split('\n')
		.filter(Boolean)
		.map((stringContainer) => JSON.parse(stringContainer));

	return JSON.stringify(listOfContainers);
}

export function getStreamDataOutput(data: string): string {
	return `data: ${data}\n\n`;
}
