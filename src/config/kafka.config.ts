import { Admin, Kafka, logLevel, Producer, ProducerRecord } from "kafkajs";

class KafkaConfig {
	private kafka: Kafka;
	private producer: Producer;
	private admin: Admin;
	private brokers: string | string[];

	constructor() {
		this.brokers = [process.env.KAFKA_BROKER ?? "192.168.0.3:9092"];
		this.kafka = new Kafka({
			clientId: "my-kafka-app",
			brokers: this.brokers,
			logLevel: logLevel.DEBUG,
			retry: { retries: 2 },
		});
		this.producer = this.kafka.producer();
		this.admin = this.kafka.admin();
	}
	async connect(): Promise<void> {
		await this.producer.connect();
		await this.admin.connect();
	}
	async disconnect(): Promise<void> {
		await this.producer.disconnect();
		await this.admin.disconnect();
	}
	async createTopic(topic: string): Promise<void> {
		try {
			await this.admin.createTopics({
				topics: [{ topic, numPartitions: 1 }],
			});
			console.log(`Topic ${topic} created.`);
		} catch (error) {
			console.error(`Failed to create topic ${topic}:`, error);
		}
	}

	async sendMessageToTopic(
		topic: string,
		messages: ProducerRecord["messages"]
	): Promise<void> {
		try {
			await this.producer.send({
				topic,
				messages,
			});
			console.log(`Message sent to topic ${topic}: ${messages}`);
		} catch (error) {
			console.error(`Error sending message to topic ${topic}:`, error);
		}
	}
}
export const kafkaClient = new KafkaConfig();
