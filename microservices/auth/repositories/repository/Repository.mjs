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
    const columns = Object.keys(data).map(key => `"${key}"`).join(', ')
    const values = Object.values(data).map((_, i) => ['string', 'date'].includes(entity.getColumn(Object.keys(data)[i]).type) ? `'${_}'` : _).join(', ')
    const query = `INSERT INTO "${entity.getTableName()}" 
    (${columns}) 
    VALUES (${values}) 
    RETURNING *`
    try {
      const result = await Database.select(query)
      return result[0] ? new entity(result[0]) : null
    } catch (error) {
      console.error(`Error al guardar el registro en ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async findAll(entity) {
    const query = `SELECT * 
    FROM "${entity.getTableName()}"`
    try {
      const result = await Database.select(query)
      return result.map(object => new entity(object)) || []
    } catch (error) {
      console.error(`Error al obtener todos los registros de ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async findById(entity, identifier) {
    const id = entity.getColumn(entity.getTableId())
    const query = `SELECT * 
    FROM "${entity.getTableName()}" 
    WHERE "${entity.getTableId()}" = ${['string', 'date'].includes(id.type) ? `'${identifier}'` : `${identifier}`}`
    try {
      const result = await Database.select(query)
      return result[0] ? new entity(result[0]) : null
    } catch (error) {
      console.error(`Error al obtener el registro con ${entity.getTableId()} = "${identifier}" de ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async findByColumn(entity, columnObject) {
    const column = entity.getColumn(Object.keys(columnObject)[0])
    const value = Object.values(columnObject)[0]
    const query = `SELECT * 
    FROM "${entity.getTableName()}" 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : value}`
    try {
      const result = await Database.select(query)
      return result[0] ? new entity(result[0]) : null
    } catch (error) {
      console.error(`Error al obtener el registro con ${column.name} = "${value}" de ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async findAllByColumn(entity, columnObject) {
    const column = entity.getColumn(Object.keys(columnObject)[0])
    const value = Object.values(columnObject)[0]
    const query = `SELECT * 
    FROM "${entity.getTableName()}" 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : value}`
    try {
      const result = await Database.select(query)
      return result.map(object => new entity(object)) || []
    } catch (error) {
      console.error(`Error al obtener el registro con ${column.name} = "${value}" de ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async updateById(entity, identifier, data) {
    const id = entity.getColumn(entity.getTableId())
    const keys = Object.keys(data)
    const values = Object.values(data)
    const columns = keys.map((key, i) => `"${key}" = ${['string', 'date'].includes(entity.getColumn(key).type) ? `'${values[i]}'` : `${values[i]}`}`).join(', ')
    const query = `UPDATE "${entity.getTableName()}" 
    SET ${columns} 
    WHERE "${id.name}" = ${['string', 'date'].includes(id.type) ? `'${identifier}'` : `${identifier}`}
    RETURNING *`
    try {
      const result = await Database.query(query)
      console.log(result)
      return result.rows[0] ? new entity(result.rows[0]) : null
    } catch (error) {
      console.error(`Error al actualizar el registro con ${id.name} = "${identifier}" en ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async updateByColumn(entity, columnObject, data) {
    const column = entity.getColumn(Object.keys(columnObject)[0])
    const value = Object.values(columnObject)[0]
    const keys = Object.keys(data)
    const values = Object.values(data)
    const columns = keys.map((key, i) => `"${key}" = ${['string', 'date'].includes(entity.getColumn(key).type) ? `'${values[i]}'` : `${values[i]}`}`).join(', ')
    const query = `UPDATE "${entity.getTableName()}" 
    SET ${columns} 
    WHERE "${column.name}" = ${['string', 'date'].includes(column.type) ? `'${value}'` : `${value}`}
    RETURNING *`
    try {
      const result = await Database.query(query)
      console.log(result)
      return result.rows[0] ? new entity(result.rows[0]) : null
    } catch (error) {
      console.error(`Error al actualizar el registro con ${column.name} = "${value}" en ${entity.getTableName()}`, error)
      throw error
    }
  }

  static async deleteById(entity, identifier) {
    const id = entity.getColumn(entity.getTableId())
    const query = `DELETE FROM "${entity.getTableName()}"
    WHERE "${id.name}" = ${['string', 'date'].includes(id.type) ? `'${identifier}'` : identifier}
    RETURNING *`
    try {
      const result = await Database.select(query, [identifier])
      return result.rows[0] || null
    } catch (error) {
      console.error(`Error al eliminar el registro con ${id.name} = "${identifier}" de ${entity.getTableName()}`, error)
      throw error
    }
  }

}

export default Repository