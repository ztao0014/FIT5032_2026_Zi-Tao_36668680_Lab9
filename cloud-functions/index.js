const authors = [
  {
    "name": "Jane Austen",
    "birthYear": 1775,
    "famousWorks": [
      { "title": "Pride and Prejudice", "year": 1813 },
      { "title": "Sense and Sensibility", "year": 1811 }
    ]
  },
  {
    "name": "George Orwell",
    "birthYear": 1903,
    "famousWorks": [
      { "title": "1984", "year": 1949 },
      { "title": "Animal Farm", "year": 1945 }
    ]
  },
  {
    "name": "Agatha Christie",
    "birthYear": 1890,
    "famousWorks": [
      { "title": "Murder on the Orient Express", "year": 1934 },
      { "title": "Death on the Nile", "year": 1937 }
    ]
  }
]

exports.handler = (req, resp, context) => {
  resp.setHeader('Content-Type', 'application/json')
  resp.setHeader('Access-Control-Allow-Origin', '*')

  const totalBooks = authors.reduce((t, a) => t + a.famousWorks.length, 0)

  resp.send(JSON.stringify({
    count: totalBooks,
    success: true,
    data: {
      authorsCount: authors.length,
      totalBooks: totalBooks,
      authors: authors.map(a => ({
        name: a.name,
        bookCount: a.famousWorks.length,
        works: a.famousWorks.map(w => w.title)
      }))
    },
    timestamp: new Date().toISOString()
  }, null, 2))
}
