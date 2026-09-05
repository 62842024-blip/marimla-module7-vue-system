<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Filters & Search -->
    <div class="pastel-card p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            placeholder="Search by title or subject..."
            class="w-full pl-10 pr-4 py-2.5 text-sm pastel-input"
          />
        </div>

        <!-- Priority Filter -->
        <select
          :value="priorityFilter"
          @change="$emit('update:priorityFilter', $event.target.value)"
          class="px-4 py-2.5 text-sm pastel-input appearance-none cursor-pointer min-w-[140px]"
          style="background-image: url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%239B8FD4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e'); background-position: right 12px center; background-repeat: no-repeat; background-size: 20px;"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <!-- Status Filter -->
        <select
          :value="statusFilter"
          @change="$emit('update:statusFilter', $event.target.value)"
          class="px-4 py-2.5 text-sm pastel-input appearance-none cursor-pointer min-w-[140px]"
          style="background-image: url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%239B8FD4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e'); background-position: right 12px center; background-repeat: no-repeat; background-size: 20px;"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
    </div>

    <!-- Results Count -->
    <div class="flex items-center justify-between">
      <p class="text-sm" style="color: var(--text-muted);">
        Showing <span class="font-semibold" style="color: var(--text-primary);">{{ filteredTasks.length }}</span> of <span class="font-semibold" style="color: var(--text-primary);">{{ tasks.length }}</span> tasks
      </p>
      <button
        v-if="searchQuery || priorityFilter || statusFilter"
        @click="$emit('clear-filters')"
        class="text-xs font-semibold hover:underline transition"
        style="color: var(--accent-primary);"
      >
        Clear Filters
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTasks.length === 0" class="pastel-card p-12 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lavender/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-lavender/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p class="font-semibold" style="color: var(--text-primary);">No tasks found</p>
      <p class="text-sm mt-1" style="color: var(--text-muted);">Try adjusting your search or filters</p>
    </div>

    <!-- Task List -->
    <div v-else class="space-y-3">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit-task', $event)"
        @delete="$emit('delete-task', $event)"
        @toggle-complete="$emit('toggle-complete', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  searchQuery: String,
  priorityFilter: String,
  statusFilter: String
})

const emit = defineEmits(['edit-task', 'delete-task', 'toggle-complete', 'update:searchQuery', 'update:priorityFilter', 'update:statusFilter', 'clear-filters'])

const filteredTasks = computed(() => {
  let result = props.tasks

  if (props.searchQuery) {
  const q = props.searchQuery.toLowerCase().trim()
  result = result.filter(t => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))
}

  if (props.priorityFilter) {
    result = result.filter(t => t.priority === props.priorityFilter)
  }

  if (props.statusFilter) {
  if (props.statusFilter === 'Overdue') {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    result = result.filter(t => {
      if (!t.dueDate || t.status === 'Completed') return false

      const dueDate = new Date(t.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      return dueDate < today
    })
  } else {
    result = result.filter(t => t.status === props.statusFilter)
  }
}

  return result
})
</script>
