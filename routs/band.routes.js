const { Router } = require('express')
const Band = require('../models/Band')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const band = await Band.findById(req.params.id)
        res.json(band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const band = await Band.find()
        res.json(band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name, educarional_establishment_id } = req.body
        const band = new Band({
            name, educarional_establishment_id
        })

        await band.save()

        res.status(201).json({ band })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const band = await Band.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const band = await Band.findByIdAndUpdate(req.params.id, req.body.participants_id)
        res.status(200).json(band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const band = await Band.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router