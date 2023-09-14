const mqtt = require('mqtt');

const mqttClient = mqtt.connect('ADD YOUR BORKER URL');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
});

mqttClient.on('error', (error) => {
    console.error('Error connecting to MQTT Broker:', error);
  });

module.exports = mqttClient;
