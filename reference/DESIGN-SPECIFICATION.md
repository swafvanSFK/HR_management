# HRMS Visual Reference Specification

Use the supplied screenshots as the source of truth for the visual design. The original video is a 1280x720, 60fps, 58.65-second product presentation. The screenshots are sampled every 2 seconds; inspect the full set in sequence.

## Branding restriction
Reproduce the interface design language only. Do NOT reuse the reference product's name, logo, wordmark, brand assets, people names, proprietary copy, or other identity. Create a new HRMS brand and neutral fictional employee data.

## Visual system observed
- Overall canvas: very light warm ivory/cream with a subtle pale-yellow glow/gradient, especially toward edges/corners. Avoid stark pure-white or blue enterprise themes.
- Main application surface: large, centered, softly rounded light panel with generous outer margins; the presentation often places the application against a warm gradient background.
- Composition: modular dashboard made of separate rounded cards in a tightly aligned grid. Cards have soft low-contrast shadows/borders, generous padding, and consistent gaps. The visual hierarchy comes from card size and placement, not heavy borders.
- Accent: warm golden/mustard yellow for selected rows, progress fills, small labels, active controls, and chart marks.
- Contrast: near-black/charcoal pill buttons and occasional dark charcoal information panels; body copy is dark gray. Supporting labels are muted gray.
- Typography: clean modern sans-serif, understated weights, compact labels, large but not overly bold greetings and metrics.
- Controls: compact pill-shaped dark or light buttons, small rounded filters, restrained icons, minimal input chrome.
- Data visualisation: minimal vertical bars, fine rules, yellow progress tracks, circular time/progress ring with a yellow segment, and uncluttered calendar/table views.
- People: small rounded/circular employee portrait, compact identity blocks, clean employee list rows.
- Tables: broad whitespace, subtle separators, one highlighted yellow row/state, compact metadata, small status pills. Avoid dense spreadsheet styling.
- Side panels: dark charcoal task/onboarding panel with stacked checklist rows and small yellow indicators, used as a contrast anchor.

## Layout patterns visible in the reference
1. Intro/brand reveal on a warm ivory-to-yellow gradient.
2. Dashboard shell with small brand area at top-left, compact top navigation/actions, and a large rounded app canvas.
3. Dashboard grid: employee profile card; progress/weekly activity card; circular time-tracker card; dark onboarding/checklist card; small metric cards; timeline/calendar strip.
4. People directory: compact page title and filters above a wide table, with one yellow-highlighted row and small status pills.
5. Payroll-style detail: narrow left navigation/list, wide central data table or grid, and a right employee/detail panel.
6. Calendar/timeline: horizontal date scale, thin grid lines, yellow schedule bars, small dark floating labels.
7. Detail view: large information panel with compact accordion/list rows and a contextual schedule/detail area.

## Motion language observed in the presentation
Treat motion as restrained, smooth product-demo motion, not playful motion. Recreate the visual transitions indicated by the sequence of screenshots:
- warm background and brand/title reveal;
- application shell fades/settles into view;
- dashboard modules appear as a composed grid;
- smooth camera-like push/zoom into selected cards or page regions;
- crossfade/slide between dashboard, people list, calendar, and payroll/detail screens;
- content panels and cards subtly scale/translate as focus changes;
- progress rings/bars and chart marks reveal progressively;
- yellow highlight states and dark tooltip/pill labels appear with short, clean transitions.

Important: screenshots show appearance and layout, not exact keyframe curves or easing values. Do not claim pixel-perfect recreation of motion from still frames alone. Use the source video in a video-capable tool if available to inspect timing. Otherwise implement tasteful approximations: 250–450ms UI transitions, 500–900ms staged page reveals, ease-out/ease-in-out easing, and staggered card reveals around 50–90ms apart. Use GSAP for coordinated camera-like zooms and Framer Motion for component/layout transitions. Respect prefers-reduced-motion.

## Implementation direction
- Desktop-first at 1280x720 and 1440px wide; responsive adaptations should preserve the same visual identity.
- Build design tokens first, then shell, dashboard, directory/table, calendar, and detail/payroll patterns. Reuse these patterns across HR modules.
- Use CSS Grid/Flexbox; use SVG for crisp progress rings and simple charts.
- Do not use generic blue admin templates, heavy gradients, glassmorphism, thick borders, excessive shadows, oversized icons, or bouncy animation.
- The attached screenshots are visual evidence. When a written description conflicts with a screenshot, prioritize the screenshot for layout, spacing, and appearance.
