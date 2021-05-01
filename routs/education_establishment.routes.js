const { Router } = require('express')
const EducationalEstablishment = require('../models/EducationalEstablishment')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const education_establishment = await EducationalEstablishment.findById(req.params.id)
        res.json(education_establishment)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const education_establishment = await EducationalEstablishment.find()
        res.json(education_establishment)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const { name } = req.body
        const name = new EducationalEstablishment({
            name
        })

        await education_establishment.save()

        res.status(201).json({ education_establishment })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const education_establishment = await EducationalEstablishment.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(education_establishment)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const education_establishment = await EducationalEstablishment.findByIdAndRemove(req.params.id, req.body)
        res.status(200).json(education_establishment)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router