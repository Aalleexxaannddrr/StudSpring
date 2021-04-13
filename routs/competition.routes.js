const { Router } = require('express')
const Competition = require('../models/Competition')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id)
        res.json(competition)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const competitions = await Competition.find()
        res.json(competitions)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name, organizer_id, start, end, addres, age_category, contribution, game_type, cover_type, participants_id } = req.body
        const competition = new Competition({
            name, organizer_id, start, end, addres, age_category, contribution, game_type, cover_type, participants_id
        })

        await competition.save()

        res.status(201).json({ competition })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const competition = await Competition.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(competition)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('add_participant/:id', async (req, res) => {
    try {
        const competition = await Competition.findByIdAndUpdate(req.params.id, req.body.participants_id)
        res.status(200).json(competition)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const competition = await Competition.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(competition)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router