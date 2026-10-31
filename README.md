# Bonus Calculator Demo
### Less manual checking. More clarity.

A core administrative workflow prototype built through AI-assisted development: load fictional data, apply consistent rules, understand results, and export a report.

> Review draft. All six automated Node.js tests pass. Browser checks and PNG visual inspection remain pending. No live demo is deployed.

## The problem
Rule-based administrative work involves more than calculating a number. Inputs need checking, eligibility needs explaining, and individual results need consolidating. This prototype brings those steps into one repeatable workflow without attempting to become a complete payroll product.

## Try it locally
Serve the project directory using a static web server. With Python installed, run `python -m http.server 8000`, then open `http://localhost:8000`. Do not open the HTML directly: JavaScript modules require a server.

Load the sample team, edit revenue or quality, calculate, then export CSV or a PNG report. No package installation is needed to use the browser app. Inputs remain in memory only; refreshing clears changes.

## Core workflow
- Six fictional employees, identified by first names and sample IDs.
- Decimal eligible project revenue and quality inputs.
- Validation and explainable eligibility decisions.
- Group totals based on individually rounded bonuses.
- CSV report with inputs, results, explanations, period, rule version, and total.
- PNG report with first names, IDs, revenue, quality, rates, bonuses, eligibility, explanations, summary totals, and fictional-data label.
- Changing inputs clears results and disables both exports until recalculation.

PNG is generated from the calculated data using browser Canvas. It is a purpose-designed report image, not a device screenshot or a capture of the webpage. It includes all six records regardless of screen position and requires no third-party capture library.

## Fictional rules
Example Office Services · September 2026 · HKD · `demo-2.0`.

| Quality | Eligible project revenue | Rate |
|---|---|---:|
| Below 90 | Any | 0% |
| At least 90 | Below HK$100,000.00 | 0% |
| At least 90 | HK$100,000.00 to below HK$500,000.00 | 8% |
| At least 90 | HK$500,000.00 or more | 12% |

The rate applies to all eligible revenue, not just the amount above a threshold. Currency inputs accept up to two decimal places and are converted to integer cents. Calculate each bonus to the nearest cent, with half-cent ties up; sum rounded individual bonuses. With these particular rates, exact half-cent ties do not occur, but the rounding policy is explicit.

The input ceiling is HK$1,000,000,000.00 per record to bound integer calculations. This is a demo validation limit, not a bonus cap. Quality accepts 0–100 with at most one decimal place. Enter plain decimal numbers without commas or currency symbols.

Expected bonuses: Avery HK$0.00; Jordan HK$8,000.00; Casey HK$34,301.24; Morgan HK$60,000.00; Riley HK$0.00; Taylor HK$149,481.47. Expected total: HK$251,782.71; four eligible employees.

## Design choices
Plain HTML, CSS, and modular JavaScript keep the single-page prototype lightweight. Rules, calculations, rendering, and report exports have distinct responsibilities. Record text uses DOM text properties rather than HTML interpolation. CSV fields are quoted, embedded quotes escaped, and formula-like text prefixed; spreadsheet-specific checks remain necessary.

## Possible adaptations — not implemented
Role-based eligibility; service-period prorating; alternative qualification routes; approved exceptions; different periods; custom report fields. These require separate requirements and verification, not just a toggle in this demo.

## My role and AI assistance
I defined the administrative problem, confidentiality boundaries, core workflow, first-name-only samples, realistic monetary inputs, and the need for image export. AI proposed the fictional rules and assisted with implementation, tests, and documentation. I do not claim every line was manually written.

The six automated tests were run by the AI assistant in Node.js and passed. My own browser and visual checks remain pending; automated results are not a claim of complete verification. No measured time savings or accuracy improvements are claimed.

## Files
`rules.js`: fictional rules and samples. `calculator.js`: validation, integer-cent calculations, and CSV serialization. `app.js`: interaction and PNG rendering. `index.html` / `styles.css`: interface. `calculator.test.js`: tests. `package.json`: ES modules and test command.

## Verification status
With Node.js 20+ installed, run `npm test`. Automated cases cover sample outputs, totals, monetary thresholds, quality thresholds, rounding, invalid data, and basic CSV handling. All six automated tests passed in Node.js in the review environment. This does not verify browser interactions, downloads, or PNG appearance.

Manual checks, all pending:
- [ ] Confirm six sample results, four eligible, and HK$251,782.71 total.
- [ ] Validate empty, negative, malformed, excessive-precision, and excessive-value inputs.
- [ ] Confirm editing clears results and disables both exports.
- [ ] Confirm reset restores all samples.
- [ ] Compare PNG and CSV with on-screen results, including decimal cents.
- [ ] Confirm PNG includes all records on mobile and desktop, with no clipped content.
- [ ] Confirm exported files download in intended browsers.
- [ ] Check CSV in the intended spreadsheet application.
- [ ] Check keyboard navigation, focus, announcements, narrow screens, and console errors.
- [ ] Confirm generated PNG text and calculations are legible.

## Privacy and limitations
All data and rules are fictional and independently authored for this demo. No work-repository files were copied. Do not enter real data. The app has no database, persistence, analytics, external calculation API, authentication, approval flow, or audit trail. Hosting providers may retain normal access logs. Downloaded reports remain on the visitor's device.

This is not payroll software, compensation advice, or a production-ready employee system. There is no tax or statutory entitlement calculation. Browser-visible rules cannot be treated as confidential. Image exports are fixed-layout reports designed for the six-record demo, not an unlimited reporting engine.

A screenshot and verified live link will be added later.
