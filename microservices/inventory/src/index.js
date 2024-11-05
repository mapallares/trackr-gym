import app from "./app.js";
import { sequelize } from "./database/database.js";
import './models/Product.js'
import './models/InventoryMovement.js'

async function main() {
    try {
        await sequelize.sync({force: true});
        app.listen(3005);
        console.log("Server is running on port 3000...");
    } catch (error) {
        console.error("No pudo hacerse la conexion al server",error)
    }
}
main();