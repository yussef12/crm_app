<template>
  <ul class="nav nav-pills flex-column text-dark">
    <li class="nav-item">
      <router-link active-class="active" class="nav-link " :to="{name:'dashboard'}">
        <svg class="bi me-2" width="16" height="16">
          <use xlink:href="#home"></use>
        </svg>
        Dashboard
      </router-link>
    </li>
    <ACL role="superadmin">
      <li class="nav-item">
        <router-link active-class="active" class="nav-link " :to="{name:'admin.companies'}">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          Companies
        </router-link>
      </li>

    </ACL>
    <ACL role="superadmin">
      <li class="nav-item">
        <router-link active-class="active" class="nav-link " :to="{name:'admin.superadmins'}">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          super admins
        </router-link>
      </li>
    </ACL>
    <ACL role="superadmin">
      <li class="nav-item">
        <router-link active-class="active" class="nav-link " :to="{name:'admin.employees'}">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          employees
        </router-link>
      </li>

    </ACL>
    <ACL role="superadmin">
      <li class="nav-item">
        <router-link active-class="active" class="nav-link " :to="{name:'admin.invitations'}">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          invitations
        </router-link>
      </li>

    </ACL>
    <ACL role="administrator">
      <li class="nav-item">
        <router-link active-class="active" class="nav-link " :to="{name:'logs'}">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          logs
        </router-link>
      </li>

    </ACL>
  </ul>
</template>
<script>
import ACL from "@/components/ACL.vue"

export default {
  name: "Sidebar",
  components: {
    ACL
  },
}
</script>
<style scoped>

</style>