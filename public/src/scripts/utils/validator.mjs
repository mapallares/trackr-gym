import Notify from "./notify.mjs"

export class Validator {

    static valid($field, validations) {
        try {
            validations()
            return true
        } 
        catch (error) {
            $field.focus()
            Notify.notice(error.message, 'warning')
            return false
        }
    }

    static required(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (fields[key] === undefined || fields[key] === null || fields[key].toString().trim() === '') {
                throw new error(`El campo ${key} es requerido y no puede estar vacío`)
            }
        })
    }

    static length(fields, min, max, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (fields[key].length < min || fields[key].length > max) {
                throw new error(`El campo ${key} debe tener entre ${min} y ${max} caracteres`)
            }
        })
    }

    static email(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser un email válido`)
            }
        })
    }

    static type(fields, type, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (typeof fields[key] !== type) {
                throw new error(`El campo ${key} debe ser de tipo ${type}`)
            }
        })
    }

    static isArray(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
            Object.keys(fields).forEach((key) => {
                if (!(fields[key] instanceof Array)) {
                    throw new error(`El campo ${key} debe ser un array`)
                }
            })
    }

    static isNumeric(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (isNaN(fields[key])) {
                throw new error(`El campo ${key} debe ser un número válido`)
            }
        })
    }

    static isInteger(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (!Number.isInteger(fields[key])) {
                throw new error(`El campo ${key} debe ser un número entero`)
            }
        })
    }

    static isBoolean(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (typeof fields[key] !== 'boolean') {
                throw new error(`El campo ${key} debe ser de tipo booleano`)
            }
        })
    }

    static isDate(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
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

    static isTime(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/  // Formato HH:MM o HH:MM:SS
            if (!timeRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una hora válida en formato HH:MM o HH:MM:SS`)
            }
        })
    }

    static isStrongPassword(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
            if (!passwordRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una contraseña segura: mínimo 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un símbolo`)
            }
        })
    }

    static isIn(fields, validValues, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            if (!validValues.includes(fields[key])) {
                throw new error(`El campo ${key} debe ser uno de los siguientes valores: ${validValues.join(', ')}`)
            }
        })
    }

    static isUrl(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
            if (!urlRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser una URL válida`)
            }
        })
    }

    static isUUID(fields, error = Error) {
        if (!(fields instanceof Object)) throw new Error('No hay campos válidos')
        Object.keys(fields).forEach((key) => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (!uuidRegex.test(fields[key])) {
                throw new error(`El campo ${key} debe ser un UUID válido`)
            }
        })
    }

}

export default Validator