<template>
  <header class="sticky top-0 z-40" style="background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color);">
    <div class="flex items-center justify-between px-4 sm:px-6 py-3">
      <!-- Left: Logo & Mobile Menu -->
      <div class="flex items-center gap-3">
        <button
          @click="$emit('toggle-sidebar')"
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          style="color: var(--text-secondary);"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold" style="color: var(--text-primary);">TaskFlow</h1>
          </div>
        </div>
      </div>

      <!-- Center: Search -->
      <div class="hidden md:flex flex-1 max-w-md mx-6">
        <div class="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            :value="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search tasks..."
            class="w-full pl-10 pr-4 py-2 text-sm pastel-input"
          />
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          @click="$emit('toggle-theme')"
          class="p-2.5 rounded-xl transition"
          style="color: var(--text-secondary);"
          :style="{ backgroundColor: 'var(--bg-input)' }"
          title="Toggle theme"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Add Task Button -->
        <button
          @click="$emit('add-task')"
          class="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  isDark: Boolean,
  searchQuery: String
})

const emit = defineEmits(['toggle-sidebar', 'toggle-theme', 'add-task', 'update:searchQuery', 'search-submitted'])

function handleSearch(e) {
  emit('update:searchQuery', e.target.value)
  emit('search-submitted')
}
</script>
