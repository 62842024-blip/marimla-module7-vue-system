<template>
  <div
    class="pastel-card p-4 sm:p-5 group cursor-pointer"
    :class="borderClass"
    @click="$emit('edit', task)"
  >
    <div class="flex items-start gap-3">
      <!-- Checkbox -->
      <div class="pt-0.5">
        <input
          type="checkbox"
          class="pastel-checkbox"
          :checked="task.status === 'Completed'"
          @click.stop
          @change="$emit('toggle-complete', task)"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <h3
            class="font-semibold text-sm sm:text-base truncate"
            :class="task.status === 'Completed' ? 'line-through opacity-50' : ''"
            style="color: var(--text-primary);"
          >
            {{ task.title }}
          </h3>
          <div class="flex items-center gap-1.5 shrink-0">
            <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full', priorityClass]">
              {{ task.priority }}
            </span>
          </div>
        </div>

        <p class="text-sm mb-2 truncate" style="color: var(--text-secondary);">
          {{ task.description || task.subject }}
        </p>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 text-xs" style="color: var(--text-muted);">
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {{ task.subject }}
            </span>
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(task.dueDate) }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click.stop="$emit('edit', task)"
              class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              style="color: var(--text-muted);"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click.stop="$emit('delete', task.id)"
              class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              style="color: var(--text-muted);"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, required: true }
})

const emit = defineEmits(['edit', 'delete', 'toggle-complete'])

const priorityClass = {
  'High': 'badge-high',
  'Medium': 'badge-medium',
  'Low': 'badge-low'
}[props.task.priority] || 'badge-medium'

const borderClass = {
  'High': 'task-border-high',
  'Medium': 'task-border-medium',
  'Low': 'task-border-low'
}[props.task.priority] || 'task-border-medium'

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (diffDays < 0) return `${formatted} (Overdue)`
  if (diffDays === 0) return `${formatted} (Today)`
  if (diffDays === 1) return `${formatted} (Tomorrow)`
  return formatted
}
</script>
