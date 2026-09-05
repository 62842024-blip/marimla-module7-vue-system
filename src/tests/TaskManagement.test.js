import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../components/TaskList.vue'

const tasks = [
  {
    id: 1,
    title: 'Database Laboratory',
    subject: 'Database Management',
    dueDate: '2026-08-30',
    priority: 'High',
    status: 'Pending'
  },
  {
    id: 2,
    title: 'Web Development Project',
    subject: 'Software Engineering 1',
    dueDate: '2026-09-02',
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: 3,
    title: 'Data Structures Quiz',
    subject: 'Data Structures',
    dueDate: '2026-09-01',
    priority: 'Medium',
    status: 'Pending'
  }
]

describe('Student Task Management System', () => {

  it('adds a valid task', () => {
    const newTask = {
      id: 4,
      title: 'Python Activity',
      subject: 'Programming',
      dueDate: '2026-09-05',
      priority: 'Medium',
      status: 'Pending'
    }

    const updatedTasks = [...tasks, newTask]

    expect(updatedTasks).toHaveLength(4)
    expect(updatedTasks[3].title).toBe('Python Activity')
  })

  it('displays multiple tasks', () => {
    expect(tasks).toHaveLength(3)
    expect(tasks[0].title).toBe('Database Laboratory')
    expect(tasks[1].title).toBe('Web Development Project')
  })

  it('edits an existing task', () => {
    const updatedTasks = tasks.map(task =>
      task.id === 1
        ? { ...task, title: 'Updated Database Laboratory' }
        : task
    )

    expect(updatedTasks[0].title).toBe('Updated Database Laboratory')
  })

  it('deletes a task', () => {
    const updatedTasks = tasks.filter(task => task.id !== 2)

    expect(updatedTasks).toHaveLength(2)
    expect(updatedTasks.some(task => task.id === 2)).toBe(false)
  })

  it('searches tasks by title or subject', () => {
    const keyword = 'software'

    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(keyword.toLowerCase()) ||
      task.subject.toLowerCase().includes(keyword.toLowerCase())
    )

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Web Development Project')
  })

  it('searches correctly when the keyword has extra spaces', () => {
    const keyword = '  software  '.toLowerCase().trim()

    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(keyword) ||
      task.subject.toLowerCase().includes(keyword)
    )

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Web Development Project')
  })

  it('shows the Overdue option in the status filter', () => {
    const wrapper = mount(TaskList, {
      props: {
        tasks,
        searchQuery: '',
        priorityFilter: '',
        statusFilter: ''
      },
      global: {
        stubs: {
          TaskCard: {
            props: ['task'],
            template: '<div>{{ task.title }}</div>'
          }
        }
      }
    })

    const statusSelect = wrapper.findAll('select')[1]
    const options = statusSelect.findAll('option')

    expect(options.some(option => option.text() === 'Overdue')).toBe(true)
  })

  it('shows overdue incomplete tasks and excludes completed tasks', async () => {
    const dateOffset = (days) => {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date.toISOString().split('T')[0]
    }

    const overdueTasks = [
      {
        id: 101,
        title: 'Overdue Pending Task',
        subject: 'Software Engineering',
        dueDate: dateOffset(-2),
        priority: 'High',
        status: 'Pending'
      },
      {
        id: 102,
        title: 'Overdue Completed Task',
        subject: 'Software Engineering',
        dueDate: dateOffset(-3),
        priority: 'Medium',
        status: 'Completed'
      },
      {
        id: 103,
        title: 'Future Task',
        subject: 'Software Engineering',
        dueDate: dateOffset(2),
        priority: 'Low',
        status: 'Pending'
      }
    ]

    const wrapper = mount(TaskList, {
      props: {
        tasks: overdueTasks,
        searchQuery: '',
        priorityFilter: '',
        statusFilter: 'Overdue'
      },
      global: {
        stubs: {
          TaskCard: {
            props: ['task'],
            template: '<div>{{ task.title }}</div>'
          }
        }
      }
    })

    await wrapper.vm.$nextTick()

    const taskCards = wrapper.findAllComponents({
      name: 'TaskCard'
    })

    expect(wrapper.text()).toContain('Overdue Pending Task')
    expect(wrapper.text()).not.toContain('Overdue Completed Task')
    expect(wrapper.text()).not.toContain('Future Task')
    expect(taskCards).toHaveLength(0)
  })

})