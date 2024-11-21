import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize'
import {InvertoryMovement} from './InventoryMovement.js'
import {Detail} from './Detail.js'

export const Product = sequelize.define('Products',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    variantOfId:{
        type: DataTypes.UUID,
        allowNull: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    purchasePrice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salePrice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isSaleProduct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gymId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    branchId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue : "Created",
        allowNull: false
    },
    isActive: {
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
        allowNull: true,
    }
})

Product.hasMany(InvertoryMovement,{
    foreignKey: 'productId',
    sourceKey: 'id'
})

InvertoryMovement.belongsTo(Product,{
    foreignKey: 'productId',
    targetId: 'id'
})

Product.hasMany(Detail,{
    foreignKey: 'productId',
    sourceKey: 'id'
})

Detail.belongsTo(Product,{
    foreignKey: 'productId',
    targetId: 'id' 
})