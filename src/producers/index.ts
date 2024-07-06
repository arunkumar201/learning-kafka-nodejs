import { createInterface } from "readline";
import { kafkaClient } from "../client";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
	crlfDelay: 1000
})



const init = async () => {
	const producer = kafkaClient.producer();
	//logs num of partitions
	console.log("Partitions: ",kafkaClient.logger());
 

	console.log("Connecting Producer...");
	await producer.connect();
	console.log("Producer Connected");
	rl.setPrompt("Enter delivery ID and location: >")
	rl.prompt();
	rl.on("line",async (line) => {
		console.log(`Sending message: ${line}`);

		const [id,location] = line.split(" ");
		const res = await producer.send({
			topic: "deliver-tracker",
			messages: [
				{
					partition: location.toLowerCase() === "south" ? 1 : 0,
					value: JSON.stringify({
						id: id,
						status: "delivered",
						date: new Date().toISOString(),
						location: location
					}),
				}
			],
		});
		console.log(`Message sent: ${JSON.stringify(res,null,2)}`);
		// rl.setPrompt("Enter delivery ID and location: >")
		rl.prompt();


	}).on("close",(async () => {
		console.log("Closing Producer");
		await producer.disconnect();
		console.log("Producer Disconnected");
	}));
};

init();
