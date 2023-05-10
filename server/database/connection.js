const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conct = await mongoose.connect(process.env.MONGO_CLIENT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected : ${conct.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB