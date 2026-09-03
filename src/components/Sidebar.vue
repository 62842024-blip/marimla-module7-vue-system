<template>
  <aside
    class="fixed lg:sticky top-0 left-0 z-30 h-screen w-64 flex flex-col transition-transform duration-300"
    style="background-color: var(--bg-sidebar); border-right: 1px solid var(--border-color);"
    :class="{ '-translate-x-full lg:translate-x-0': !isOpen, 'translate-x-0': isOpen }"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 lg:hidden">
      <span class="font-bold text-lg" style="color: var(--text-primary);">Menu</span>
      <button @click="$emit('close')" class="p-2 rounded-lg" style="color: var(--text-secondary);">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <div class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider" style="color: var(--text-muted);">Main</div>

      <a
        @click.prevent="$emit('navigate', 'dashboard')"
        :class="['sidebar-link', activeView === 'dashboard' ? 'active' : '']"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Dashboard
      </a>

      <a
        @click.prevent="$emit('navigate', 'tasks')"
        :class="['sidebar-link', activeView === 'tasks' ? 'active' : '']"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        All Tasks
        <span
          v-if="taskCount > 0"
          class="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
          style="background: var(--lavender-light); color: #7B6EC4;"
        >{{ taskCount }}</span>
      </a>

      <a
        @click.prevent="$emit('navigate', 'calendar')"
        :class="['sidebar-link', activeView === 'calendar' ? 'active' : '']"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Calendar
      </a>

      <div class="px-3 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider" style="color: var(--text-muted);">Status</div>

      <a
        @click.prevent="$emit('filter-status', 'Pending')"
        :class="['sidebar-link', activeFilter === 'Pending' ? 'active' : '']"
      >
        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
        Pending
        <span v-if="pendingCount > 0" class="ml-auto text-xs" style="color: var(--text-muted);">{{ pendingCount }}</span>
      </a>

      <a
        @click.prevent="$emit('filter-status', 'In Progress')"
        :class="['sidebar-link', activeFilter === 'In Progress' ? 'active' : '']"
      >
        <span class="w-2 h-2 rounded-full bg-blue-400"></span>
        In Progress
        <span v-if="progressCount > 0" class="ml-auto text-xs" style="color: var(--text-muted);">{{ progressCount }}</span>
      </a>

      <a
        @click.prevent="$emit('filter-status', 'Completed')"
        :class="['sidebar-link', activeFilter === 'Completed' ? 'active' : '']"
      >
        <span class="w-2 h-2 rounded-full bg-green-400"></span>
        Completed
        <span v-if="completedCount > 0" class="ml-auto text-xs" style="color: var(--text-muted);">{{ completedCount }}</span>
      </a>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t" style="border-color: var(--border-color);">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center text-white text-sm font-bold shrink-0">
          {{ sidebarInitials }}
        </div>
        <div class="overflow-hidden">
          <p class="text-sm font-semibold truncate" style="color: var(--text-primary);">{{ currentUser?.displayName || 'Student Account' }}</p>
          <p class="text-xs" style="color: var(--text-muted);">{{ currentUser?.role || 'TaskFlow User' }}</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 z-20 sidebar-overlay lg:hidden"
  ></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  activeView: String,
  activeFilter: String,
  taskCount: Number,
  pendingCount: Number,
  progressCount: Number,
  completedCount: Number,
  currentUser: { type: Object, default: null }
})

defineEmits(['close', 'navigate', 'filter-status'])

const sidebarInitials = computed(() => {
  if (!props.currentUser?.displayName) return '?'
  return props.currentUser.displayName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>
