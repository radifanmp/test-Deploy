const models = require('../models')
const Todo = models.todo
const User = models.user


exports.index = (req, res) => {
    Todo.findAll({
        include: [{
            model: User,
            as: "createdBy"
        }]
    })
    .then(todos => res.send(todos))
    // .catch(err => res.send(err))
}


exports.show = (req,res) => {
    Todo.findOne({id: req.params.id})
    .then(todo => res.send(todo))
    .catch(err => res.send(err))
}


exports.store = (req,res) => {
    Todo.create(req.body)
        .then(todo => {res.send({
        message: "Success",
        todo
        })
    }).catch(err => res.send(err))
}


exports.update = (req, res) => {
    Todo.update(
        req.body,
        {where: {id: req.params.id}}
    )
        .then(todo => {res.send({
        message: "Success",
        todo
        })
    })
    .catch(err => res.send(err))
}


exports.delete = (req, res) => {
    Todo.destroy({where: {id: req.params.id}})
        .then(todo => { res.send ({
            message: "Success",
            todo
        })
        .catch(err => res.send(err))
    })
}