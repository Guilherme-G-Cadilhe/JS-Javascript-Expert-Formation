const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf8')
    console.log('filePath', filePath)
    const validation = this.isValid(content.trim())
    if (!validation.valid) throw new Error(validation.error)
    return this.parseCSVToJSON(content.trim())
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    // Para ver o conteúdo do arquivo
    // fs.readFileSync('../mocks/threeItems-valid.csv', 'utf8')

    // [0] = Headers
    // [x] = Linha X
    const [headers, ...lines] = csvString.split(/\r?\n/)
    const isHeaderValid = headers.replaceAll(' ', '') === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }
    if (!lines.length || lines.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return {
      valid: true
    }
  }

  static parseCSVToJSON(csvString) {
    const [headers, ...lines] = csvString.split(/\r?\n/)
    const headerArray = headers.replaceAll(' ', '').split(',')
    const users = lines.map(line => {
      const columns = line.replaceAll(' ', '').split(',')
      const user = {}
      for (const index in columns) {
        user[headerArray[index]] = columns[index].trim()
      }
      return user
    })
    return users
  }
}

module.exports = File