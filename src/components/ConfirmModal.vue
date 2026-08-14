<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="onCancel"></div>

        <!-- Modal -->
        <div class="relative w-full max-w-sm pastel-card" style="background-color: var(--bg-card);">
          <!-- Icon -->
          <div class="flex justify-center pt-6 pb-2">
            <div class="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 pb-2 text-center">
            <h3 class="text-lg font-bold mb-1" style="color: var(--text-primary);">Delete Task?</h3>
            <p class="text-sm" style="color: var(--text-secondary);">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3 p-6 pt-4">
            <button
              @click="onCancel"
              class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition"
              style="background-color: var(--bg-input); color: var(--text-secondary);"
            >
              Cancel
            </button>
            <button
              @click="onConfirm"
              class="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white transition shadow-md shadow-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['confirm', 'cancel'])

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-from .pastel-card, .modal-leave-to .pastel-card {
  transform: scale(0.9);
  opacity: 0;
}
.modal-enter-active .pastel-card, .modal-leave-active .pastel-card {
  transition: all 0.25s ease;
}
</style>
