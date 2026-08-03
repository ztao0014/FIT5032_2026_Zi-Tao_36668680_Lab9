/**
 * Cloud Function: Count Books
 * Deploy to Alibaba Cloud Function Compute (HTTP trigger)
 * Platform: Alibaba Cloud / Huawei Cloud
 */

const authors = [
  {
    id: 1,
    name: "Jane Austen",
    birthYear: 1775,
    genres: ["Romance", "Social commentary"],
    famousWorks: [
      { title: "Pride and Prejudice", year: 1813 },
      { title: "Sense and Sensibility", year: 1811 }
    ]
  },
  {
    id: 2,
    name: "George Orwell",
    birthYear: 1903,
    genres: ["Dystopian", "Political satire"],
    famousWorks: [
      { title: "1984", year: 1949 },
      { title: "Animal Farm", year: 1945 }
    ]
  },
  {
    id: 3,
    name: "Agatha Christie",
    birthYear: 1890,
    genres: ["Mystery", "Crime fiction"],
    famousWorks: [
      { title: "Murder on the Orient Express", year: 1934 },
      { title: "Death on the Nile", year: 1937 }
    ]
  }
]

exports.handler = (event, context, callback) => {
  const totalBooks = authors.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)

  const result = {
    success: true,
    data: {
      authorsCount: authors.length,
      totalBooks: totalBooks,
      authors: authors.map(author => ({
        name: author.name,
        bookCount: author.famousWorks.length,
        works: author.famousWorks.map(w => w.title)
      }))
    },
    timestamp: new Date().toISOString()
  }

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result)
  })
}
