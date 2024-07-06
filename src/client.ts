import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
	clientId: "my-kafka-app",
	brokers: ["192.168.0.6:9092"],
});
