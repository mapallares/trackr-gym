import app from './app.js'
import {sequelize} from './database/database.js'
import './models/Bookings.js'
import './models/Activities.js'
import './models/Services.js'
import './models/Attendances.js'

async function main(){
    try {
        await sequelize.sync()
        await sequelize.authenticate({force:true})
        console.log("Conection has been established successfully.");
        app.listen(3003)
        console.log("Server is listening port", 3003)
        
    } catch (error) {
        console.log("Unable to connect to the database", error);
    }

}

main();