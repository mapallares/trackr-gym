import {DataTypes} from 'sequelize' 
import {sequelize} from '../database/database.js'
import {Activities } from './Activities.js'

export const Services = sequelize.define('Services',  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cost:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    availableFrom:{
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }, 
    availableTo:{
        type: DataTypes.TIME
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

Services.hasMany(Activities, {
    foreignKey: 'serviceId', 
    sourceKey: 'id'
})

Activities.belongsTo(Services, {
    foreignKey: 'serviceId',
    targetId: 'id'
})
