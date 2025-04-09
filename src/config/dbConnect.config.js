const mongoose = require("mongoose")


const connectMongodb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        
        console.log(`Databse connected : ${connect.connection.host}, ${connect.connection.name}`)
    } catch (error) {
        console.log(`Something went wrong while connecting the database : ${error.message}`);
        process.exit(1);
    }
}


module.exports = connectMongodb