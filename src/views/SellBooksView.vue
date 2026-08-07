<template>
  <div id="app">
    <h1>Sell Books</h1>
    <button @click="getSellBooks">Get Books for Sale</button>
    <div v-if="books.length" class="mt-3">
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.title }} - {{ book.author }} - {{ book.price }}
        </li>
      </ul>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      error: null,
    }
  },
  methods: {
    async getSellBooks() {
      try {
        const response = await axios.get(
          'https://sellbooks-fodaefexsy.cn-hangzhou.fcapp.run/sellBooks'
        )
        this.books = response.data.data.books
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = error
        this.books = []
      }
    },
  },
}
</script>
