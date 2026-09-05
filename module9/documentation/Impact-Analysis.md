# Module 9 Impact Analysis

## Change Request

**CR-M9-01 — Add Overdue Option to the Status Filter**

**Maintenance Type:** Perfective Maintenance

**Target Version:** 1.1.0

---

## 1. Impact Analysis Matrix

| Area | Impact Level | Analysis |
|---|---|---|
| Architecture | Medium | The existing task filtering flow will be extended to support Overdue as a derived filter condition. |
| UI / Design | Medium | The existing status filter will receive an additional Overdue option without redesigning the interface. |
| Components / Code | Medium | Existing filtering logic must recognize Overdue and evaluate due date and completion status. |
| LocalStorage / Data | Low | No schema change is expected because existing tasks already contain dueDate and status fields. |
| Testing | Medium | New automated tests and manual test cases are required, followed by regression testing. |
| Build / CI | Low | Existing npm test/build commands and GitHub Actions workflow should remain unchanged. |
| Documentation | Medium | Module 9 change request, impact analysis, architecture, implementation, testing, and release evidence must be documented. |

---

## 2. Architecture Impact

The change extends the existing task filtering process.

The current architecture already supports task status and filtering. The evolution adds Overdue as a derived filtering condition based on:

- Task due date
- Current date
- Task completion status

The existing application architecture will be preserved. No new application layer or major component is required.

---

## 3. UI / Design Impact

The existing status filtering interface will be extended with an **Overdue** option.

The current visual design, layout, navigation, colors, typography, and responsive behavior will be preserved.

The change is intended to be an incremental improvement rather than a redesign.

---

## 4. Component / Code Impact

The existing filtering implementation will be modified to support the new Overdue condition.

The Overdue condition will identify tasks where:

1. The due date has already passed.
2. The task status is not Completed.

Existing filtering behavior for Pending, In Progress, and Completed must remain unchanged.

Search and Priority filtering must also continue to work.

---

## 5. LocalStorage / Data Impact

No changes to the existing localStorage task schema are expected.

The existing task data already contains the properties required to determine whether a task is overdue:

- `dueDate`
- `status`

Existing saved tasks should therefore remain compatible with the evolved application.

---

## 6. Testing Impact

The change requires both automated and manual testing.

### Automated Testing

The existing Module 8 automated tests must continue to pass.

At least two meaningful Vitest tests will be added or updated to verify:

- Overdue tasks are included when the Overdue filter is selected.
- Completed tasks with past due dates are excluded from the Overdue filter.

### Manual Testing

Manual testing will cover the new Overdue filter and regression of existing functionality.

Regression areas include:

- Add/Create
- Display
- Edit
- Delete
- Search
- Validation
- Delete Confirmation
- Persistence
- Responsive behavior
- Existing status filters
- Priority filter

---

## 7. Build / CI Impact

The existing build and CI process will be preserved.

The project must successfully execute:

```text
npm run test:run
npm run build

8. Documentation Impact

The following Module 9 documentation will be created or updated:

Change Request CR-M9-01
Impact Analysis
Updated Architecture
Implementation evidence
Updated test cases
Test and build results
GitHub Actions evidence
Release notes
Module 9 README section
9. Compatibility Assessment

The planned evolution is backward-compatible.

No existing task records need to be converted because the Overdue condition uses existing task properties.

Existing CRUD, search, status filtering, priority filtering, authentication, session handling, and persistence should remain unchanged.

10. Risk Assessment
Overall Risk: Low to Medium

The primary risk is regression in the existing filtering behavior.

This risk will be controlled through:

Existing automated tests
New Module 9 automated tests
Manual test cases
Regression testing
Successful production build
GitHub Actions verification

No database migration or localStorage schema migration is expected.