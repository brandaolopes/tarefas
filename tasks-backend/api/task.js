/* eslint-disable semi */
/* eslint-disable prettier/prettier */
const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where( 'estimateAt', '<=', date )
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(erro => res.status(500).json(erro))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(erro => res.status(400).json(erro))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada Tarefa com o id=${req.params.id}`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json(erro))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(erro => res.status(400).json(erro))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com o id= ${ req.params.id } não encontrada.`
                    return res.status(400).send(msg)
                }
                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(erro => res.status(400).json(erro))
    }

    return { getTasks, save, toggleTask, remove }
}
