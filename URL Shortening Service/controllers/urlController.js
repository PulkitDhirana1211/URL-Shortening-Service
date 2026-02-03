const AppError = require('../classes/appError');
const URL = require('../models/urlModel');
const tryCatchAsync = require('../utils/tryCatchAsync');

const validateDoc = (doc) => {
    if (!doc) throw new AppError('Short URL not found', 404);
    return doc;
}

exports.createShortURL = async (req, res, next) => {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
        try {
            const { url } = req.body;
            const newShortURL = await URL.create({ url });
            return res.status(201).json({
                status: "success",
                data: {
                    urlID: newShortURL.urlID,
                    url: newShortURL.url,
                    shortCode: newShortURL.shortCode
                }
            })
        } catch (err) {
            attempts++;
            if (err.code === 11000 && err.keyPattern?.shortCode && attempts < maxAttempts) {
                continue;
            }
            return next(err);
        }
    }

}

exports.getOriginalUrl = tryCatchAsync(async (req, res, next) => {
    const shortCode = req.params.shortCode;

    const urlDoc = await URL.findOneAndUpdate(
        { shortCode },
        { $inc: { accessCount: 1 } },
        {
            new: true,
            runValidators: true,
            select: '-accessCount'
        }
    )

    validateDoc(urlDoc);

    return res.status(200).json({
        status: "success",
        data: urlDoc
    })
})

exports.getStats = tryCatchAsync(async (req, res, next) => {
    const shortCode = req.params.shortCode;

    const urlDoc = await URL.findOne({ shortCode })

    validateDoc(urlDoc);

    return res.status(200).json({
        status: "success",
        data: urlDoc
    })
})

exports.updateURL = tryCatchAsync(async (req, res, next) => {
    const { shortCode } = req.params;
    const { url } = req.body;

    const urlDoc = await URL.findOneAndUpdate(
        { shortCode },
        { url },
        {
            new: true,
            runValidators: true,
            select: '-accessCount'
        }
    )

    validateDoc(urlDoc);

    return res.status(200).json({
        status: "success",
        data: urlDoc
    })
})

exports.deleteShortURL = tryCatchAsync(async (req, res, next) => {
    const { shortCode } = req.params;

    const urlDoc = await URL.findOneAndDelete({
        shortCode
    })

    validateDoc(urlDoc);

    return res.status(204).end();
})