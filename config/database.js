const mongoose = require('mongoose');
const dbConnection = () => {
    mongoose.connect(process.env.DB_URL).then((conn) =>{
        console.log("DB is connected");
    }).catch((err) => {
        console.error(`DB Error: ${err}`);
        process.exit(1);
    });    
};
module.exports = dbConnection;