const fs = require('node:fs')
const path = require('node:path')

async function writeFile (filePath, data, callback) {
  if (!fs.existsSync(filePath) && filePath.includes(path.sep)) {
    const fullPath = filePath.split(path.sep)
    fullPath.pop()
    const folders = path.join(...fullPath)

    fs.mkdir(folders, { recursive: true }, err => {
      if (err) throw err
      fs.writeFile(filePath, data, { encoding: 'utf-8', flag: 'w' }, callback)
    })
  } else {
    fs.writeFile(filePath, data, { encoding: 'utf-8', flag: 'w' }, callback)
  }
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  const file = process.argv[2]

  if (!word) {
    return callback(new Error('No se ha especificado la palabra a buscar'))
  }

  if (!file) {
    return callback(new Error('No se ha especificado el path del archivo'))
  }

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      return callback(null, 0)
    }
    const count = data.split(' ').filter(w => w.includes(word)).length
    callback(null, count)
  })
}

module.exports = {
  writeFile,
  readFileAndCount
}
