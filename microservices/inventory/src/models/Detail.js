import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize' 

export const Detail = sequelize.define('Details', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    key:{
        type: DataTypes.STRING,
        allowNull: false
    },
    value:{
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
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