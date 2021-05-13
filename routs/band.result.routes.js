const { Router } = require('express')
const BandResult = require('../models/BandResult')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const band_result = await BandResult.findById(req.params.id)
        res.json(band_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const band_result = await BandResult.find()
        res.json(band_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { band_number_id } = req.body
        const band_result = new BandResult({
          band_number_id
        })

        await band_result.save()

        res.status(201).json({ band_result })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const band_result = await BandResult.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(band_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const band_result = await BandResult.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(band_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router