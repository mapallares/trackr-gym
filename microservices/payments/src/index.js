import app from "./app.js";
import { sequelize } from "./database/database.js";
import './models/CurrencyAmountUnitType.js'
import './models/Invoice.js'
import './models/Payment.js'
import './models/PaymentComments.js'
import './models/PaymentMethod.js'

async function main() {
    try {
        await sequelize.sync({force: true});
        app.listen(3006);
        console.log("Server is running on port 3006...");
    } catch (error) {
        console.error("Could not connect to the server",error)
    }
}
main();