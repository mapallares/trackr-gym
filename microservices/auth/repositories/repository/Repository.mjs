import Entity from '../../entities/entity/Entity.mjs'
import Database from '../../databases/postgres.database.mjs'

export class Repository {

  static async query(query) {
    return await Database.query(query)
  }

  static async save(query) {
    return await Database.insert(query)
  }

  static async find(query) {
    return await Database.select(query)
  }

  static async update(query) {
    return await Database.update(query)
  }
  
  static async delete(query) {
    return await Database.delete(query)
  }

  static async saveAll(entity, data) {
    const name = entity.getTableName()
    const keys = Object.keys(data).map(key => `"${key}"`).join(', ')
    const values = Object.values(data)
    const placeholders = values.map((_, i) => `'${_}'`).join(', ')
    const query = `INSERT INTO "${name}" 
    (${keys}) 
    VALUES (${placeholders}) 
    RETURNING *`

    try {
      const result = await Database.select(query)
      return result[0] || null
    } catch (error) {
      console.error(`Error al guardar el registro en ${name}`, error)
      throw error
    }
  }

  static async findAll(entity) {
    const name = entity.getTableName()
    const query = `SELECT * 
    FROM "${name}"`

    try {
      const result = await Database.select(query)
      return result || []
    } catch (error) {
      console.error(`Error al obtener todos los registros de ${name}`, error)
      throw error
    }
  }

  static async findById(entity, identifier) {
    const { name, id } = entity.getTable()
    const query = `SELECT * 
    FROM "${name}" 
    WHERE "${id}" = '${identifier}'`

    try {
      const result = await Database.select(query)
      return result[0] || null
    } catch (error) {
      console.error(`Error al obtener el registro con ${id} = "${identifier}" de ${name}`, error)
      throw error
    }
  }

  static async findByColumn(entity, value) {
    const column = entity.getColumn(Object.keys(value)[0])
    value = Object.values(value)[0]
    const tableName = entity.getTableName()
    const query = `SELECT * 
    FROM "${tableName}" 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : value}`
    
    try {
      const result = await Database.select(query)
      return result[0] || null
    } catch (error) {
      console.error(`Error al obtener el registro con ${column.name} = "${value}" de ${tableName}`, error)
      throw error
    }
  }

  static async findAllByColumn(entity, value) {
    const column = entity.getColumn(Object.keys(value)[0])
    value = Object.values(value)[0]
    const tableName = entity.getTableName()
    const query = `SELECT * 
    FROM "${tableName}" 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : value}`
    
    try {
      const result = await Database.select(query)
      return result || []
    } catch (error) {
      console.error(`Error al obtener el registro con ${column.name} = "${value}" de ${tableName}`, error)
      throw error
    }
  }

  static async updateById(entity, identifier, data) {
    const { name, id } = entity.getTable()
    const column = entity.getColumn(id)
    const value = identifier
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key, i) => `"${key}" = ${['string', 'date'].includes(entity.getColumn(key).type) ? `'${values[i]}'` : `${values[i]}`}`).join(', ')
    const query = `UPDATE "${name}" 
    SET ${setClause} 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : `${value}`}
    RETURNING *`

    try {
      const result = await Database.query(query)
      console.log(result)
      return result.rows[0] || null
    } catch (error) {
      console.error(`Error al actualizar el registro con ${column.name} = "${value}" en ${name}`, error)
      throw error
    }
  }

  static async updateByColumn(entity, value, data) {
    const column = entity.getColumn(Object.keys(value)[0])
    value = Object.values(value)[0]
    const { name, id } = entity.getTable()
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key, i) => `"${key}" = ${['string', 'date'].includes(entity.getColumn(key).type) ? `'${values[i]}'` : `${values[i]}`}`).join(', ')
    const query = `UPDATE "${name}" 
    SET ${setClause} 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : `${value}`}
    RETURNING *`

    try {
      const result = await Database.query(query)
      console.log(result)
      return result.rows[0] || null
    } catch (error) {
      console.error(`Error al actualizar el registro con ${column.name} = "${value}" en ${name}`, error)
      throw error
    }
  }

  static async deleteById(entity, identifier) {
    const { name, id } = entity.getTable()
    const column = entity.getColumn(id)
    const value = identifier
    const query = `DELETE FROM "${name}"
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : value}
    RETURNING *`

    try {
      const result = await Database.select(query, [identifier])
      return result.rows[0] || null
    } catch (error) {
      console.error(`Error al eliminar el registro con ${id} = "${identifier}" de ${name}`, error)
      throw error
    }
  }

}

export default Repository