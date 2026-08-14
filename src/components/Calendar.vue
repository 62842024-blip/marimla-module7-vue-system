<template>
  <div class="pastel-card p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-base" style="color: var(--text-primary);">Calendar Overview</h3>
      <div class="flex items-center gap-2">
        <button
          @click="prevMonth"
          class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          style="color: var(--text-secondary);"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="text-sm font-semibold min-w-[100px] text-center" style="color: var(--text-primary);">
          {{ monthYear }}
        </span>
        <button
          @click="nextMonth"
          class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          style="color: var(--text-secondary);"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Weekday headers -->
    <div class="grid grid-cols-7 gap-1 mb-1">
      <div
        v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="day"
        class="text-center text-xs font-semibold py-2"
        style="color: var(--text-muted);"
      >
        {{ day }}
      </div>
    </div>

    <!-- Days grid -->
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'calendar-day flex-col gap-0.5',
          day.isToday ? 'today' : '',
          day.isCurrentMonth ? '' : 'other-month'
        ]"
        @click="day.isCurrentMonth && day.tasks.length > 0 && $emit('select-date', day.date)"
      >
        <span class="text-xs font-semibold">{{ day.day }}</span>
        <!-- Task labels -->
        <div v-if="day.tasks.length > 0" class="flex flex-col gap-0.5 w-full px-0.5">
          <span
            v-for="task in day.tasks.slice(0, 2)"
            :key="task.id"
            class="text-[10px] truncate px-1 py-0.5 rounded font-bold leading-tight"
            :class="taskLabelClass(task.priority)"
            :title="task.title"
          >
            {{ task.title }}
          </span>
          <span v-if="day.tasks.length > 2" class="text-[9px] text-center font-medium" style="color: var(--text-muted);">
            +{{ day.tasks.length - 2 }} more
          </span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-4 pt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style="border-top: 1px solid var(--border-color); color: var(--text-muted);">
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-red-500"></span>
        High Priority
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
        Medium Priority
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        Low Priority
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] }
})

const emit = defineEmits(['select-date'])

const currentDate = ref(new Date())

const monthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPadding = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const days = []
  const today = new Date()

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, isToday: false, tasks: [], date: null })
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i

    const dayTasks = props.tasks.filter(t => {
      if (!t.dueDate) return false
      const d = new Date(t.dueDate)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === i
    })

    days.push({ day: i, isCurrentMonth: true, isToday, tasks: dayTasks, date: dateStr })
  }

  // Next month padding
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, isToday: false, tasks: [], date: null })
  }

  return days
})

function taskLabelClass(priority) {
  switch (priority) {
    case 'High': return 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200'
    case 'Medium': return 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200'
    case 'Low': return 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-200'
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
  }
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}
</script>
