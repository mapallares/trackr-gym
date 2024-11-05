import {DataTypes} from 'sequelize' 
import {sequelize} from '../database/database.js'


export const Attendances = sequelize.define('Attendances',  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId:{
        type: DataTypes.UUID
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,

    },     
    arrivalTime:{
        type: DataTypes.TIME,
        allowNull: false,
    }, 
    departureTime:{
        type: DataTypes.TIME,
        allowNull: false,

    }, 
    comments:{
        type: DataTypes.TEXT,
    },
    status:{
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'created'
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
         defaultValue: DataTypes.NOW,
    },  
    createdBy:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'System'
    },  
    updatedAt:{
        type: DataTypes.DATE,
    },
    updatedBy:{
        type: DataTypes.STRING
    }
})