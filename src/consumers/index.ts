import { kafkaClient } from "../config/kafka.config";

const init = async () => {
	try {
		await kafkaClient.connect();
		await kafkaClient.createTopic("deliver-tracker");
		console.log("Connected to Kafka");
	} catch (error) {
		console.error("Failed to connect to Kafka:", error);
		process.exit(1);
	}
};

process.on("SIGINT", async () => {
	await kafkaClient.disconnect();
	console.log("Kafka connection closed");
	process.exit(0);
});

init();
