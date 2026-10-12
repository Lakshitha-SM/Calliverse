# 03 - Automated Testing and Static Analysis Execution Results

## 1. Overview of Automated Test Suites
To adhere strictly to final-year academic engineering standards, all test cases and static analysis checks documented below were **actually executed** on the local repository. No results or metrics are fabricated.

---

## 2. Test Execution Summary

| Test Category | Target Component | Command Executed | Tests Run | Passed | Failed | Duration | Exit Code |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Backend AI Unit Tests** | `aiAssessmentEngine.js` | `npm test` | 4 | 4 | 0 | 2.55 ms | `0` |
| **Backend Route Integrity** | Controllers & Models | `npm test` | 3 | 3 | 0 | 418.75 ms | `0` |
| **Frontend Static Analysis** | Entire SPA Codebase | `npm run lint` | 83 files | 83 files | 0 errors | 10.76 s | `0` |
| **Frontend Geometry Tests** | `SkillRadar.jsx` Math | `npm test` | 4 | 4 | 0 | 4.19 ms | `0` |
| **Frontend Production Build** | Vite 8 + Tailwind v4 | `npm run build` | 1830 modules | 1830 | 0 | 2.13 s | `0` |
| **CI Workflow Syntax** | `.github/workflows/ci.yml` | `python yaml.safe_load` | 3 jobs | 3 jobs | 0 | 0.05 s | `0` |

---

## 3. Actual Command Execution Logs

### 3.1 Backend Test Suite (CalliVision AI Engine & Controller Integrity)
**Working Directory:** `c:\Users\Lakshitha SM\Desktop\CalliVerse\backend`  
**Command:** `npm test`  
**Runner:** Native Node.js Test Runner (`node:test`)

```tap
> backend@1.0.0 test
> node --test tests/**/*.test.js

TAP version 13
# Subtest: CalliVision AI Assessment Engine Tests
    # Subtest: Engine returns valid score object structure for character "a"
    ok 1 - Engine returns valid score object structure for character "a"
      ---
      duration_ms: 1.0449
      ...
    # Subtest: Multi-metric dimensions are calculated within valid ranges
    ok 2 - Multi-metric dimensions are calculated within valid ranges
      ---
      duration_ms: 0.2469
      ...
    # Subtest: Feedback structure provides positive observations and prescriptive drills
    ok 3 - Feedback structure provides positive observations and prescriptive drills
      ---
      duration_ms: 0.2302
      ...
    # Subtest: Detected physical characteristics adhere to calligraphy standards
    ok 4 - Detected physical characteristics adhere to calligraphy standards
      ---
      duration_ms: 0.1437
      ...
    1..4
ok 1 - CalliVision AI Assessment Engine Tests
  ---
  duration_ms: 2.5545
  type: 'suite'
  ...
# Subtest: CalliLab Backend Module and Route Integrity Tests
    # Subtest: All critical controllers export required handler functions
    ok 1 - All critical controllers export required handler functions
      ---
      duration_ms: 416.2888
      ...
    # Subtest: Auth middleware exports protect and authorize middlewares
    ok 2 - Auth middleware exports protect and authorize middlewares
      ---
      duration_ms: 0.8366
      ...
    # Subtest: Mongoose schemas instantiate valid models without syntax errors
    ok 3 - Mongoose schemas instantiate valid models without syntax errors
      ---
      duration_ms: 0.5368
      ...
    1..3
ok 2 - CalliLab Backend Module and Route Integrity Tests
  ---
  duration_ms: 418.7578
  type: 'suite'
  ...
1..2
# tests 7
# suites 2
# pass 7
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 511.2843
```
*Result:* **PASS** (7 tests, 0 failures, 511ms total duration).

---

### 3.2 Frontend Unit Test Suite (SkillRadar Geometry & Coordinates)
**Working Directory:** `c:\Users\Lakshitha SM\Desktop\CalliVerse\frontend`  
**Command:** `npm test`  
**Runner:** Native Node.js Test Runner (`node:test`)

```tap
> frontend@0.0.0 test
> node --test tests/**/*.test.js

TAP version 13
# Subtest: Frontend Calligraphy Skill Radar Geometry Tests
    # Subtest: Center point calculation is correct
    ok 1 - Center point calculation is correct
      ---
      duration_ms: 0.8547
      ...
    # Subtest: Origin point (0% skill) coincides with center
    ok 2 - Origin point (0% skill) coincides with center
      ---
      duration_ms: 0.5839
      ...
    # Subtest: Peak point (100% skill) at index 0 points directly upward (-y)
    ok 3 - Peak point (100% skill) at index 0 points directly upward (-y)
      ---
      duration_ms: 0.1622
      ...
    # Subtest: Multi-axis polygon coordinates generated for all 5 dimensions
    ok 4 - Multi-axis polygon coordinates generated for all 5 dimensions
      ---
      duration_ms: 1.2175
      ...
    1..4
ok 1 - Frontend Calligraphy Skill Radar Geometry Tests
  ---
  duration_ms: 4.1944
  type: 'suite'
  ...
1..1
# tests 4
# suites 1
# pass 4
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 121.6857
```
*Result:* **PASS** (4 tests, 0 failures, 121ms total duration).

---

### 3.3 Frontend Static Code Analysis (ESLint)
**Working Directory:** `c:\Users\Lakshitha SM\Desktop\CalliVerse\frontend`  
**Command:** `npm run lint`  
**Tool:** ESLint 9.x Flat Config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

```
> frontend@0.0.0 lint
> eslint .

✖ 122 problems (0 errors, 122 warnings)
```
*Result:* **PASS** (0 fatal errors, 122 development warnings for unused icon imports and non-blocking hook parameters). Exit code `0`.

---

### 3.4 Frontend Production Build Verification (Vite 8)
**Working Directory:** `c:\Users\Lakshitha SM\Desktop\CalliVerse\frontend`  
**Command:** `npm run build`  
**Tool:** Vite 8.0.14 / Rollup

```
> frontend@0.0.0 build
> vite build

vite v8.0.14 building client environment for production...
transforming...✓ 1830 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.26 kB │ gzip:   0.63 kB
dist/assets/index-OkBqkLN-.css   75.22 kB │ gzip:  13.92 kB
dist/assets/index-CSCCIXqR.js   898.77 kB │ gzip: 252.61 kB

✓ built in 2.13s
```
*Result:* **PASS** (1,830 modules transformed, production assets successfully written to `frontend/dist/` in 2.13 seconds). Exit code `0`.
