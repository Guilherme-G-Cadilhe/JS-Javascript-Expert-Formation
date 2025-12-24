const { error } = require('./src/constants');
const File = require('./src/file')
const assert = require('assert')

  // IFEE (função que se auto-executa)
  // Criamos para poder usar Async-Await internamente
  ; (async () => {
    // Variáveis criadas nesse bloco, só são validas durante sua execução
    {
      const filePath = './mocks/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    {
      const filePath = './mocks/header-invalid.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    {
      const filePath = './mocks/fiveItems-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    {
      const filePath = './mocks/threeItems-valid.csv'
      const expected = [{
        id: '1',
        name: 'silveira',
        profession: 'developer',
        age: '67'
      },
      {
        id: '2',
        name: 'leo',
        profession: 'baixista',
        age: '23'
      },
      {
        id: '3',
        name: 'jonas',
        profession: 'designer',
        age: '35'
      }
      ]
      const result = await File.csvToJSON(filePath)
      assert.deepEqual(result, expected)
    }

  })()