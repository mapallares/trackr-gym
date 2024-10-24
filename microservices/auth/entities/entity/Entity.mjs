import { UndefinedEntityAttributeError } from "../../errors/error/UndefinedEntityAttribute.error.mjs"

export class Entity {

    static table = {
        name: undefined,
        id: undefined
    }

    static columns = [{name: undefined, type: undefined}]

    static getTable() {
        if(!this.table.name || !this.table.id) throw new UndefinedEntityAttributeError('El nombre y el identidicador de la tabla de la entidad no han sido definidos')
        return this.table
    }

    static getTableName() {
        if(!this.table.name) throw new UndefinedEntityAttributeError('El nombre de la tabla de la entidad no ha sido definido')
        return this.table.name
    }

    static getTableId() {
        if(!this.table.id) throw new UndefinedEntityAttributeError('El identificador de la tabla de la entidad no ha sido definido')
        return this.table.id
    }

    static getColumns() {
        if(!this.columns[0].name || !this.columns[0].type) throw new UndefinedEntityAttributeError('Las columnas de la tabla de la entidad no han sido definidas')
        return this.columns
    }

    static getColumn(columnName) {
        return this.getColumns().find(column => column.name == columnName);
    }

    static getData(entity, object) {
        const data = {}
        entity.getColumns().forEach(column => {
          data[column.name] = object[column.name] || null  
        })
        return data
    }

}

export default Entity