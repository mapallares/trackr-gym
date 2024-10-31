import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize' 

 export const InvertoryMovement = sequelize.define('InvertoryMovements',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    paymentId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        defaultValue:"System",
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
})