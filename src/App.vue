<template>
  <div class="min-h-screen flex" style="background-color: var(--bg-primary);">
    <!-- Sidebar -->
    <Sidebar
      :is-open="sidebarOpen"
      :active-view="currentView"
      :active-filter="statusFilter"
      :task-count="tasks.length"
      :pending-count="pendingCount"
      :progress-count="inProgressCount"
      :completed-count="completedCount"
      @close="sidebarOpen = false"
      @navigate="handleNavigate"
      @filter-status="handleStatusFilter"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <AppHeader
        :is-dark="isDark"
        v-model:searchQuery="searchQuery"
        @toggle-sidebar="sidebarOpen = true"
        @toggle-theme="toggleTheme"
        @add-task="openAddTask"
        @search-submitted="handleSearchSubmit"
      />

      <main class="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
        <!-- Dashboard View -->
        <Dashboard
          v-if="currentView === 'dashboard'"
          :tasks="tasks"
          @edit-task="openEditTask"
          @delete-task="confirmDelete"
          @toggle-complete="toggleComplete"
          @view-all="currentView = 'tasks'"
        />

        <!-- All Tasks View -->
        <div v-else-if="currentView === 'tasks'">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold" style="color: var(--text-primary);">All Tasks</h2>
              <p class="text-xs" style="color: var(--text-muted);">Manage and organize your tasks</p>
            </div>
          </div>
          <TaskList
            :tasks="tasks"
            v-model:searchQuery="searchQuery"
            v-model:priorityFilter="priorityFilter"
            v-model:statusFilter="statusFilter"
            @edit-task="openEditTask"
            @delete-task="confirmDelete"
            @toggle-complete="toggleComplete"
            @clear-filters="clearFilters"
          />
        </div>

        <!-- Calendar View -->
        <div v-else-if="currentView === 'calendar'">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold" style="color: var(--text-primary);">Calendar</h2>
              <p class="text-xs" style="color: var(--text-muted);">View tasks by due date</p>
            </div>
          </div>
          <div class="max-w-4xl mx-auto">
            <Calendar :tasks="tasks" />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>

    <!-- Task Form Modal -->
    <TaskForm
      :is-open="formOpen"
      :editing-task="editingTask"
      @close="closeForm"
      @add-task="addTask"
      @update-task="updateTask"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="confirmOpen"
      @confirm="executeDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import Sidebar from './components/Sidebar.vue'
import AppFooter from './components/AppFooter.vue'
import Dashboard from './components/Dashboard.vue'
import TaskList from './components/TaskList.vue'
import Calendar from './components/Calendar.vue'
import TaskForm from './components/TaskForm.vue'
import ConfirmModal from './components/ConfirmModal.vue'

// Theme
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('taskflow-theme', isDark.value ? 'dark' : 'light')
}

// Navigation
const currentView = ref('dashboard')
const sidebarOpen = ref(false)

function handleNavigate(view) {
  currentView.value = view
  sidebarOpen.value = false
  statusFilter.value = ''
}

// Search from header - switch to tasks view if on dashboard
function handleSearchSubmit() {
  if (currentView.value !== 'tasks' && searchQuery.value.trim()) {
    currentView.value = 'tasks'
  }
}

// Filters
const searchQuery = ref('')
const priorityFilter = ref('')
const statusFilter = ref('')

function handleStatusFilter(status) {
  statusFilter.value = status
  currentView.value = 'tasks'
  sidebarOpen.value = false
}

function clearFilters() {
  searchQuery.value = ''
  priorityFilter.value = ''
  statusFilter.value = ''
}

// Tasks
const tasks = ref([])
const formOpen = ref(false)
const editingTask = ref(null)

// Delete confirmation
const confirmOpen = ref(false)
const taskToDelete = ref(null)

const pendingCount = computed(() => tasks.value.filter(t => t.status === 'Pending').length)
const inProgressCount = computed(() => tasks.value.filter(t => t.status === 'In Progress').length)
const completedCount = computed(() => tasks.value.filter(t => t.status === 'Completed').length)

// Sample data
const sampleTasks = [
  {
    id: 1,
    title: 'Database Laboratory',
    description: 'Create ERD and normalization diagrams for the library system',
    subject: 'Database Management',
    dueDate: getFutureDate(3),
    priority: 'High',
    status: 'Pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Web Development Project',
    description: 'Build the frontend UI using Vue.js and Tailwind CSS',
    subject: 'Software Engineering 1',
    dueDate: getFutureDate(7),
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: 'Data Structures Quiz',
    description: 'Prepare for the quiz on trees and graphs',
    subject: 'Data Structures',
    dueDate: getFutureDate(5),
    priority: 'Medium',
    status: 'Pending',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 4,
    title: 'Math Assignment',
    description: 'Practice given problems on differential equations',
    subject: 'Calculus 2',
    dueDate: getFutureDate(10),
    priority: 'Low',
    status: 'Pending',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 5,
    title: 'Interface Design',
    description: 'Design the user interface for the mobile app prototype',
    subject: 'Human-Computer Interaction',
    dueDate: getFutureDate(-2),
    priority: 'Medium',
    status: 'Completed',
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 6,
    title: 'Research Paper',
    description: 'Finish the research and write-up on AI ethics',
    subject: 'Ethics in IT',
    dueDate: getFutureDate(-5),
    priority: 'High',
    status: 'Completed',
    createdAt: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 7,
    title: 'Presentation Slides',
    description: 'Create slides for the group project presentation',
    subject: 'Software Engineering 1',
    dueDate: getFutureDate(2),
    priority: 'Medium',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 100000000).toISOString()
  },
  {
    id: 8,
    title: 'Network Configuration Lab',
    description: 'Configure routers and switches in Packet Tracer',
    subject: 'Computer Networks',
    dueDate: getFutureDate(14),
    priority: 'Low',
    status: 'Pending',
    createdAt: new Date(Date.now() - 50000000).toISOString()
  }
]

function getFutureDate(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

// localStorage
function saveTasks() {
  localStorage.setItem('module7-tasks', JSON.stringify(tasks.value))
}

onMounted(() => {
  // Load theme
  const savedTheme = localStorage.getItem('taskflow-theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  // Load tasks
  const saved = localStorage.getItem('module7-tasks')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.length > 0) {
        tasks.value = parsed
      } else {
        tasks.value = sampleTasks
        saveTasks()
      }
    } catch (e) {
      tasks.value = sampleTasks
      saveTasks()
    }
  } else {
    tasks.value = sampleTasks
    saveTasks()
  }
})

// CRUD
function addTask(newTask) {
  const task = {
    id: Date.now(),
    ...newTask,
    createdAt: new Date().toISOString()
  }
  tasks.value.push(task)
  saveTasks()
}

function openAddTask() {
  editingTask.value = null
  formOpen.value = true
}

function openEditTask(task) {
  editingTask.value = { ...task }
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  editingTask.value = null
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask, updatedAt: new Date().toISOString() }
    saveTasks()
  }
}

// Custom delete confirmation
function confirmDelete(id) {
  taskToDelete.value = id
  confirmOpen.value = true
}

function executeDelete() {
  if (taskToDelete.value !== null) {
    tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value)
    saveTasks()
    taskToDelete.value = null
  }
  confirmOpen.value = false
}

function cancelDelete() {
  taskToDelete.value = null
  confirmOpen.value = false
}

function toggleComplete(task) {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasks.value[index].status = task.status === 'Completed' ? 'Pending' : 'Completed'
    saveTasks()
  }
}
</script>
