const { Router } = require('express')
const IndividualNumber = require('../models/IndividualNumber')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const individual_number = await IndividualNumber.findById(req.params.id)
        res.json(individual_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const individual_number = await IndividualNumber.find()
        res.json(individual_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name, participant_id, nomination_id, rating } = req.body
        console.log(req.body)
        const individual_number = new IndividualNumber({
          name, participant_id, nomination_id, rating
        })

        await individual_number.save()

        res.status(201).json({ individual_number })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const individual_number = await IndividualNumber.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(individual_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const individual_number = await IndividualNumber.findByIdAndUpdate(req.params.id, req.body.participants_id)
        res.status(200).json(individual_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const individual_number = await IndividualNumber.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(individual_number)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router