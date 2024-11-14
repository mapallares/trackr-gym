import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize' 

export const Invoice = sequelize.define('Invoices', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emissionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalCurrencyAmount: {
        type: DataTypes.NUMERIC,
        allowNull: false
    },
    currencyAmountUnitTypeId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isValid: {
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