import { kafkaClient } from "../client";
const init = async () => {
	const producer = kafkaClient.producer();

	console.log("Connecting Producer...");
	await producer.connect();
	console.log("Producer Connected");

	//send the message
	await producer.send({
		topic: "deliver-tracker",
		messages: [
			{
				value: JSON.stringify({
					id: 1,
					status: "delivered",
					date: new Date().toISOString(),
					location: "SOUTH",
				}),
			},
			{
				value: JSON.stringify({
					id: 2,
					status: "delivered",
					date: new Date().toISOString(),
					location: "NORTH",
				}),
			},
		],
	});

	await producer.disconnect();

	console.log("Producer Disconnected");
};

init();
