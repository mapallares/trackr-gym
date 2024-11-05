import { DataTypes } from 'sequelize' 
import {sequelize} from '../database/database.js'

import { Attendances } from './Attendances.js'


export const Bookings = sequelize.define('Bookings',  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId:{
        type: DataTypes.UUID
    },
    branchId:{
        type: DataTypes.UUID
    },
    date:{
        type: DataTypes.DATE
    },
    startTime:{
        type: DataTypes.TIME
    },
    endTime:{
        type: DataTypes.TIME
    },
    reason:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isApproved:{
        type: DataTypes.BOOLEAN,
        defaultValue: false

    },
    isCancelled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Created'
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

Bookings.hasMany(Attendances, {
    foreignKey: 'bookingId', 
    sourceKey: 'id'
})

Attendances.belongsTo(Bookings, {
    foreignKey: 'bookingId',
    targetId: 'id'
})

