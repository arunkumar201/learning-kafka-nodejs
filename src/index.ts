import { kafkaClient } from "./client";

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
				numPartitions: 2,

			},
		],
	});

	console.log("Topic Created");

	await admin.disconnect();
	console.log("Admin Disconnected");
};

init();
