<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close"></div>

        <!-- Modal -->
        <div class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto pastel-card" style="background-color: var(--bg-card);">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 pb-4" style="border-bottom: 1px solid var(--border-color);">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path v-if="!isEditing" stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-bold" style="color: var(--text-primary);">{{ isEditing ? 'Edit Task' : 'Add New Task' }}</h2>
                <p class="text-xs" style="color: var(--text-muted);">{{ isEditing ? 'Update task details' : 'Create a new academic task' }}</p>
              </div>
            </div>
            <button @click="close" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition" style="color: var(--text-muted);">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Title -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Task Title <span class="text-red-400">*</span></label>
                <input v-model="form.title" type="text" placeholder="e.g., Submit Research Paper" class="w-full px-4 py-2.5 text-sm pastel-input" />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Subject <span class="text-red-400">*</span></label>
                <input v-model="form.subject" type="text" placeholder="e.g., Software Engineering 1" class="w-full px-4 py-2.5 text-sm pastel-input" />
              </div>

              <!-- Due Date -->
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Due Date <span class="text-red-400">*</span></label>
                <input v-model="form.dueDate" type="date" class="w-full px-4 py-2.5 text-sm pastel-input [color-scheme:light] dark:[color-scheme:dark]" />
              </div>

              <!-- Priority -->
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Priority <span class="text-red-400">*</span></label>
                <select v-model="form.priority" class="w-full px-4 py-2.5 text-sm pastel-input appearance-none cursor-pointer" style="background-image: url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%239B8FD4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e'); background-position: right 12px center; background-repeat: no-repeat; background-size: 20px;">
                  <option value="">Select priority</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Status <span class="text-red-400">*</span></label>
                <select v-model="form.status" class="w-full px-4 py-2.5 text-sm pastel-input appearance-none cursor-pointer" style="background-image: url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%239B8FD4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e'); background-position: right 12px center; background-repeat: no-repeat; background-size: 20px;">
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <!-- Description -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Description</label>
                <textarea v-model="form.description" rows="3" placeholder="Add details about the task..." class="w-full px-4 py-2.5 text-sm pastel-input resize-none"></textarea>
              </div>
            </div>

            <!-- Error -->
            <div v-if="errorMessage" class="px-4 py-3 rounded-xl text-sm flex items-center gap-2" style="background-color: #FDE8D0; border: 1px solid #FAD0A8; color: #C45B3A;">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ errorMessage }}
            </div>

            <!-- Success -->
            <div v-if="successMessage" class="px-4 py-3 rounded-xl text-sm flex items-center gap-2" style="background-color: #D4EDDA; border: 1px solid #B8E0C8; color: #1E5631;">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ successMessage }}
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-2.5 text-sm">
                <svg v-if="!isEditing" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {{ isEditing ? 'Update Task' : 'Add Task' }}
              </button>
              <button type="button" @click="close" class="px-6 py-2.5 text-sm font-semibold rounded-xl transition" style="background-color: var(--bg-input); color: var(--text-secondary);">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  editingTask: { type: Object, default: null }
})

const emit = defineEmits(['close', 'add-task', 'update-task'])

const form = ref({ title: '', subject: '', dueDate: '', priority: '', status: '', description: '' })
const errorMessage = ref('')
const successMessage = ref('')
const isEditing = ref(false)

watch(() => props.editingTask, (task) => {
  if (task) {
    form.value = { ...task }
    isEditing.value = true
    errorMessage.value = ''
    successMessage.value = ''
  } else {
    resetForm()
  }
}, { immediate: true })

watch(() => props.isOpen, (open) => {
  if (open) {
    errorMessage.value = ''
    successMessage.value = ''
  }
})

function resetForm() {
  form.value = { title: '', subject: '', dueDate: '', priority: '', status: '', description: '' }
  isEditing.value = false
  errorMessage.value = ''
}

function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.title.trim() || !form.value.subject.trim() || !form.value.dueDate || !form.value.priority || !form.value.status) {
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  if (isEditing.value) {
    emit('update-task', { ...form.value })
    successMessage.value = 'Task updated successfully!'
    setTimeout(() => { close() }, 800)
  } else {
    emit('add-task', { ...form.value })
    successMessage.value = 'Task added successfully!'
    resetForm()
    setTimeout(() => { close() }, 800)
  }
}

function close() {
  emit('close')
  setTimeout(() => resetForm(), 300)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-from .pastel-card, .modal-leave-to .pastel-card {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
.modal-enter-active .pastel-card, .modal-leave-active .pastel-card {
  transition: all 0.3s ease;
}
</style>
