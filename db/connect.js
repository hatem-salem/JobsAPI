const mongoose = require('mongoose');

const connectDB = async(url) => {
    mongoose.set('debug', true);
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB;