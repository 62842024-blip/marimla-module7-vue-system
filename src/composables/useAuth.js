import { ref, computed } from 'vue'

// Shared singleton state across the app
const currentUser = ref(null)

// Built-in demo accounts (always available)
const DEFAULT_ACCOUNTS = [
  { username: 'admin',   password: 'admin123',   displayName: 'Admin User',  role: 'Administrator' },
  { username: 'student', password: 'student123', displayName: 'Kim Marimla', role: 'Student'       },
  { username: 'guest',   password: 'guest123',   displayName: 'Guest User',  role: 'Guest'         },
]

const SESSION_KEY = 'taskflow-session'
const USERS_KEY   = 'taskflow-users'

function getRegisteredUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getAllAccounts() {
  return [...DEFAULT_ACCOUNTS, ...getRegisteredUsers()]
}

export function useAuth() {
  const isLoggedIn = computed(() => currentUser.value !== null)

  function restoreSession() {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      if (saved) {
        currentUser.value = JSON.parse(saved)
      }
    } catch {
      currentUser.value = null
    }
  }

  function login(username, password) {
    const account = getAllAccounts().find(
      a => a.username === username.trim().toLowerCase() && a.password === password
    )
    if (!account) {
      return { success: false, message: 'Invalid username or password.' }
    }
    const user = {
      username: account.username,
      displayName: account.displayName,
      role: account.role,
      loginAt: new Date().toISOString()
    }
    currentUser.value = user
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return { success: true }
  }

  function register({ username, password, displayName, role }) {
    const uname = username.trim().toLowerCase()

    if (!uname || !password || !displayName.trim()) {
      return { success: false, message: 'Please fill in all required fields.' }
    }
    if (uname.length < 3) {
      return { success: false, message: 'Username must be at least 3 characters.' }
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' }
    }

    // Check if username already taken
    const exists = getAllAccounts().find(a => a.username === uname)
    if (exists) {
      return { success: false, message: 'Username is already taken. Please choose another.' }
    }

    const newUser = {
      username: uname,
      password,
      displayName: displayName.trim(),
      role: role || 'Student'
    }

    const registered = getRegisteredUsers()
    registered.push(newUser)
    saveRegisteredUsers(registered)

    return { success: true }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { currentUser, isLoggedIn, login, logout, restoreSession, register }
}
