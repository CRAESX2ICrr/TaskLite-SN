# TaskLite App

TECHSTACK
FRONTEND    - REACT (NEXTjs), TAILWIND
BACKEND     - NEXTjs, NODE.js (runsunder)
DATABASE    - MySQL

ICONS       - LUCIDE 
UI BG       - REACTBITS


tasklite_SN/
├── src/
│   ├── app/
│   │   ├── page.js                 # Main homepage (UI layout + wiring)
│   │   ├── about/
│   │   │   └── page.js             # About page
│   │   ├── api/
│   │   │   ├── tasks/
│   │   │   │   ├── route.js        # GET + POST (list & create tasks)
│   │   │   │   └── [id]/
│   │   │   │       └── route.js    # PUT + DELETE (update & delete task)
│   │
│   ├── components/
│   │   ├── TaskForm.jsx            # Create new task
│   │   ├── TaskFilter.jsx          # Search + filter controls
│   │   ├── TaskList.jsx            # Table container for tasks
│   │   └── TaskRow.jsx             # Single task row (edit/delete UI)
│   │
│   ├── hooks/
│   │   └── useTasks.js             # All frontend logic (CRUD + state)
│   │
│   ├── lib/
│   │   └── db.js                   # MySQL connection + query helper
│
├── .env.local                      # Database credentials
├── package.json                    # Dependencies + scripts
└── README.md                       # Project documentation