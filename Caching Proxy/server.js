const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const controller = require('./controller');

const args = process.argv.slice(2);

if (args.includes('--clear-cache')) {
    (async () => {
        try {
            await controller.clearCacheUtil();
            process.exit(0);
        } catch (err) {
            console.error('Error clearing cache', err.message);
            process.exit(1);
        }
    })();
} else {
    process.env.URL = process.argv[5] || '';
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening to port: ${process.env.PORT}`);
    })
}

