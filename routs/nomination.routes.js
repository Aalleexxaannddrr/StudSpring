const { Router } = require('express')
const Nomination = require('../models/Nomination')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const nomination = await Nomination.findById(req.params.id)
        res.json(nomination)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const nomination = await Nomination.find()
        res.json(nomination)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name } = req.body
        const nomination = new Nomination({
            name
        })

        await nomination.save()

        res.status(201).json({ nomination })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const nomination = await Nomination.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(nomination)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const nomination = await Nomination.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(nomination)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router