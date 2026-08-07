'use strict';

exports.handler = (event, context, callback) => {
  const authors = [
    { "name": "Jane Austen", "famousWorks": [
        { "title": "Pride and Prejudice", "year": 1813 },
        { "title": "Sense and Sensibility", "year": 1811 }] },
    { "name": "George Orwell", "famousWorks": [
        { "title": "1984", "year": 1949 },
        { "title": "Animal Farm", "year": 1945 }] },
    { "name": "Agatha Christie", "famousWorks": [
        { "title": "Murder on the Orient Express", "year": 1934 },
        { "title": "Death on the Nile", "year": 1937 }] }
  ]

  const totalBooks = authors.reduce((t, a) => t + a.famousWorks.length, 0)

  callback(null, {
    'statusCode': 200,
    'isBase64Encoded': false,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'body': JSON.stringify({
      count: totalBooks,
      success: true,
      data: {
        authorsCount: authors.length,
        totalBooks: totalBooks
      }
    })
  })
}
