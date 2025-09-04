# Design Document — React URL Shortener (Client-only)

## Architecture
- React + react-router-dom
- Material UI for UI
- localStorage for persistence
- Routes:
  - `/` shortener
  - `/stats` stats & logs
  - `/:shortcode` redirector

## Data
- DB key: `url_shortener_db_v1`
- Entry: { shortcode, longUrl, createdAt, expiresAt|null, clicks[] }
- Logs key: `url_shortener_logs_v1`

## Decisions
- Client-only for simplicity in eval
- Shortcode validation: `/^[a-zA-Z0-9_-]{3,20}$/`
- Default validity 30 min when omitted
- Random 6-char codes with collision retry

## Testing
- Create links, visit `/:code`, check `/stats`
- Try short validity (e.g., 1) and re-check redirect after expiry
