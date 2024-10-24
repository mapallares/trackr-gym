import { InvalidFormatError } from "../../errors/error/InvalidFormat.error.mjs"

export class Validator {

    static required(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (fields[key] === undefined || fields[key] === null || fields[key].toString().trim() === '') {
                throw new error(`El campo ${key} es requerido y no puede estar vacío`)
            }
        })
    }

    static length(fields, min, max, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (fields[key].length < min || fields[key].length > max) {
                throw new error(`El campo ${key} debe tener entre ${min} y ${max} caracteres`)
            }
        })
    }

    static email(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser un email válido`)
            }
        })
    }

    static type(fields, type, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (typeof fields[key] !== type) {
                throw new error(`El campo ${key} debe ser de tipo ${type}`)
            }
        })
    }

    static isArray(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
            Object.keys(fields).forEach((key) => {
                if (!(fields[key] instanceof Array)) {
                    throw new error(`El campo ${key} debe ser un array`)
                }
            })
    }

    static isNumeric(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (isNaN(fields[key])) {
                throw new error(`El campo ${key} debe ser un número válido`)
            }
        })
    }

    static isInteger(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (!Number.isInteger(fields[key])) {
                throw new error(`El campo ${key} debe ser un número entero`)
            }
        })
    }

    static isBoolean(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (typeof fields[key] !== 'boolean') {
                throw new error(`El campo ${key} debe ser de tipo booleano`)
            }
        })
    }

    static isDate(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una fecha válida en formato YYYY-MM-DD`)
            }

            const date = new Date(fields[key])
            if (isNaN(date.getTime())) {
                throw new error(`El campo ${key} no corresponde a una fecha válida`)
            }
        })
    }

    static isStrongPassword(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
            if (!passwordRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una contraseña segura: mínimo 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un símbolo`)
            }
        })
    }

    static isIn(fields, validValues, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (!validValues.includes(fields[key])) {
                throw new error(`El campo ${key} debe ser uno de los siguientes valores: ${validValues.join(', ')}`)
            }
        })
    }

    static isUrl(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
            if (!urlRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una URL válida`)
            }
        })
    }

    static isUUID(fields, error = InvalidFormatError) {
        if (!(fields instanceof Object)) throw new InvalidFormatError('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (!uuidRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser un UUID válido`)
            }
        })
    }

}

export default Validator