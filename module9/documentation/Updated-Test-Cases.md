# Updated Test Cases – Module 9

## System
Student Task Management System

## Change Request
CR-M9-01 – Add Overdue Option to the Status Filter

## Maintenance Type
Perfective Maintenance

## Target Version
1.1.0

---

## Manual Test Cases

| Test ID | Feature | Test Scenario | Test Data / Action | Expected Result | Type | Acceptance Criteria |
|---|---|---|---|---|---|---|
| M9-TC-01 | Overdue Filter | Verify Overdue option is available | Open the Status Filter dropdown | Overdue appears together with Pending, In Progress, and Completed | Positive | AC-01 |
| M9-TC-02 | Overdue Filter | Filter overdue incomplete tasks | Select Overdue with at least one past-due incomplete task | Only overdue incomplete tasks are displayed | Positive | AC-02 |
| M9-TC-03 | Overdue Filter | Exclude completed overdue tasks | Select Overdue when a past-due Completed task exists | Completed overdue tasks are not displayed | Negative | AC-03 |
| M9-TC-04 | Overdue Filter | Verify future tasks are excluded | Select Overdue when future-dated tasks exist | Future tasks are not displayed | Negative | AC-02 |
| M9-TC-05 | Status Filter | Verify Pending filter still works | Select Pending | Only Pending tasks are displayed | Positive | AC-04 |
| M9-TC-06 | Status Filter | Verify Completed filter still works | Select Completed | Only Completed tasks are displayed | Positive | AC-04 |
| M9-TC-07 | Search | Search by task title | Enter an existing task title in the search field | Matching task is displayed | Positive | AC-04 |
| M9-TC-08 | Search | Search with extra spaces | Enter a keyword with leading/trailing spaces | Matching results are still displayed | Positive | AC-04 |
| M9-TC-09 | Add/Create | Add a valid task | Enter valid title, subject, due date, priority, and status | New task is successfully added and displayed | Positive | AC-04 |
| M9-TC-10 | Validation | Submit an invalid/incomplete task | Leave required fields empty and attempt to save | Validation prevents invalid task submission | Negative | AC-04 |
| M9-TC-11 | Edit | Edit an existing task | Modify an existing task and save | Updated task information is displayed | Positive | AC-04 |
| M9-TC-12 | Delete Confirmation | Cancel task deletion | Select Delete, then cancel in the confirmation dialog | Task remains in the list | Negative | AC-04 |
| M9-TC-13 | Delete | Confirm task deletion | Select Delete and confirm | Selected task is removed from the list | Positive | AC-04 |
| M9-TC-14 | Persistence | Verify task persistence | Add or edit a task, then refresh the page | Task changes remain after refresh | Positive | AC-04 |
| M9-TC-15 | Responsive UI | Verify mobile layout | Resize browser to a mobile-sized viewport | Interface remains usable without major layout problems | Positive | AC-04 |

---

## Acceptance Criteria Coverage

### AC-01 – Overdue Filter Option
- M9-TC-01

### AC-02 – Correct Overdue Results
- M9-TC-02
- M9-TC-04

### AC-03 – Completed Tasks Excluded
- M9-TC-03

### AC-04 – Existing Features Preserved
- M9-TC-05
- M9-TC-06
- M9-TC-07
- M9-TC-08
- M9-TC-09
- M9-TC-10
- M9-TC-11
- M9-TC-12
- M9-TC-13
- M9-TC-14
- M9-TC-15

---

## Regression Testing Scope

The following existing system features were included in regression testing:

- Add/Create task
- Display tasks
- Edit task
- Delete task
- Search
- Validation
- Delete confirmation
- Persistence through localStorage
- Status filtering
- Priority filtering
- Responsive layout
- Authentication and session handling

The Module 9 change is limited to the existing Status Filter and does not modify the task data schema, authentication, or localStorage structure.