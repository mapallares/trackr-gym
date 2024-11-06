import {sequelize} from '../database/database.js'
import { DataTypes } from 'sequelize' 
import {PaymentsComments} from './PaymentComments.js'
import { Invoice } from './Invoice.js'

export const Payment = sequelize.define('Payments', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethodId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paymentPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    currencyAmount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currencyAmountUnitTypeId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

Payment.hasMany(PaymentComments,{
    foreignKey: 'paymentId',
    sourceKey: 'id'
})

PaymentsComments.belongsTo(Payment,{
    foreignKey: 'paymentId',
    targetId: 'id'
})


Payment.hasMany(Invoice,{
    foreignKey: 'paymentId',
    sourceKey: 'id'
})

Invoice.belongsTo(Payment,{
    foreignKey: 'paymentId',
    targetId: 'id'
})