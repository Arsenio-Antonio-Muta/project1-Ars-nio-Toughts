const express = require('express')
const exphbs = require('express-handlebars').engine()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import controller
const ToughtController = require('./controllers/ToughtController')

//Template Engine
app.engine('handlebars', exphbs)
app.set('view engine', 'handlebars')

//Receber resposta do body
app.use(
  express.urlencoded({
    extended: true
  })
)

// session middleware
                                                      app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave:false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  }),
) 

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))
app.use(express.json())

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

conn
//.sync({ force: true })
.sync()
.then(() => {
  app.listen(3015)
})
.catch((err) => console.log(err))