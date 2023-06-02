const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const{name, host} = db.connection;
        console.log(`Connected to ${name}DB in host ${host}`);

    } catch (error) { console.log("Error capturado: ",error)
        
    }
}

module.exports = {connect};