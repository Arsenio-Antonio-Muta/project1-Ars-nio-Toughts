const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts7', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectamos com sucesso ao sequelize')
} catch(err) {
  console.log(`Falha ao conectarmos ao banco de dados ${err}`)
}

module.exports = sequelize