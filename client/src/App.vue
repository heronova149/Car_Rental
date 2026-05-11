<script setup>
import { ref, onMounted } from 'vue'

const cars = ref([])
const error = ref(null)

// Function to fetch cars from our Express backend
const fetchCars = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/cars')
    if (!response.ok) throw new Error('Failed to connect to server')
    cars.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error(err)
  }
}

// Fetch automatically when the page loads
onMounted(() => {
  fetchCars()
})
</script>

<template>
  <div class="container">
    <h1>Car Rental Inventory</h1>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-else class="car-grid">
      <div v-for="car in cars" :key="car.car_id" class="car-card">
        <img :src="car.image_url" alt="Car Image" class="car-image" />
        <h3>{{ car.make }} {{ car.model }}</h3>
        <p>Year: {{ car.year }}</p>
        <p class="price">${{ car.price_per_day }}/day</p>
        <button>Rent Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.car-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.car-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1em;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

button:hover {
  background-color: #3aa876;
}

.error {
  color: red;
  text-align: center;
}
</style>
