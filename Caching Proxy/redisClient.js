const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Reddis error', err);
});


(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.log('Unable to connect to redis', err.message);
    }
})();

module.exports = client;