const { Router } = require('express')
const IndividualResult = require('../models/IndividualResult')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const individual_result = await IndividualResult.findById(req.params.id)
        res.json(individual_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const individual_result = await IndividualResult.find()
        res.json(individual_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { individual_number_id } = req.body
        const individual_result = new IndividualResult({
          individual_number_id
        })

        await individual_result.save()

        res.status(201).json({ individual_result })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const individual_result = await IndividualResult.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(individual_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const individual_result = await IndividualResult.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(individual_result)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router