import {DataTypes} from 'sequelize' 
import {sequelize} from '../database/database.js'
import { Bookings } from './Bookings.js'
import { defaultValueSchemable, toDefaultValue } from 'sequelize/lib/utils'


export const Activities = sequelize.define('Activities',  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    branchId:{
        type: DataTypes.UUID
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    details:{
        type: DataTypes.TEXT
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    inCharge:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    capacity:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    startTime:{
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime:{
        type: DataTypes.TIME,
        allowNull: false
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

Activities.hasMany(Bookings, {
    foreignKey: 'activityId', 
    sourceKey: 'id',
    allowNull: true
})

Bookings.belongsTo(Activities, {
    foreignKey: 'activityId',
    targetId: 'id'
})