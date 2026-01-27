import amqp from "amqplib";

const QUEUE_NAME = "resume.created";
const RABBIT_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";

let channel: amqp.Channel | null = null;

async function getChannel(): Promise<amqp.Channel> {
  if (channel) {
    return channel;
  }

  const connection = await amqp.connect(RABBIT_URL);
  const ch = await connection.createChannel();
  await ch.assertQueue(QUEUE_NAME, { durable: true });
  channel = ch;

  connection.on("error", (err: unknown) => {
    console.error("[resume-service] RabbitMQ connection error:", err);
    channel = null;
  });

  connection.on("close", () => {
    console.warn("[resume-service] RabbitMQ connection closed, channel reset");
    channel = null;
  });

  return ch;
}

export async function publishResumeCreatedEvent(payload: unknown): Promise<void> {
  try {
    const ch = await getChannel();
    const buffer = Buffer.from(JSON.stringify(payload));
    ch.sendToQueue(QUEUE_NAME, buffer, { persistent: true });
    console.log("[resume-service] Published resume.created event");
  } catch (err: unknown) {
    console.error("[resume-service] Failed to publish resume.created event:", err);
  }
}

