import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize' 

export const CurrencyAmountUnitType = sequelize.define('CurrencyAmountUnitTypes', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        defaultValue: "System",
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



