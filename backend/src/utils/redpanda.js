const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'fulfillflow-app',                // unique client id for this app
  brokers: [process.env.REDPANDA_BROKER],     // broker address from .env
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'fulfillflow-group' });

const connectKafka = async () => {
  try {
    await producer.connect();
    console.log('✅ Connected to Redpanda Producer!');

    await consumer.connect();
    console.log('✅ Connected to Redpanda Consumer!');
  } catch (err) {
    console.error('❌ Redpanda connection error:', err);
  }
};

connectKafka();

module.exports = { producer, consumer };
