<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404 - Page Not Found</h1>
      <p>We're sorry, but the page you are looking for could not be found.</p>
      <router-link to="/" class="btn btn-primary">Go to Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.not-found-content {
  text-align: center;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
