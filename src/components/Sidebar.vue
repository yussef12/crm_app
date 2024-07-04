<script>
export default {
  name: "Sidebar"
}
</script>

<template>
  <ul class="nav nav-pills flex-column text-dark">
    <li class="nav-item">
      <a href="#" class="nav-link active" aria-current="page">
        <svg class="bi me-2" width="16" height="16">
          <use xlink:href="#home"></use>
        </svg>
        Dashboard
      </a>
    </li>
    <li>
      <a href="#" class="nav-link">
        <svg class="bi me-2" width="16" height="16">
          <use xlink:href="#table"></use>
        </svg>
        Orders
      </a>
    </li>
    <li>
      <a href="#" class="nav-link">
        <svg class="bi me-2" width="16" height="16">
          <use xlink:href="#grid"></use>
        </svg>
        Products
      </a>
    </li>
    <li>
      <a href="#" class="nav-link">
        <svg class="bi me-2" width="16" height="16">
          <use xlink:href="#people-circle"></use>
        </svg>
        Customers
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>