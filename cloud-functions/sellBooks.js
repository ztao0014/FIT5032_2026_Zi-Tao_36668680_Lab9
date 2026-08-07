'use strict';

exports.handler = (event, context, callback) => {
  const books = [
    { id: "1", title: "Pride and Prejudice", author: "Jane Austen", price: "$12.99" },
    { id: "2", title: "1984", author: "George Orwell", price: "$9.99" },
    { id: "3", title: "Animal Farm", author: "George Orwell", price: "$8.99" },
    { id: "4", title: "Sense and Sensibility", author: "Jane Austen", price: "$11.99" },
    { id: "5", title: "Murder on the Orient Express", author: "Agatha Christie", price: "$10.99" },
    { id: "6", title: "Death on the Nile", author: "Agatha Christie", price: "$10.99" }
  ]

  callback(null, {
    'statusCode': 200,
    'isBase64Encoded': false,
    'headers': {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    'body': JSON.stringify({
      success: true,
      message: "Books available for sale",
      data: {
        totalBooks: books.length,
        books: books
      }
    })
  })
}
