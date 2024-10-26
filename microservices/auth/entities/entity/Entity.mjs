import { UndefinedEntityAttributeError } from "../../errors/error/UndefinedEntityAttribute.error.mjs"

export class Entity {

    static table = {
        name: undefined,
        id: undefined
    }

    static columns = [
        {
            name: undefined, 
            type: undefined
        }
    ]

    static relations = {
        toMany: [],
        toOne: []
    }

    constructor(entity, object) {
        if(!Entity.isPrototypeOf(entity)) throw new Error('No se ha inyectado una entidad válida para instanciar Entity')
        if(!(object instanceof Object)) throw new Error('No se ha recibido un objeto válido para instanciar Entity')
        entity.getColumns().forEach(column => {
            this[column.name] = object[column.name] || null
        })
    }

    get(entity, columns = [], including = true) {
        const data = {}
        if(typeof including != 'boolean') throw new Error('excluding debe ser un valor booleano en get de Entity')
        if(columns != null && !(columns instanceof Array)) throw new Error(`El formato de columnas a ${including ? 'incluir' : 'excluir'} no es correcto en get de Entity`)
        entity.getColumns().forEach(column => {
            if(columns.length > 0) {
                if(columns.includes(column.name) == including) {
                    data[column.name] = this[column.name]
                }
            }
            else {
                data[column.name] = this[column.name]
            }
        })
        return data
    }

    static getTable() {
        if(!this.table.name || !this.table.id) throw new UndefinedEntityAttributeError('El nombre y el identidicador de la tabla de la entidad no han sido definidos')
        return this.table
    }

    static getTableName() {
        if(!this.table.name) throw new UndefinedEntityAttributeError('El nombre de la tabla de la entidad no ha sido definido')
        return this.table.name
    }

    static getTableId() {
        if(!this.table.id) throw new UndefinedEntityAttributeError(`El identificador de la tabla ${this.getTableName()} de la entidad no ha sido definido`)
        return this.table.id
    }

    static getColumns() {
        if(!this.columns[0].name || !this.columns[0].type) throw new UndefinedEntityAttributeError(`Las columnas de la tabla ${this.getTableName()} de la entidad no han sido definidas`)
        return this.columns
    }

    static getColumn(columnName) {
        const column = this.getColumns().find(column => column.name == columnName)
        if(!column) throw new UndefinedEntityAttributeError(`${columnName} no es una columna de la tabla ${this.getTableName() || ""}`)
        return column
    }

    static getRelations(type = 'all') {
        switch(type) {
            case 'all':
                return this.relations
            case 'toMany':
                return this.relations.toMany || []
            case 'toOne':
                return this.relations.toOne || []
            default:
                throw new Error('No se ha especificado el tipo de relación')
        }
    }

    static mapper(object, excepting = []) {
        if(!(object instanceof Object)) throw new Error('No se ha recibido un objeto válido para mappear en mapper de Entity')
        if(excepting != null && !(excepting instanceof Array)) throw new Error('El formato de atributos a exceptuar no es correcto en mapper de Entity')
        excepting.map(columnName => this.getColumn(columnName).name)
        const data = {}
        this.getColumns().forEach(column => {
            if(!excepting.includes(column.name)) {
                data[column.name] = object[column.name] || null  
            }
        })
        return data
    }

}

export default Entity