// console.log('hello')
const express = require('express')
const cors = require('cors')
const sequelize = require('./dbConnect')
const { Link } = require('./models')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


app.get('/', async (req, res) => {
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }
    // console.log(Link === sequelize.models.Link)
    await sequelize.sync()

    res.send('welcome')
})

app.get('/short-links', async (req, res) => {
    let links
    if (req.query.size && req.query.page) {
        const size = Number.parseInt(req.query.size)
        const page = Number.parseInt(req.query.page)
        links = await Link.findAll({ offset: size * (page - 1), limit: size })
        res.status(200).json({ data: links })
    }
    links = await Link.findAll()
    res.status(200).json({ data: links })
})

app.get('/short-links/:shortId', async (req, res) => {
    const links = await Link.findAll({
        where: {
            shortId: req.params.shortId
        }
    })
    res.status(200).json({ data: links[0] })
})

app.get('/r/:shortId', async (req, res) => {
    const links = await Link.findAll({
        where: {
            shortId: req.params.shortId
        }
    })
    res.status(302).redirect(links[0].url)
})

app.get('/a/:aliasName', async (req, res) => {
    const links = await Link.findAll({
        where: {
            aliasName: req.params.aliasName
        }
    })
    res.status(302).redirect(links[0].url)
})

app.post('/short-links', async (req, res) => {
    let shortId = ''
    while (shortId.length < 5) {
        const numOrChar = Math.floor(Math.random() * 2)
        if (numOrChar === 0) {
            const randomNum = Math.floor(Math.random() * 10).toString()
            shortId += randomNum
        } else {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97 + 1))
            shortId += randomChar
        }
    }
    const newLink = await Link.create({
        shortId,
        url: req.body.url
    })
    await newLink.save()
    res.status(201).json({ data: newLink })
})

app.patch('/short-links/:shortId', async (req, res) => {
    await Link.update({ aliasName: req.body.aliasName }, {
        where: {
            shortId: req.params.shortId
        }       
    })
    res.status(200).json({ msg: 'Alias name added' })
})

app.delete('/short-links/:shortId', async (req, res) => {
    await Link.destroy({
        where: {
            shortId: req.params.shortId
        }
    })
    res.status(200).json({ msg: 'Link deleted' })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))