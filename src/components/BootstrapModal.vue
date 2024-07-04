<!-- src/components/BootstrapModal.vue -->
<template>
  <div class="modal fade" ref="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'BootstrapModal',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    showModal() {
      this.modalInstance = new Modal(this.$refs.modal);
      this.modalInstance.show();
    },
    hideModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
  }
};
</script>

<style scoped>
.modal-dialog {
  max-width: 500px;
}
</style>
