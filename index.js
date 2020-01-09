require('express-group-routes')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5000


const AuthController = require('./controllers/auth')
const TodoController = require('./controllers/Todos')

const {authenticated} = require('./middleware')

app.use(bodyParser.json())

app.group('/api/v1', (router) => {
    //Auth
    router.post('/login', AuthController.login)

    //Todo
    router.get('/todos', authenticated, TodoController.index)
    router.post('/todo', authenticated, TodoController.store)
    router.get('/todo/:id', authenticated, TodoController.show)
    router.patch('/todo/:id', authenticated, TodoController.update)
    router.delete('/todo/:id', authenticated, TodoController.delete)
})

app.get('/', (req, res) => {
    res.send('Rest Api Punya Radif Ganteng')
})

app.listen(port, () => console.log(`Listening on port ${port} !`))