import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
	clientId: "my-kafka-app",
	brokers: ["192.168.0.6:9092"],
});

const init = async () => {
	const admin = kafkaClient.admin();
	console.log("Connecting Admin...");
	await admin.connect();
	console.log("Admin Connected");
	//create the topic
	await admin.createTopics({
		topics: [
			{
				topic: "deliver-tracker",
				numPartitions: 1,
			},
		],
	});

	console.log("Topic Created");

	await admin.disconnect();
	console.log("Admin Disconnected");
};

// init();
