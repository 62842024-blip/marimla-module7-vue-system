import { describe, it, expect } from 'vitest'

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