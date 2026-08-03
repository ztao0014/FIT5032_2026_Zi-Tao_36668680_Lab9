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
  const totalBooks = authors.reduce((t, a) => t + a.famousWorks.length, 0)

  const result = JSON.stringify({
    count: totalBooks,
    success: true,
    data: {
      authorsCount: authors.length,
      totalBooks: totalBooks
    },
    timestamp: new Date().toISOString()
  })

  resp.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  resp.end(result)
}
