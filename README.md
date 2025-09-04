# FrontendTestSubmission — React URL Shortener (Client-only)

## Overview
Client-only React application using Material UI and localStorage.
Features:
- Up to 5 URLs per submission
- Optional custom shortcodes (validated)
- Default validity: 30 minutes
- Client-side uniqueness
- Redirect route `/:shortcode`
- Stats + click logs
- Client-side logging middleware (localStorage-backed)

## Requirements
- Node.js & npm

## Run
```bash
cd FrontendTestSubmission
npm install
npm start
```
Then open http://localhost:3000

## Notes
This demo is single-user (browser-local). For multi-user & public links, add a backend.
