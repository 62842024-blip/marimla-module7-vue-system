<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Welcome & Quote -->
    <div class="quote-box">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lavender" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium italic" style="color: var(--text-primary);">"{{ currentQuote }}"</p>
          <p class="text-xs mt-1" style="color: var(--text-muted);">— {{ currentAuthor }}</p>
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total -->
      <div class="pastel-card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl stat-icon-lavender flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--text-muted);">Total Tasks</span>
        </div>
        <p class="text-3xl font-bold" style="color: var(--text-primary);">{{ tasks.length }}</p>
        <p class="text-xs mt-1" style="color: var(--text-muted);">All your tasks</p>
      </div>

      <!-- Pending -->
      <div class="pastel-card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl stat-icon-peach flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--text-muted);">Pending</span>
        </div>
        <p class="text-3xl font-bold" style="color: var(--text-primary);">{{ pendingCount }}</p>
        <p class="text-xs mt-1" style="color: var(--text-muted);">Tasks to complete</p>
      </div>

      <!-- Completed -->
      <div class="pastel-card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl stat-icon-mint flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--text-muted);">Completed</span>
        </div>
        <p class="text-3xl font-bold" style="color: var(--text-primary);">{{ completedCount }}</p>
        <p class="text-xs mt-1" style="color: var(--text-muted);">Finished tasks</p>
      </div>

      <!-- High Priority -->
      <div class="pastel-card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl stat-icon-pink flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--text-muted);">High Priority</span>
        </div>
        <p class="text-3xl font-bold" style="color: var(--text-primary);">{{ highPriorityCount }}</p>
        <p class="text-xs mt-1" style="color: var(--text-muted);">Needs attention</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Left: Upcoming Tasks -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Upcoming Tasks -->
        <div class="pastel-card p-5">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-base" style="color: var(--text-primary);">Upcoming Tasks</h3>
              <p class="text-xs mt-0.5" style="color: var(--text-muted);">Tasks due soon</p>
            </div>
            <button
              @click="$emit('view-all')"
              class="text-xs font-semibold hover:underline transition"
              style="color: var(--accent-primary);"
            >
              View All
            </button>
          </div>

          <div v-if="upcomingTasks.length === 0" class="text-center py-8">
            <p class="text-sm" style="color: var(--text-muted);">No upcoming tasks</p>
          </div>
          <div v-else class="space-y-3">
            <TaskCard
              v-for="task in upcomingTasks"
              :key="task.id"
              :task="task"
              @edit="$emit('edit-task', $event)"
              @delete="$emit('delete-task', $event)"
              @toggle-complete="$emit('toggle-complete', $event)"
            />
          </div>
        </div>

        <!-- Recent Tasks -->
        <div class="pastel-card p-5">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-base" style="color: var(--text-primary);">Recent Tasks</h3>
              <p class="text-xs mt-0.5" style="color: var(--text-muted);">Recently added or updated</p>
            </div>
            <button
              @click="$emit('view-all')"
              class="text-xs font-semibold hover:underline transition"
              style="color: var(--accent-primary);"
            >
              View All
            </button>
          </div>

          <div v-if="recentTasks.length === 0" class="text-center py-8">
            <p class="text-sm" style="color: var(--text-muted);">No recent tasks</p>
          </div>
          <div v-else class="space-y-3">
            <TaskCard
              v-for="task in recentTasks"
              :key="task.id"
              :task="task"
              @edit="$emit('edit-task', $event)"
              @delete="$emit('delete-task', $event)"
              @toggle-complete="$emit('toggle-complete', $event)"
            />
          </div>
        </div>
      </div>

      <!-- Right: Progress & Calendar -->
      <div class="space-y-6">
        <!-- Task Progress -->
        <div class="pastel-card p-5">
          <h3 class="font-bold text-base mb-4" style="color: var(--text-primary);">Task Progress</h3>
          <div class="flex items-center justify-center mb-4">
            <div class="relative w-32 h-32">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-color)" stroke-width="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#progressGradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="264"
                  :stroke-dashoffset="264 - (264 * completionRate / 100)"
                  class="progress-ring-circle"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#9B8FD4" />
                    <stop offset="100%" stop-color="#7BA7D9" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold" style="color: var(--text-primary);">{{ completionRate }}%</span>
                <span class="text-xs" style="color: var(--text-muted);">Completed</span>
              </div>
            </div>
          </div>
          <div class="space-y-2.5">
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2" style="color: var(--text-secondary);">
                <span class="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                Completed
              </span>
              <span class="font-semibold" style="color: var(--text-primary);">{{ completedCount }} tasks</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2" style="color: var(--text-secondary);">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                In Progress
              </span>
              <span class="font-semibold" style="color: var(--text-primary);">{{ inProgressCount }} tasks</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2" style="color: var(--text-secondary);">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Pending
              </span>
              <span class="font-semibold" style="color: var(--text-primary);">{{ pendingCount }} tasks</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2" style="color: var(--text-secondary);">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                High Priority
              </span>
              <span class="font-semibold" style="color: var(--text-primary);">{{ highPriorityCount }} tasks</span>
            </div>
          </div>
        </div>

        <!-- Calendar -->
        <Calendar :tasks="tasks" @select-date="$emit('select-date', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskCard from './TaskCard.vue'
import Calendar from './Calendar.vue'

const props = defineProps({
  tasks: { type: Array, default: () => [] }
})

const emit = defineEmits(['edit-task', 'delete-task', 'toggle-complete', 'view-all', 'select-date'])

const completedCount = computed(() => props.tasks.filter(t => t.status === 'Completed').length)
const pendingCount = computed(() => props.tasks.filter(t => t.status === 'Pending').length)
const inProgressCount = computed(() => props.tasks.filter(t => t.status === 'In Progress').length)
const highPriorityCount = computed(() => props.tasks.filter(t => t.priority === 'High').length)

const completionRate = computed(() => {
  if (props.tasks.length === 0) return 0
  return Math.round((completedCount.value / props.tasks.length) * 100)
})

const upcomingTasks = computed(() => {
  const now = new Date()
  return props.tasks
    .filter(t => t.status !== 'Completed' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4)
})

const recentTasks = computed(() => {
  return [...props.tasks]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3)
})

// Motivational quotes
const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Strive for progress, not perfection.", author: "Unknown" }
]

const todayQuote = computed(() => {
  const dayIndex = new Date().getDate() % quotes.length
  return quotes[dayIndex]
})

const currentQuote = computed(() => todayQuote.value.text)
const currentAuthor = computed(() => todayQuote.value.author)
</script>
