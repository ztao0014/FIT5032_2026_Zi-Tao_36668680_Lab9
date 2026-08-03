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
    count: totalBooks,
    success: true,
    data: {
      authorsCount: authors.length,
      totalBooks: totalBooks,
      authors: authors.map(a => ({ name: a.name, bookCount: a.famousWorks.length }))
    },
    timestamp: new Date().toISOString()
  })
})

// Task 9.2: Cloud function to sell Firestore data
app.get('/sellBooks', async (req, res) => {
  try {
    // In production, this would query real Firestore using firebase-admin
    // For now, return sample data from Firestore-like records
    const books = [
      { id: "1", title: "Pride and Prejudice", author: "Jane Austen", price: "$12.99" },
      { id: "2", title: "1984", author: "George Orwell", price: "$9.99" },
      { id: "3", title: "Animal Farm", author: "George Orwell", price: "$8.99" },
      { id: "4", title: "Sense and Sensibility", author: "Jane Austen", price: "$11.99" },
      { id: "5", title: "Murder on the Orient Express", author: "Agatha Christie", price: "$10.99" },
      { id: "6", title: "Death on the Nile", author: "Agatha Christie", price: "$10.99" }
    ]

    res.json({
      success: true,
      message: "Books available for sale",
      data: {
        totalBooks: books.length,
        books: books
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
