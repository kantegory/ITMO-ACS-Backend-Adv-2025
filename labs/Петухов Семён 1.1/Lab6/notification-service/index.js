const amqp = require("amqplib");

const QUEUE = "resume.created";
const RABBIT_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";

async function start() {
  try {
    console.log(`[notification-service] Connecting to RabbitMQ at ${RABBIT_URL}...`);
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`[notification-service] Waiting for messages in queue "${QUEUE}"`);

    channel.consume(
      QUEUE,
      (msg) => {
        if (!msg) return;
        const content = msg.content.toString();
        try {
          const data = JSON.parse(content);
          console.log("[notification-service] Received resume.created event:", data);
        } catch {
          console.log("[notification-service] Received raw message:", content);
        }
        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("[notification-service] RabbitMQ connection error:", err);
    setTimeout(start, 5000);
  }
}

start();

