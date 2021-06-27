const { Router } = require('express')
const ParticipantOfTheBand = require('../models/ParticipantOfTheBand')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const participant_of_the_band = await ParticipantOfTheBand.findById(req.params.id)
        res.json(participant_of_the_band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const participant_of_the_band = await ParticipantOfTheBand.find()
        res.json(participant_of_the_band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, birthday, phone_number, email, band_id } = req.body
        const participant_of_the_band = new ParticipantOfTheBand({
            name, birthday, phone_number, email, band_id
        })

        await participant_of_the_band.save()

        res.status(201).json({ participant_of_the_band })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const participant_of_the_band = await ParticipantOfTheBand.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(participant_of_the_band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const participant_of_the_band = await ParticipantOfTheBand.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(participant_of_the_band)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router