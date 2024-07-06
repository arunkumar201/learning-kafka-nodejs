import { kafkaClient } from "../client";

const init = async () => {
	const consumer = kafkaClient.consumer({ groupId: "group-1" });
	console.log("Connecting Consumer...");
	await consumer.connect();
	console.log("Consumer Connected");

	await consumer.subscribe({
		topic: "deliver-tracker",fromBeginning: true
	});


	await consumer.run({
		eachMessage: async ({ topic,partition,message }) => {
			console.log(`
			topic Name : ${topic}
			Partition: ${partition}
			Message Offset: ${message.offset}
			Message Key: ${message.key}
			Message value: ${message.value}`);
		},
	});
};
init();
