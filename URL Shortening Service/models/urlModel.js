const mongoose = require('mongoose');
const Counter = require('./counterModel');
const generateCode = require('../utils/generateCode');

const urlSchema = mongoose.Schema({
    urlID: Number,
    url: {
        type: String,
        required: [true, 'A url must not be empty']
    },
    shortCode: {
        type: String,
        unique: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    accessCount: {
        type: Number,
        default: 0
    }
})

urlSchema.pre('save', async function () {
    if (!this.isNew) return;

    if (!this.shortCode) {
        this.shortCode = generateCode();
    }

    try {
        const counter = await Counter.findByIdAndUpdate('urlID',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.urlID = counter.seq;
    } catch (err) {
        console.log('Unable to set unique urlID');
        throw err;
    }

})

const URL = mongoose.model('URL', urlSchema, 'shortenedUrls');

module.exports = URL;