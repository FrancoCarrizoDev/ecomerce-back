const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      productSubTypes: '/api/product-sub-types',
      categories: '/api/categories',
      productValueCategories: '/api/product-values-categories',
      productTypeCategories: '/api/product-type-categories',
      productTypeValuesCategories: '/api/product-type-value-categories',
      products: '/api/products',
      users: '/api/users',
      uploads: '/api/uploads'
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      })
    )
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.buscar, require('../routes/buscar'))
    this.app.use(this.paths.productSubTypes, require('../routes/productSubTypes'))
    this.app.use(this.paths.categories, require('../routes/categories'))
    this.app.use(this.paths.productValueCategories, require('../routes/productValueCategories'))
    this.app.use(this.paths.productTypeCategories, require('../routes/productTypeCategories'))
    this.app.use(
      this.paths.productTypeValuesCategories,
      require('../routes/productTypeValueCategories')
    )
    this.app.use(this.paths.products, require('../routes/products'))
    this.app.use(this.paths.users, require('../routes/users'))
    this.app.use(this.paths.uploads, require('../routes/uploads'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
