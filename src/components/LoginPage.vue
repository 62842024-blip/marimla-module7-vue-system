<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 login-bg relative">
    <!-- Top-Right Dark Mode Toggle Button -->
    <button
      @click="$emit('toggle-theme')"
      class="absolute top-5 right-5 z-20 p-2.5 rounded-2xl shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center cursor-pointer"
      style="background-color: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary);"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <!-- Background decorative blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Card -->
    <div class="login-card relative z-10 w-full max-w-md">
      <!-- Logo / Branding -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender to-[#8A7EC3] flex items-center justify-center shadow-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold" style="color: var(--text-primary);">TaskFlow</h1>
        <p class="text-sm mt-1" style="color: var(--text-muted);">Your academic task manager</p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex rounded-2xl p-1 mb-6" style="background-color: var(--bg-input); border: 1px solid var(--border-color);">
        <button
          @click="switchTab('login')"
          :class="['flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200', activeTab === 'login' ? 'tab-active' : 'tab-inactive']"
        >
          Sign In
        </button>
        <button
          @click="switchTab('register')"
          :class="['flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200', activeTab === 'register' ? 'tab-active' : 'tab-inactive']"
        >
          Create Account
        </button>
      </div>

      <!-- ── LOGIN FORM ── -->
      <Transition name="fade-slide" mode="out-in">
        <div v-if="activeTab === 'login'" key="login" class="pastel-card p-8" style="background-color: var(--bg-card);">
          <div class="mb-6">
            <h2 class="text-xl font-bold" style="color: var(--text-primary);">Welcome back 👋</h2>
            <p class="text-sm mt-1" style="color: var(--text-muted);">Sign in to continue to your dashboard</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Username -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Username</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input id="login-username" v-model="login_username" type="text" placeholder="Enter your username" autocomplete="username"
                  class="w-full pl-10 pr-4 py-2.5 text-sm pastel-input" :class="{ 'input-error': loginError }" />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Password</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input id="login-password" v-model="login_password" :type="showLoginPw ? 'text' : 'password'"
                  placeholder="Enter your password" autocomplete="current-password"
                  class="w-full pl-10 pr-10 py-2.5 text-sm pastel-input" :class="{ 'input-error': loginError }" />
                <button type="button" @click="showLoginPw = !showLoginPw"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 transition" style="color: var(--text-muted);">
                  <svg v-if="!showLoginPw" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error -->
            <div v-if="loginError" class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style="background-color: #FDE8D0; border: 1px solid #FAD0A8; color: #C45B3A;">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ loginError }}
            </div>

            <!-- Submit -->
            <button id="login-submit" type="submit" class="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm" :disabled="loginLoading">
              <svg v-if="loginLoading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {{ loginLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <p class="text-center text-xs mt-4" style="color: var(--text-muted);">
            Don't have an account?
            <button @click="switchTab('register')" class="font-semibold" style="color: var(--accent-primary);">Create one</button>
          </p>
        </div>

        <!-- ── REGISTER FORM ── -->
        <div v-else key="register" class="pastel-card p-8" style="background-color: var(--bg-card);">
          <div class="mb-6">
            <h2 class="text-xl font-bold" style="color: var(--text-primary);">Create Account ✨</h2>
            <p class="text-sm mt-1" style="color: var(--text-muted);">Sign up to start managing your tasks</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Display Name -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">
                Full Name <span style="color: #E8916A;">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <input id="reg-displayname" v-model="reg_displayName" type="text" placeholder="e.g. Ana Stark"
                  class="w-full pl-10 pr-4 py-2.5 text-sm pastel-input" />
              </div>
            </div>

            <!-- Username -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">
                Username <span style="color: #E8916A;">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input id="reg-username" v-model="reg_username" type="text" placeholder="Choose a username (min 3 chars)"
                  class="w-full pl-10 pr-4 py-2.5 text-sm pastel-input" autocomplete="username" />
              </div>
            </div>

            <!-- Role -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">Role</label>
              <select id="reg-role" v-model="reg_role" class="w-full px-4 py-2.5 text-sm pastel-input appearance-none cursor-pointer"
                style="background-image: url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3e%3cpath stroke=%22%239B8FD4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M6 8l4 4 4-4%22/%3e%3c/svg%3e'); background-position: right 12px center; background-repeat: no-repeat; background-size: 20px;">
                <option value="Student">Student</option>
                <option value="Administrator">Administrator</option>
                <option value="Guest">Guest</option>
              </select>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">
                Password <span style="color: #E8916A;">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input id="reg-password" v-model="reg_password" :type="showRegPw ? 'text' : 'password'"
                  placeholder="Min 6 characters" autocomplete="new-password"
                  class="w-full pl-10 pr-10 py-2.5 text-sm pastel-input" />
                <button type="button" @click="showRegPw = !showRegPw"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg v-if="!showRegPw" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-secondary);">
                Confirm Password <span style="color: #E8916A;">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <input id="reg-confirm" v-model="reg_confirm" :type="showConfirmPw ? 'text' : 'password'"
                  placeholder="Re-enter your password" autocomplete="new-password"
                  class="w-full pl-10 pr-10 py-2.5 text-sm pastel-input" />
                <button type="button" @click="showConfirmPw = !showConfirmPw"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2" style="color: var(--text-muted);">
                  <svg v-if="!showConfirmPw" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Register Error -->
            <div v-if="registerError" class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style="background-color: #FDE8D0; border: 1px solid #FAD0A8; color: #C45B3A;">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ registerError }}
            </div>

            <!-- Register Success -->
            <div v-if="registerSuccess" class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style="background-color: #D4EDDA; border: 1px solid #B8E0C8; color: #1E5631;">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Account created! Redirecting to sign in...
            </div>

            <!-- Submit -->
            <button id="register-submit" type="submit"
              class="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm"
              :disabled="registerLoading || registerSuccess">
              <svg v-if="registerLoading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              {{ registerLoading ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>

          <p class="text-center text-xs mt-5" style="color: var(--text-muted);">
            Already have an account?
            <button @click="switchTab('login')" class="font-semibold" style="color: var(--accent-primary);">Sign in</button>
          </p>
        </div>
      </Transition>

      <!-- Footer note -->
      <p class="text-center text-xs mt-6" style="color: var(--text-muted);">
        TaskFlow · Module 7 · Academic Task Manager
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'

defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-theme'])

const { login, register } = useAuth()

// Tab state
const activeTab = ref('login')

function switchTab(tab) {
  activeTab.value = tab
  loginError.value = ''
  registerError.value = ''
  registerSuccess.value = false
}

// ── LOGIN STATE ──
const login_username = ref('')
const login_password = ref('')
const showLoginPw    = ref(false)
const loginError     = ref('')
const loginLoading   = ref(false)

async function handleLogin() {
  loginError.value = ''
  if (!login_username.value.trim() || !login_password.value) {
    loginError.value = 'Please enter both username and password.'
    return
  }
  loginLoading.value = true
  await new Promise(r => setTimeout(r, 600))
  const result = login(login_username.value, login_password.value)
  if (!result.success) {
    loginError.value = result.message
  }
  loginLoading.value = false
}

// ── REGISTER STATE ──
const reg_displayName = ref('')
const reg_username    = ref('')
const reg_role        = ref('Student')
const reg_password    = ref('')
const reg_confirm     = ref('')
const showRegPw       = ref(false)
const showConfirmPw   = ref(false)
const registerError   = ref('')
const registerSuccess = ref(false)
const registerLoading = ref(false)

async function handleRegister() {
  registerError.value = ''
  registerSuccess.value = false

  if (!reg_displayName.value.trim() || !reg_username.value.trim() || !reg_password.value || !reg_confirm.value) {
    registerError.value = 'Please fill in all required fields.'
    return
  }
  if (reg_password.value !== reg_confirm.value) {
    registerError.value = 'Passwords do not match.'
    return
  }

  registerLoading.value = true
  await new Promise(r => setTimeout(r, 700))

  const result = register({
    username:    reg_username.value,
    password:    reg_password.value,
    displayName: reg_displayName.value,
    role:        reg_role.value
  })

  if (!result.success) {
    registerError.value = result.message
    registerLoading.value = false
    return
  }

  registerSuccess.value = true
  registerLoading.value = false

  // Auto-switch to login after 1.5s
  setTimeout(() => {
    login_username.value = reg_username.value.trim().toLowerCase()
    login_password.value = reg_password.value
    // Reset register form
    reg_displayName.value = ''
    reg_username.value    = ''
    reg_password.value    = ''
    reg_confirm.value     = ''
    registerSuccess.value = false
    switchTab('login')
  }, 1500)
}
</script>

<style scoped>
/* Background */
.login-bg {
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

/* Decorative blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}
.blob-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #C4B8F0, #9B8FD4);
  top: -100px; left: -100px;
}
.blob-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #B8D4E3, #7BA7D9);
  bottom: -80px; right: -80px;
}
.blob-3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, #FDE8D0, #E8916A);
  bottom: 80px; left: 60px;
  opacity: 0.2;
}
.dark .blob { opacity: 0.12; }

/* Card entrance */
.login-card {
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Tabs */
.tab-active {
  background: linear-gradient(135deg, #9B8FD4, #8A7EC3);
  color: white;
  box-shadow: 0 2px 8px rgba(155, 143, 212, 0.3);
}
.tab-inactive {
  color: var(--text-secondary);
  background: transparent;
}
.tab-inactive:hover {
  color: var(--text-primary);
}

/* Input error state */
.input-error {
  border-color: #F5A9A0 !important;
  box-shadow: 0 0 0 3px rgba(245, 169, 160, 0.2) !important;
}


/* Transition between tabs */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Spinner */
@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }
</style>
