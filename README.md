# TaskLite App

## TECHSTACK

FRONTEND    - REACT (NEXTjs), TAILWIND  
BACKEND     - NEXTjs, NODE.js (runs under)  
DATABASE    - MySQL  

ICONS       - LUCIDE  
UI BG       - REACTBITS

## Project Structure

```bash
tasklite_SN/
├── src/
│   ├── app/
│   │   ├── page.js              # Main homepage (UI + wiring)
│   │   ├── about/
│   │   │   └── page.js          # About page
│   │   ├── api/
│   │   │   ├── tasks/
│   │   │   │   ├── route.js     # GET, POST (list + create)
│   │   │   │   └── [id]/
│   │   │   │       └── route.js # PUT, DELETE (update + delete)
│
│   ├── components/
│   │   ├── TaskForm.jsx         # Create task
│   │   ├── TaskFilter.jsx       # Search & filters
│   │   ├── TaskList.jsx         # Task table
│   │   └── TaskRow.jsx          # Single task row
│
│   ├── hooks/
│   │   └── useTasks.js          # State + CRUD logic
│
│   ├── lib/
│   │   └── db.js                # MySQL connection
│
├── .env.local                  # Environment variables
├── package.json               # Dependencies
└── README.md                  # Documentation