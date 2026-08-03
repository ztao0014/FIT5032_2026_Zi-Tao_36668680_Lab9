import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

// Cloud function endpoint: count books
app.get('/countBooks', (req, res) => {
  const authors = [
    { name: "Jane Austen", famousWorks: [{ title: "Pride and Prejudice" }, { title: "Sense and Sensibility" }] },
    { name: "George Orwell", famousWorks: [{ title: "1984" }, { title: "Animal Farm" }] },
    { name: "Agatha Christie", famousWorks: [{ title: "Murder on the Orient Express" }, { title: "Death on the Nile" }] }
  ]

  const totalBooks = authors.reduce((total, author) => total + author.famousWorks.length, 0)

  res.json({
    success: true,
    data: {
      authorsCount: authors.length,
      totalBooks: totalBooks,
      authors: authors.map(a => ({ name: a.name, bookCount: a.famousWorks.length }))
    },
    timestamp: new Date().toISOString()
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
