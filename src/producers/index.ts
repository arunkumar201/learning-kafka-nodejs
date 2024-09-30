import { Kafka } from "kafkajs";
import { createInterface } from "readline";
import { kafkaClient } from "../config/kafka.config";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
	crlfDelay: 1000,
});

const init = async () => {
	rl.setPrompt("Enter delivery ID and location: >");
	rl.prompt();
	rl.on("line", async (line) => {
		console.log(`Sending message: ${line}`);

		const [id, location] = line.split(" ");
		const res = await kafkaClient.sendMessageToTopic("deliver-tracker", [
			{
				partition: location.toLowerCase() === "south" ? 1 : 0,
				value: JSON.stringify({
					id: id,
					status: "delivered",
					date: new Date().toISOString(),
					location: location,
				}),
			},
		]);
		console.log(`Message sent: ${JSON.stringify(res, null, 2)}`);
		// rl.setPrompt("Enter delivery ID and location: >")
		rl.prompt();
	}).on("close", async () => {
		console.log("Closing Producer");
		await kafkaClient.disconnect();
		console.log("Producer Disconnected");
	});
};

init();
