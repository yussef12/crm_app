<script>
export default {
  name: "Sidebar"
}
</script>

<template>
  <ul class="nav nav-pills flex-column text-dark">
    <li  class="nav-item">
      <router-link active-class="active" class="nav-link " :to="{name:'dashboard'}">  <svg class="bi me-2" width="16" height="16">
        <use xlink:href="#home"></use>
      </svg>
        Dashboard</router-link>
    </li>
    <li  class="nav-item">
     <router-link active-class="active" class="nav-link " :to="{name:'admin.companies'}">  <svg class="bi me-2" width="16" height="16">
       <use xlink:href="#home"></use>
     </svg>
       Companies</router-link>
    </li>
    <li  class="nav-item">
      <router-link active-class="active" class="nav-link " :to="{name:'admin.superadmins'}">  <svg class="bi me-2" width="16" height="16">
        <use xlink:href="#home"></use>
      </svg>
        super admins</router-link>
    </li>
    <li  class="nav-item">
      <router-link active-class="active" class="nav-link " :to="{name:'admin.employees'}">  <svg class="bi me-2" width="16" height="16">
        <use xlink:href="#home"></use>
      </svg>
        employees</router-link>
    </li>
    <li  class="nav-item">
      <router-link active-class="active" class="nav-link " :to="{name:'admin.invitations'}">  <svg class="bi me-2" width="16" height="16">
        <use xlink:href="#home"></use>
      </svg>
        invitations</router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>