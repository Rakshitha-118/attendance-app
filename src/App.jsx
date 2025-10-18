
import React, { useState, useEffect } from "react";

// ====================
// Constants & Helpers
// ====================

const BG_IMAGE = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&s=4b0d8b6b3a6d0b6f7a9a5e9b5a1b0fc6";
const STORAGE_KEY = "attendance_app_final";

const YEARS = [
  { name: "1st Year", code: "4SF25" },
  { name: "2nd Year", code: "4SF24" },
  { name: "3rd Year", code: "4SF23" },
  { name: "4th Year", code: "4SF22" },
];

const SUBJECTS_BY_YEAR = {
  "4SF25": [
    { code: "HS101", name: "Engineering Mathematics I" },
    { code: "CS101", name: "Problem Solving & Programming" },
    { code: "PH101", name: "Physics for Engineers" },
  ],
  "4SF24": [
    { code: "CS201", name: "Data Structures" },
    { code: "CS202", name: "Discrete Mathematics" },
    { code: "CS203", name: "Digital Logic" },
  ],
  "4SF23": [
    { code: "CS301", name: "Algorithms" },
    { code: "CS302", name: "Computer Networks" },
    { code: "CS303", name: "Software Engineering" },
  ],
  "4SF22": [
    { code: "CS401", name: "Advanced ML" },
    { code: "CS402", name: "Cloud Computing" },
    { code: "CS403", name: "Mobile App Development" },
  ],
};

// 65 unique student names
const STUDENT_NAMES = [
  "Alice","Bob","Charlie","David","Eve","Frank","Grace","Hannah","Ivy","Jack",
  "Kira","Leo","Mia","Nina","Oscar","Paula","Quinn","Ravi","Sara","Tom",
  "Uma","Vikram","Will","Xena","Yara","Zane","Aman","Bina","Chirag","Devika",
  "Eshan","Fiona","Gaurav","Hitesh","Isha","Jatin","Kajal","Lalit","Meera","Nikhil",
  "Om","Priya","Quincy","Rohan","Sneha","Tarun","Usha","Varun","Wendy","Xavier",
  "Yash","Zoya","Ankit","Bhavna","Chetan","Divya","Eklavya","Farah","Gitanjali","Harsh",
  "Irfan","Jaya","Kabir","Lina","Mohit" // Total 65 names
];

// Generate 65 students dynamically across 4 years
function generateStudents() {
  const students = [];
  let nameIndex = 0;
  // Distribution: 17 + 17 + 17 + 14 = 65 students
  const studentsPerYear = [17, 17, 17, 14]; 

  YEARS.forEach((year, yearIndex) => {
    const count = studentsPerYear[yearIndex];
    for (let i = 0; i < count; i++) {
      if (nameIndex >= STUDENT_NAMES.length) break; 

      const name = STUDENT_NAMES[nameIndex];
      // Student ID uses year code and index within the year
      const id = `${year.code}${String(i + 1).padStart(3, "0")}`;
      // Username is name + original nameIndex + 1 (for unique login)
      const username = name.toLowerCase().replace(/\s/g, "") + (nameIndex + 1);
      
      students.push({ id, name, yearCode: year.code, username });
      nameIndex++;
    }
  });
  return students;
}

const STUDENTS = generateStudents();

// Faculty user
const FACULTY_USER = { username: "faculty", password: "faculty", role: "faculty", name: "Mr.Kumar", id: "FAC1001" };

// USERS for login: faculty + students
const USERS = [FACULTY_USER, ...STUDENTS.map(s => ({
  username: s.username,
  password: s.username,
  role: "student",
  name: s.name,
  id: s.id,
  yearCode: s.yearCode
}))];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// CRITICAL FIX: Ensure full student list is used, even if local storage exists, 
// to prevent issues if a previous run saved an incomplete list.
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const storedState = JSON.parse(raw);
    return { 
      ...storedState, 
      students: STUDENTS, // Overwrite potentially incomplete student list with the correct, full list
      subjects: SUBJECTS_BY_YEAR 
    };
  }
  // Initial state (no local storage)
  return { students: STUDENTS, subjects: SUBJECTS_BY_YEAR, attendance: {} };
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ====================
// App
// ====================

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [appState, setAppState] = useState(loadState);
  const [message, setMessage] = useState("");

  useEffect(() => saveState(appState), [appState]);

  function login(username, password) {
    const u = USERS.find(u => u.username === username && u.password === password);
    if (!u) { setMessage("Invalid credentials"); return; }
    setUser(u);
    setMessage("");
  }

  function logout() {
    setUser(null);
    setPage("dashboard");
  }

  return (
    <div>
      <GlobalStyles />
      {!user ? (
        <LoginPage onLogin={login} message={message} />
      ) : (
        <MainLayout user={user} page={page} setPage={setPage} onLogout={logout}>
          {page === "dashboard" && <Dashboard user={user} appState={appState} />}
          {page === "subjects" && <SubjectsPage user={user} />}
          {page === "attendance" && <AttendancePage user={user} appState={appState} setAppState={setAppState} />}
          {page === "profile" && <ProfilePage user={user} />}
        </MainLayout>
      )}
    </div>
  );
}

// ====================
// Login Page
// ====================

function LoginPage({ onLogin, message }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-page" style={{ backgroundImage: `url(${BG_IMAGE})` }}>
      <div className="login-card">
        <h1>Attendance Portal</h1>
        <form onSubmit={e => { e.preventDefault(); onLogin(username, password); }}>
          <input 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            className="input-field"
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="input-field"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
        {/* FIX: Clarified the username hint to reflect the actual generated format. */}
        <p className="hint-text">
          Student login: **Name + Index** (e.g., alice1, bob2, ..., ravi18, isha39). 
          Password is the same as the username. Faculty: faculty/faculty
        </p>
      </div>
    </div>
  );
}

// ====================
// Main Layout
// ====================

function MainLayout({ children, user, page, setPage, onLogout }) {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="user-info">{user.name} ({user.role})</div>
        <div className="nav-links">
          <button className={`nav-button ${page==="dashboard"?"active":""}`} onClick={()=>setPage("dashboard")}>Dashboard</button>
          <button className={`nav-button ${page==="subjects"?"active":""}`} onClick={()=>setPage("subjects")}>Subjects</button>
          <button className={`nav-button ${page==="attendance"?"active":""}`} onClick={()=>setPage("attendance")}>Attendance</button>
          <button className={`nav-button ${page==="profile"?"active":""}`} onClick={()=>setPage("profile")}>Profile</button>
          <button onClick={onLogout} className="nav-button logout-button">Logout</button>
        </div>
      </nav>
      <main className="content-main">{children}</main>
    </div>
  );
}

// ====================
// Dashboard
// ====================

function Dashboard({ user, appState }) {
  const today = todayKey();
  const yearName = YEARS.find(y => y.code === user.yearCode)?.name || 'N/A';
  
  if (user.role === "student") {
    const studentSubjects = SUBJECTS_BY_YEAR[user.yearCode] || [];
    return (
      <div className="page-content">
        <h2 className="text-xl font-bold">Welcome, {user.name}</h2>
        <p className="text-gray-600 mb-4">Your current year: **{yearName}**</p>
        
        <h3 className="text-lg font-semibold border-b pb-1 mt-4">Attendance Status for Today ({today})</h3>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          {studentSubjects.map(sub=>{
            const s = (appState.attendance[sub.code]?.[today] || {})[user.id];
            const status = s ? s.status : "Absent";
            const statusColor = status === "Present" ? "text-green-600" : "text-red-600";
            return (
              <li key={sub.code}>
                **{sub.name}**: 
                <span className={statusColor}> {status}</span>
                {s?` (Marked at: ${s.time})`:''}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="page-content">
        <h2 className="text-xl font-bold">Faculty Dashboard</h2>
        <p className="text-gray-600">Welcome, {user.name}. Please use the **Attendance** page to mark student attendance for your classes.</p>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800">Note:</h4>
          <p className="text-sm text-yellow-700">The attendance data shown on this portal is stored locally in your browser for demonstration purposes. Resetting your browser's local storage will clear all recorded attendance data.</p>
        </div>
      </div>
    );
  }
}

// ====================
// Subjects Page
// ====================

function SubjectsPage({ user }) {
  // Removed unused userSubjects variable. Logic below correctly filters by user.yearCode.
  // const userSubjects = SUBJECTS_BY_YEAR[user.yearCode] || []; 

  return (
    <div className="page-content">
      <h2 className="text-xl font-bold mb-4">Course Subjects</h2>
      
      {user.role === "faculty" && 
        <p className="text-gray-600 mb-4">As faculty, you are assigned to subjects across years (predefined in this demo).</p>
      }
      {user.role === "student" && 
        <p className="text-gray-600 mb-4">These are the subjects for your **{YEARS.find(y => y.code === user.yearCode)?.name}**.</p>
      }

      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject Name</th>
            {user.role === "faculty" && <th>Year Code</th>}
          </tr>
        </thead>
        <tbody>
          {YEARS.map(year => (
            SUBJECTS_BY_YEAR[year.code].map(sub => (
              (user.role === "faculty" || user.yearCode === year.code) && (
                <tr key={sub.code}>
                  <td>{sub.code}</td>
                  <td>{sub.name}</td>
                  {user.role === "faculty" && <td>{year.code}</td>}
                </tr>
              )
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ====================
// Attendance Page
// ====================

function AttendancePage({ user, appState, setAppState }) {
  const today = todayKey();
  
  // FIX: Move hooks outside the conditional return block to obey Rules of Hooks.
  const initialYear = user.role === "student" ? user.yearCode : YEARS[0].code;
  const [selectedYear, setSelectedYear] = useState(initialYear);
  
  const subjectsForYear = SUBJECTS_BY_YEAR[selectedYear] || [];
  const [selectedSubject, setSelectedSubject] = useState(subjectsForYear[0]?.code || "");

  // --- STUDENT VIEW (Only sees their data) ---
  if (user.role === "student") {
    const studentSubjects = SUBJECTS_BY_YEAR[user.yearCode] || [];
    return (
      <div className="page-content">
        <h2 className="text-xl font-bold mb-4">My Detailed Attendance Status</h2>
        <p className="text-gray-600 mb-6">You can only view your own recorded attendance status for **{today}**.</p>
        
        <table className="data-table max-w-lg">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Status ({today})</th>
                </tr>
            </thead>
            <tbody>
                {studentSubjects.map(sub => {
                    const s = (appState.attendance[sub.code]?.[today] || {})[user.id];
                    const status = s ? s.status : "Absent";
                    const time = s ? ` (Marked at: ${s.time})` : '';
                    const statusColor = status === "Present" ? "text-green-600 font-medium" : "text-red-600 font-medium";

                    return (
                        <tr key={sub.code}>
                            <td>{sub.name}</td>
                            <td><span className={statusColor}>{status}</span>{time}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>
    );
  }
  
  // --- FACULTY VIEW (Sees all students in the selected year) ---
  const studentsForYear = appState.students.filter(s=>s.yearCode===selectedYear);

  const toggleAttendance = (studentId) => {
    // Only faculty can toggle attendance
    if(user.role!=="faculty") return; 
    
    const attendance = {...appState.attendance};
    // Ensure nested objects exist before trying to access them
    attendance[selectedSubject] = attendance[selectedSubject] || {};
    attendance[selectedSubject][today] = attendance[selectedSubject][today] || {};
    
    const current = attendance[selectedSubject][today][studentId];
    // Toggle status between Present and Absent
    attendance[selectedSubject][today][studentId] = { 
      status: current?.status==="Present"?"Absent":"Present", 
      time: new Date().toLocaleTimeString() 
    };
    setAppState({...appState, attendance});
  };

  return (
    <div className="page-content">
      <h2 className="text-xl font-bold mb-4">Mark Daily Attendance ({today})</h2>
      
      <div className="flex space-x-4 mb-4 items-center">
        <label htmlFor="year-select" className="font-medium">Select Year:</label>
        <select 
          id="year-select"
          value={selectedYear} 
          onChange={e=>{
            setSelectedYear(e.target.value); 
            // Also update subject selection when year changes
            setSelectedSubject(SUBJECTS_BY_YEAR[e.target.value]?.[0]?.code || "")
          }} 
          className="select-field"
        >
          {YEARS.map(y=> <option key={y.code} value={y.code}>{y.name}</option>)}
        </select>

        <label htmlFor="subject-select" className="font-medium">Select Subject:</label>
        <select 
          id="subject-select"
          value={selectedSubject} 
          onChange={e=>setSelectedSubject(e.target.value)}
          className="select-field"
        >
          {subjectsForYear.map(s=> <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th className="w-1/6">ID</th>
            <th className="w-1/3">Name</th>
            <th className="w-1/4">Status (Today)</th>
            <th className="w-1/6">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentsForYear.map(st=>{
            const s = (appState.attendance[selectedSubject]?.[today] || {})[st.id];
            const status = s ? s.status : "Absent";
            const statusColor = status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
            
            return (
              <tr key={st.id}>
                <td>{st.id}</td>
                <td>{st.name}</td>
                <td>
                  <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${statusColor}`}>
                    {status}
                  </span>
                  {s?` @ ${s.time}`:''}
                </td>
                <td>
                  <button 
                    onClick={()=>toggleAttendance(st.id)} 
                    className="toggle-button"
                  >
                    {status === "Present" ? "Mark Absent" : "Mark Present"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ====================
// Profile Page
// ====================

function ProfilePage({ user }) {
  const yearName = user.role === 'student' ? (YEARS.find(y => y.code === user.yearCode)?.name || 'N/A') : 'N/A';
  
  return (
    <div className="page-content max-w-lg bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">User Profile</h2>
      
      <div className="space-y-4">
        <p className="detail-item">
          <span className="font-semibold text-gray-600 w-24 inline-block">Name:</span> 
          <span className="text-gray-800">{user.name}</span>
        </p>
        <p className="detail-item">
          <span className="font-semibold text-gray-600 w-24 inline-block">Role:</span> 
          <span className="text-gray-800">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
        </p>
        <p className="detail-item">
          <span className="font-semibold text-gray-600 w-24 inline-block">ID:</span> 
          <span className="text-gray-800">{user.id}</span>
        </p>
        {user.role === 'student' && (
          <p className="detail-item">
            <span className="font-semibold text-gray-600 w-24 inline-block">Year:</span> 
            <span className="text-gray-800">{yearName} ({user.yearCode})</span>
          </p>
        )}
      </div>
    </div>
  );
}

// ====================
// Global Styles
// ====================

function GlobalStyles() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    
    body { 
      margin:0; 
      font-family: 'Inter', sans-serif; 
      background: #f5f7fb; 
      color: #333;
    }
    .app-container { min-height: 100vh; }
    
    .navbar { 
      display:flex; 
      justify-content: space-between; 
      align-items: center;
      background:#fff; 
      padding:16px 32px; 
      box-shadow:0 4px 12px rgba(0,0,0,0.08);
    }
    .user-info { font-weight: 600; color: #1e40af; }
    .nav-links { display: flex; gap: 8px; }
    
    .nav-button {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: #333;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      font-weight: 500;
    }
    .nav-button:hover { background: #e0f2fe; }
    .nav-button.active { 
      font-weight: 700; 
      color: #1e40af; 
      border-bottom: 3px solid #3b82f6; 
      border-radius: 0;
      background: #f0f8ff;
    }
    .logout-button { color: #dc2626; }
    .logout-button:hover { background: #fee2e2; }
    
    .login-page { 
      display:flex; 
      justify-content:center; 
      align-items:center; 
      height:100vh; 
      background-size:cover; 
      background-position: center;
    }
    .login-card { 
      background:rgba(255, 255, 255, 0.95); 
      padding:40px; 
      border-radius:12px; 
      box-shadow:0 10px 30px rgba(0,0,0,0.15); 
      width:360px;
      backdrop-filter: blur(2px);
    }
    .login-card h1 { 
      font-size: 1.8rem; 
      font-weight: 700; 
      color: #1e40af; 
      margin-bottom: 24px;
      text-align: center;
    }
    .input-field { 
      width:100%; 
      padding:12px; 
      margin-bottom:16px; 
      border-radius:8px; 
      border:1px solid #d1d5db; 
      box-sizing: border-box;
    }
    .login-button { 
      width:100%; 
      padding:12px; 
      border:none; 
      border-radius:8px; 
      background:#3b82f6; 
      color:white; 
      cursor:pointer; 
      font-weight: 600;
      transition: background 0.2s, transform 0.1s;
    }
    .login-button:hover { background: #2563eb; }
    .login-button:active { transform: translateY(1px); }
    .error-message { color: #dc2626; text-align: center; margin-top: 10px; font-weight: 500; }
    .hint-text { font-size: 0.8rem; color: #6b7280; text-align: center; margin-top: 15px; }

    .content-main { padding: 24px 32px; }
    .page-content { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

    .select-field { 
      padding: 8px 12px; 
      border-radius: 6px; 
      border: 1px solid #d1d5db; 
      background: #f9fafb;
      cursor: pointer;
    }

    .data-table { 
      width:100%; 
      border-collapse:separate; /* Use separate to allow border-radius on cells */
      border-spacing: 0;
      margin-top:16px; 
      font-size: 0.95rem;
    }
    .data-table th, .data-table td { 
      padding:12px 16px; 
      text-align:left; 
      border-bottom: 1px solid #e5e7eb;
    }
    .data-table th { 
      background: #f3f4f6; 
      font-weight: 600; 
      color: #4b5563; 
      text-transform: uppercase;
    }
    .data-table tr:last-child td {
      border-bottom: none;
    }

    .toggle-button {
      padding: 6px 10px;
      border: 1px solid #3b82f6;
      border-radius: 4px;
      background: #e0f2fe;
      color: #1e40af;
      cursor: pointer;
      font-size: 0.85rem;
      transition: background 0.2s;
    }
    .toggle-button:hover {
      background: #a5f3fc;
    }

    .detail-item {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
    .detail-item span:first-child {
        min-width: 100px;
    }
  `}</style>
}
