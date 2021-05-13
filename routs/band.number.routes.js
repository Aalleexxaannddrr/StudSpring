const { Router } = require('express')
const BandNumber = require('../models/BandNumber')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const band_number = await BandNumber.findById(req.params.id)
        res.json(band_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const band_number = await BandNumber.find()
        res.json(band_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name, band_id, nomination_id, rating } = req.body
        const band_number = new BandNumber({
          name, band_id, nomination_id, rating
        })

        await band_number.save()

        res.status(201).json({ band_number })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const band_number = await BandNumber.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(band_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const band_number = await BandNumber.findByIdAndUpdate(req.params.id, req.body.participants_id)
        res.status(200).json(band_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const band_number = await BandNumber.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(band_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router