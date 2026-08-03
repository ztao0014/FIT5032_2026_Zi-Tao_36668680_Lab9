<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">Cloud Function: Count Books</h1>
        <div class="text-center mb-3">
          <button @click="callCloudFunction" class="btn btn-primary">Call Cloud Function</button>
        </div>

        <div v-if="loading" class="text-center">
          <p>Loading...</p>
        </div>

        <div v-if="result" class="api-response">
          <pre>{{ JSON.stringify(result, null, 2) }}</pre>
        </div>

        <div v-if="error" class="text-danger text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const result = ref(null)
const loading = ref(false)
const error = ref(null)

const CLOUD_FUNCTION_URL = 'https://your-function-id.fc.aliyuncs.com/2016-08-15/proxy/your-service/countBooks/'

const callCloudFunction = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(CLOUD_FUNCTION_URL)
    const data = await response.json()
    result.value = data
  } catch (err) {
    error.value = 'Error calling cloud function: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.api-response {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-size: 14px;
}
</style>
