/**
 * Cloud Function: Sell Firestore Data
 * This function demonstrates querying Firestore and returning data
 * Deploy to Alibaba Cloud Function Compute (HTTP trigger)
 *
 * Note: In production, you would use firebase-admin SDK
 * This example simulates the data for demonstration
 */

const admin = require('firebase-admin')

// Initialize Firebase Admin
// Replace with your service account credentials
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

exports.handler = async (event, context, callback) => {
  try {
    const booksRef = db.collection('books')
    const snapshot = await booksRef.where('isbn', '>', 1000)
      .orderBy('isbn', 'asc')
      .limit(10)
      .get()

    const books = []
    snapshot.forEach(doc => {
      books.push({
        id: doc.id,
        ...doc.data()
      })
    })

    const result = {
      success: true,
      data: {
        totalBooks: books.length,
        books: books
      },
      message: 'Books available for purchase',
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
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    })
  }
}
