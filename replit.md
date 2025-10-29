# Student Attendance Management System (SAMS)

## Overview
A simple web-based Student Attendance Management System designed for teachers to track student attendance across three sections (SEC-1, SEC-2, and SEC-3).

## Project Type
Static frontend application (HTML, CSS, JavaScript)

## Features
- Teacher login system (username: admin, password: password)
- Three sections: SEC-1, SEC-2, SEC-3
- Each section contains students with IDs from 23SW001 to 23SW170 (distributed every 3rd ID)
- Attendance marking with checkboxes
- Save attendance functionality
- Generate attendance reports
- Export attendance data as CSV

## Project Structure
- `index.html` - Main HTML file with login and attendance interface
- `script.js` - JavaScript functionality for student management and attendance tracking
- `style.css` - Styling with purple theme
- `README.md` - Basic project documentation

## Technology Stack
- Pure HTML5
- Vanilla JavaScript (no frameworks)
- CSS3 with custom properties
- Python HTTP server for static file serving

## Running the Project
The project runs a Python HTTP server on port 5000 to serve the static files.
Access the application through the Replit webview.

## Recent Changes
- 2025-10-29: Initial setup in Replit environment
  - Renamed sams_frontend.html to index.html
  - Configured Python HTTP server on port 5000
  - Set up workflow for automatic serving

## Architecture Notes
- Client-side only application (no backend)
- Data stored in browser memory (not persistent)
- Three sections with students distributed across IDs:
  - SEC-1: 23SW001, 23SW004, 23SW007... (every 3n+1)
  - SEC-2: 23SW002, 23SW005, 23SW008... (every 3n+2)
  - SEC-3: 23SW003, 23SW006, 23SW009... (every 3n)
