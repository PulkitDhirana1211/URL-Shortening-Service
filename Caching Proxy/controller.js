const axios = require('axios');
const redisClient = require('./redisClient');

const CACHE_TTL = 3600;

exports.getOriginalRoute = async (req, res) => {
    try {
        const originURL = process.env.URL;
        if (!originURL) {
            throw new Error('Unable to get origin URL');
        }

        const targetURL = `${originURL}${req.url}`;
        const cacheKey = targetURL;

        // Check cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`Cache HIT: ${targetURL}`);
            const cached = JSON.parse(cachedData);
            res.set('X-Cache', 'HIT');
            return res.status(200).json({
                status: "success",
                source: "cache",
                headers: cached.headers,
                data: cached.data
            });
        }

        // Cache miss - fetch from original url
        console.log(`Cache MISS: ${targetURL}`);
        const prodData = await axios.get(targetURL);

        const cachePayload = {
            headers: prodData.headers,
            data: prodData.data
        }

        // Cache the response
        redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(cachePayload)).catch(err =>
            console.error('Cache set error:', err)
        );
        res.set('X-Cache', 'MISS');


        return res.status(200).json({
            status: "success",
            source: "server",
            headers: prodData.headers,
            data: prodData.data
        });

    } catch (err) {
        console.error('Proxy error:', err.message);
        return res.status(err.response?.status || 500).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.clearCache = async (req, res) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        await redisClient.flushAll();
        console.log('Cache cleared successfully');

        return res.status(200).json({
            status: "success",
            message: "Cache cleared successfully"
        });
    } catch (err) {
        console.error('Cache clear error:', err.message);
        return res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.clearCacheUtil = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    await redisClient.flushAll();
    console.log('Cache cleared successfully');
    await redisClient.quit();
}