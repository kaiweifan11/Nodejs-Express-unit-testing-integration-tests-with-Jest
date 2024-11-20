const mongoose = require('mongoose');

const uri = 
"mongodb+srv://raid:raid@raid-swe-challenge.hquma1f.mongodb.net/todo-tdd?retryWrites=true&w=majority&appName=Raid-swe-challenge";

async function connect() {
    try {
        await mongoose.connect(uri)
            .then(() => console.log("Database Connected Successfully"))
            .catch(err => console.log(err));
    } catch (err) {
        console.error("Connecting to mongo db");
        console.error(err);
    }
}

module.exports = { connect };

