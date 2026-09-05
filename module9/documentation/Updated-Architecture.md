# Updated Architecture – Module 9

## CR-M9-01 — Add Overdue Option to the Status Filter

**Maintenance Type:** Perfective Maintenance  
**Target Version:** 1.1.0

---

## 1. Purpose

The Module 9 architectural update extends the existing TaskFlow filtering flow to support **Overdue** as an additional status-filter option.

The existing architecture is preserved. The change only extends the current filtering behavior using information that already exists in each task record.

---

## 2. Previous Architecture

The existing TaskFlow system follows a component-based Vue.js architecture.

### Main Application Flow

```text
User
  |
  v
Vue Application
  |
  +-------------------+
  |                   |
  v                   v
Sidebar           AppHeader
  |                   |
  |                   +--> Search
  |                   +--> Theme Toggle
  |                   +--> Add Task
  |                   +--> Authentication
  |
  v
Task Management Views
  |
  +--> Dashboard
  +--> All Tasks
  +--> Calendar
  |
  v
Task Components
  |
  +--> TaskForm
  +--> TaskList
  +--> TaskCard
  +--> ConfirmModal
  |
  v
Task Data
  |
  v
LocalStorage
  |
  +--> module7-tasks

3. Existing Task Filtering Flow

The existing task management flow uses task information such as:

Title
Subject
Due Date
Priority
Status

The filtering process already supports:

Search
Priority filtering
Pending status filtering
In Progress status filtering
Completed status filtering

The application also already identifies overdue tasks based on their due date and displays an Overdue indicator.

However, Overdue is not yet available as a selectable status-filter option.

4. Module 9 Architectural Evolution

The existing filtering flow will be extended as follows:

                    USER
                      │
                      ▼
              VUE APPLICATION
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
       SIDEBAR                APP HEADER
          │                       │
          │                 ┌─────┼─────┐
          │                 ▼     ▼     ▼
          │              Search Theme  Add Task
          │              Toggle        │
          │                            ▼
          │                     Authentication
          ▼
   TASK MANAGEMENT VIEWS
          │
     ┌────┼─────────────┐
     ▼    ▼             ▼
 Dashboard All Tasks  Calendar
          │
          ▼
   TASK COMPONENTS
          │
   ┌──────┼───────────────┐
   ▼      ▼       ▼       ▼
TaskForm TaskList TaskCard ConfirmModal
                  │
                  ▼
            FILTERING LOGIC
                  │
       ┌──────────┼───────────┐
       ▼          ▼           ▼
    Search    Priority     Status
                            │
                 ┌──────────┼──────────┐
                 ▼          ▼          ▼
              Pending   In Progress Completed
                            │
                            ▼
                         OVERDUE
                            │
                  Due Date < Current Date
                            AND
                     Status != Completed
                            │
                            ▼
                    FILTERED TASK LIST
                            │
                            ▼
                      LOCALSTORAGE
                            │
                     module7-tasks

The Overdue option is treated as a derived condition rather than a new stored task status.

5. Overdue Rule

A task is considered overdue when:

Due Date < Current Date
AND
Status != Completed

This means:

A past-due Pending task is Overdue.
A past-due In Progress task is Overdue.
A past-due Completed task is not included in the Overdue filter.
A task due today is not considered overdue.
A future task is not considered overdue.
6. Affected Components
Existing Components

The following existing areas remain part of the architecture:

App.vue
TaskList.vue
TaskCard.vue
TaskForm.vue
Dashboard.vue
Calendar.vue
Sidebar.vue
AppHeader.vue
ConfirmModal.vue
Module 9 Affected Area

The primary affected area is the existing task filtering implementation.

The status-filter interface and filtering logic will be extended to recognize:

Overdue

No new major component is required.

7. Data Flow

The Module 9 data flow remains based on the existing task record.

Existing Task Record
       |
       +--> dueDate
       |
       +--> status
       |
       v
Overdue Evaluation
       |
       +--> Past Due?
       |
       +--> Completed?
       |
       v
Overdue Filter Result
       |
       v
Task List Display

The existing task data is sufficient to determine whether a task should appear in the Overdue filter.

8. LocalStorage Impact

No localStorage schema modification is required.

The existing task records already contain:

dueDate
status

The Module 9 evolution derives the Overdue condition from these existing fields.

Existing saved tasks remain compatible with the evolved system.

9. Authentication and Other Existing Features

The Module 9 architecture does not change the existing authentication and session-handling flow.

The following functionality remains outside the primary scope of this architectural change:

Login
Registration
Logout
Session restoration
Add Task
Edit Task
Delete Task
Delete Confirmation
Search
Priority Filtering
Existing Status Filtering
Persistence
Responsive Layout

These features must continue functioning after implementation.

10. Architectural Constraints

The Module 9 evolution must follow these constraints:

Preserve the existing Vue.js architecture.
Do not create a new project.
Do not create a separate application.
Do not redesign the existing interface.
Do not change the task storage schema.
Do not introduce unnecessary components.
Extend the existing filtering behavior.
Preserve all valid Module 8 functionality.
Verify the change through automated and manual testing.
11. Architecture Impact Summary

The architecture change is localized and incremental.

The main evolution is:

Previous:
Status Filter
  ├── Pending
  ├── In Progress
  └── Completed

Module 9:
Status Filter
  ├── Pending
  ├── In Progress
  ├── Completed
  └── Overdue  <-- Added

The Overdue condition is calculated from existing task data rather than stored as a new status value.

This preserves backward compatibility and minimizes the risk of regression.

12. Updated Architecture Label

Updated Architecture – Module 9

The architectural change highlighted for Module 9 is the extension of the existing status-filter flow with an Overdue filter condition.

No unrelated architectural components are redesigned or replaced.