const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:root@cluster0.v9ahybh.mongodb.net/Movies?retryWrites=true&w=majority";

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const{name, host} = db.connection;
        console.log(`Connected to ${name}DB in host ${host}`);

    } catch (error) { console.log("Error capturado: ",error)
        
    }
}

module.exports = {connect};