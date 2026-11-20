# DP Travel Admin — Premium Executive Analytics Specification

**Design direction:** A — Premium Executive  
**Density:** Full detail  
**Implementation branch:** `design/premium-executive-admin-dashboard`  
**Scope:** Admin overview and analytics API. Existing authentication, conversations page, enquiry capture, database schema and website functionality remain intact.

## 1. Experience goals

Create a polished executive dashboard that makes performance legible at a glance. Retain DP Travel's deep navy and warm gold identity, but introduce restrained blue, purple and teal accents to distinguish data series. Prioritise readable values and comparisons over decorative effects.

## 2. Visual system

- Canvas: deep navy (#071321) with a restrained radial navy-blue glow.
- Cards: layered navy surfaces (#172e46 to #0a1b2d), 16–18px radius, fine low-contrast gold border.
- Primary accent: warm gold (#e2b52e / #ffd45b).
- Supporting series: blue (#48a9f5), purple (#a879f5), teal (#27d6b0), muted coral.
- Typography: editorial Georgia for primary brand and KPI numerals; clean sans-serif for labels, controls, axes and tables.
- Gridlines: thin, low-contrast horizontal and vertical guides; axes and tick labels remain legible.
- Avoid 3D perspective on data marks. Use subtle gradients, restrained shadows and layered card surfaces to add depth without distorting data.

## 3. Page structure

1. **Header:** DP Travel Admin brand, concise subtitle, Overview and Conversations navigation, View Website, Log out.
2. **Date controls:** Today, Last 7 days, Last 30 days and Custom range. Display the active date interval. Validate that the start date is not after the end date.
3. **KPI row:** Page views, unique visitors, sessions, enquiries (leads), and visitor-to-lead conversion.
4. **Primary charts:** Visitor trend line chart and daily visits histogram.
5. **Secondary analytics:** Traffic by device donut, enquiries by service donut, chatbot engagement panel.
6. **Detail tables:** Most visited pages with ranked view totals and percentage share; lead enquiries with received date, name, phone, destination, service and status.
7. **Privacy note:** Explain anonymous visitor/session identifiers, no IP storage, and care required when exporting contact details.

## 4. Chart behaviour and numerical presentation

### Visitor trend — line chart
- X axis: calendar dates for the selected range.
- Y axis: page-view count, starting at zero with evenly spaced numeric ticks.
- Draw horizontal gridlines, vertical date guides, connected gold line, circular point markers and value labels.
- Fill below the line with a subtle gold-to-transparent gradient.
- Include every calendar date in the selected interval; missing days are zero, not omitted.
- Reduce date-label density on long ranges to avoid overlap.

### Daily visits — histogram
- X axis: calendar dates.
- Y axis: daily page-view count with numeric ticks and gridlines.
- Gold gradient bars with rounded upper corners and direct value labels when the selected interval is short enough to remain legible.
- Include zero-visit dates.

### Traffic by device — donut
- Use the stored `device_type` field from page visits.
- Show a centre total and a legend with counts and percentage share.
- Preserve unknown/empty device values as “unknown”; do not infer device type.

### Enquiries by service — donut
- Group captured enquiries by their stored service value.
- Show centre total and legend with counts and percentage share.
- Use “Unspecified” for empty service values.

### Empty and low-volume states
- Zero values remain explicit.
- Donut charts show a neutral empty ring and “0” total when no rows exist.
- Never fabricate sample values or trend deltas.

## 5. KPI definitions

- **Page views:** count of rows in `dp_page_visits` within the selected interval.
- **Unique visitors:** distinct `visitor_id` values in the selected interval.
- **Sessions:** distinct `session_id` values in the selected interval.
- **Enquiries:** count of `dp_enquiries` rows in the selected interval.
- **Visitor → lead:** distinct enquiry visitor IDs divided by unique visitors, expressed as a percentage. This is a directional conversion measure; anonymous/missing visitor IDs can affect accuracy.
- **Chatbot questions:** user-role messages in the selected interval.
- **Fallback replies:** assistant messages containing the configured fallback phrase. This is an operational proxy, not a human quality assessment.

No previous-period percentage change is shown unless a valid previous-period query is added. Do not display invented deltas.

## 6. Date filtering

- Default range: Last 7 days.
- Quick filters: Today, Last 7 days, Last 30 days.
- Custom range: native date inputs with Apply.
- API continues to receive `from` and `to` in ISO `YYYY-MM-DD` form.
- All chart series and detail tables must reflect the same selected interval.

## 7. Export

- Export CSV compatible with Excel.
- Include enquiry and conversation records returned for the selected date range.
- Clearly label the selected date interval in the filename.
- CSV may contain personal contact information; keep it within the authenticated admin workspace and store downloads securely.

## 8. Responsive behaviour

- Desktop: five KPI cards; two primary chart columns; three secondary panels.
- Tablet: KPI cards wrap to three columns; primary charts stack; secondary panels wrap.
- Mobile: two KPI columns, one chart per row, compact date controls, horizontally scrollable detail tables.
- Canvas charts must redraw on resize and remain legible at high-DPI display settings.

## 9. Data and implementation changes

- Extend `GET /api/admin-data` with:
  - `devices`: visit counts grouped by `device_type`.
  - `services`: enquiry counts grouped by `service`.
- Retain existing response fields for stats, daily visits, topics, top pages, messages and leads.
- Keep the existing admin login/session mechanism and logout endpoint.
- Do not modify public content, website routing, chat response logic, or the conversations experience in this dashboard design pass.

## 10. Acceptance criteria

- [ ] Date quick filters and custom dates update all KPIs, charts and tables.
- [ ] Both Cartesian charts show readable X/Y axes, tick values and gridlines.
- [ ] Line chart and histogram include zero-visit dates.
- [ ] Every chart displays numerical totals; donut legends display counts and percentages.
- [ ] Device and service charts use only values stored in the database.
- [ ] Empty states are intentional and never use fabricated data.
- [ ] KPI definitions and conversion calculation are consistent with API response.
- [ ] CSV export remains available and includes the selected period.
- [ ] Login, logout, Conversations navigation and existing enquiry tracking continue to work.
- [ ] Desktop, tablet and mobile layouts remain usable.
- [ ] Production deployment is not performed until the user explicitly approves merging the PR.
