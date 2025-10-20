
import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";




// ====================
// Constants & Helpers
// ====================

const BG_IMAGE = "data:image/jpeg;base64,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";
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
  "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack",
  "Kira", "Leo", "Mia", "Nina", "Oscar", "Paula", "Quinn", "Ravi", "Sara", "Tom",
  "Uma", "Vikram", "Will", "Xena", "Yara", "Zane", "Aman", "Bina", "Chirag", "Devika",
  "Eshan", "Fiona", "Gaurav", "Hitesh", "Isha", "Jatin", "Kajal", "Lalit", "Meera", "Nikhil",
  "Om", "Priya", "Quincy", "Rohan", "Sneha", "Tarun", "Usha", "Varun", "Wendy", "Xavier",
  "Yash", "Zoya", "Ankit", "Bhavna", "Chetan", "Divya", "Eklavya", "Farah", "Gitanjali", "Harsh",
  "Irfan", "Jaya", "Kabir", "Lina", "Mohit" // Total 65 names
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
const FACULTY_USER = { username: "faculty", password: "faculty", role: "faculty", name: "Mr.Kumar", id: "FAC1001", yearCode: "4SF24", subjectCodes: ["DBMS", "CN"] };

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
        <div className="navbar-left">
          <div>
            <img src={logo} alt="Sahyadri Logo" className="college-logo" />
          </div>
          <div>
            <h2 className="campus-title">Digital Campus</h2>
          </div>
        </div>
        <div className="user-info">{user.name} ({user.role})</div>
        <div className="nav-links">
          <button className={`nav-button ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>Dashboard</button>
          <button className={`nav-button ${page === "subjects" ? "active" : ""}`} onClick={() => setPage("subjects")}>Subjects</button>
          <button className={`nav-button ${page === "attendance" ? "active" : ""}`} onClick={() => setPage("attendance")}>Attendance</button>
          <button className={`nav-button ${page === "profile" ? "active" : ""}`} onClick={() => setPage("profile")}>Profile</button>
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
        <h2 className="text-xl font-bold">Welcome {user.name}</h2>
        <p className="text-gray-600 font-bold mb-4">Your current year: {yearName}</p>

        <h3 className="text-lg font-semibold border-b pb-1 mt-4">
          Attendance Status for Today ({today})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {studentSubjects.map(sub => {
            const s = (appState.attendance[sub.code]?.[today] || {})[user.id];
            const status = s?.status || "Absent";
            

            return (
              <div
                key={sub.code}
                className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div className="card">
                  <h4 className="font-bold">{sub.name}</h4>
                  <div>
                    <div>
                      <p className="status-text">
                        Status:{" "}
                        <span className={`status-text ${status === "Present" ? "text-green-600" : "text-red-600"} font-semibold`}>
                          {status}
                        </span>
                      </p>
                      {s && <p className="marked-at text-gray-500 text-sm">Marked at: {s.time}</p>}
                   </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // --------------------------
  // Faculty Dashboard Section
  // --------------------------
  const facultySubjects = SUBJECTS_BY_YEAR[user.yearCode] || [];

  // Get subjects where attendance has been marked today
  const attendanceMarkedToday = facultySubjects.filter(sub => {
    const attendance = appState.attendance[sub.code]?.[today];
    return attendance && Object.keys(attendance).length > 0;
  });

  const totalSubjects = facultySubjects.length;
  const markedCount = attendanceMarkedToday.length;
  const pendingCount = totalSubjects - markedCount;

  return (
    <div className="page-content space-y-6">
      <h2 className="text-xl font-bold">Faculty Dashboard</h2>
      <p className="text-gray-700">Welcome {user.name}. Please use the <strong>Attendance</strong> page to mark student attendance for your classes.</p>
      <h3 className="text-lg font-semibold border-b pb-1">Today's Attendance Overview ({today})</h3>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="card flex-1 bg-blue-50 border border-blue-200 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-blue-800">Total Subjects</h3>
          <p className="text-2xl text-blue-600">{totalSubjects}</p>
        </div>

        <div className="card flex-1 bg-green-50 border border-green-200 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-green-800">Attendance Marked Today</h3>
          <p className="text-2xl text-green-600">{markedCount}</p>
        </div>

        <div className="card flex-1 bg-red-50 border border-red-200 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-red-800">Pending Attendance</h3>
          <p className="text-2xl text-red-600">{pendingCount}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>

        <ul className="list-disc pl-5 mt-2 space-y-2">
          {facultySubjects.map(sub => {
            const attendance = appState.attendance[sub.code]?.[today];
            const status = attendance && Object.keys(attendance).length > 0 ? "Marked" : "Pending";
            const statusColor = status === "Marked" ? "text-green-600" : "text-red-600";
            return (
              <li key={sub.code}>
                {sub.name}: <span className={statusColor}>{status}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800">Note:</h4>
        <p className="text-sm text-yellow-700">
          The attendance data shown on this portal is stored locally in your browser for demonstration purposes. Resetting your browser's local storage will clear all recorded attendance data.
        </p>
      </div>
    </div>
  );
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
        <p className="text-gray-600 mb-4">These are the subjects for your {YEARS.find(y => y.code === user.yearCode)?.name}.</p>
      }

      <table className="data-table">
        <thead className="bg-">
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
        <p className="text-gray-600 mb-6">
          You can view your recorded attendance status till {today}.
        </p>

        <table className="data-table max-w-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-left">Subject</th>
              <th className="px-3 py-2 text-left">Status ({today})</th>
              <th className="px-3 py-2 text-left">Total Present</th>
              <th className="px-3 py-2 text-left">Total Absent</th>
            </tr>
          </thead>
          <tbody>
            {studentSubjects.map((sub) => {
              const attendanceByDate = appState.attendance[sub.code] || {};
              let totalPresent = 0;
              let totalAbsent = 0;

              // Count total Present/Absent till today
              Object.keys(attendanceByDate).forEach((date) => {
                const record = attendanceByDate[date]?.[user.id];
                if (record) {
                  if (record.status === "Present") totalPresent++;
                  else totalAbsent++;
                } else {
                  totalAbsent++; // If no record, count as Absent
                }
              });

              const todayRecord = attendanceByDate[today]?.[user.id];
              const todayStatus = todayRecord?.status || "Absent";
              const todayTime = todayRecord ? ` (Marked at: ${todayRecord.time})` : "";
              const todayColor =
                todayStatus === "Present"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium";

              return (
                <tr key={sub.code} className="border-t border-gray-200">
                  <td className="px-3 py-2">{sub.name}</td>
                  <td className="px-3 py-2">
                    <span className={todayColor}>{todayStatus}</span>
                    {todayTime}
                  </td>
                  <td className="px-3 py-2 text-green-600 font-medium">{totalPresent}</td>
                  <td className="px-3 py-2 text-red-600 font-medium">{totalAbsent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* --- PIE CHART SECTION --- */}
        <h3 className="text-lg font-semibold mt-10 mb-4 text-center">
          Attendance Summary by Subject
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentSubjects.map((sub) => {
            const attendanceByDate = appState.attendance[sub.code] || {};
            let totalPresent = 0;
            let totalAbsent = 0;

            Object.keys(attendanceByDate).forEach((date) => {
              const record = attendanceByDate[date]?.[user.id];
              if (record) {
                if (record.status === "Present") totalPresent++;
                else totalAbsent++;
              } else {
                totalAbsent++;
              }
            });

            const data = [
              { name: "Present", value: totalPresent },
              { name: "Absent", value: totalAbsent },
            ];

            const COLORS = ["#22c55e", "#ef4444"]; // green & red

            return (
              <div
                key={sub.code}
                className="card bg-blue-50 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-md font-semibold mb-2 text-center">{sub.name}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  // --- FACULTY VIEW (Sees all students in the selected year) ---
  const studentsForYear = appState.students.filter(s => s.yearCode === selectedYear);

  const toggleAttendance = (studentId) => {
    // Only faculty can toggle attendance
    if (user.role !== "faculty") return;

    const attendance = { ...appState.attendance };
    // Ensure nested objects exist before trying to access them
    attendance[selectedSubject] = attendance[selectedSubject] || {};
    attendance[selectedSubject][today] = attendance[selectedSubject][today] || {};

    const current = attendance[selectedSubject][today][studentId];
    // Toggle status between Present and Absent
    attendance[selectedSubject][today][studentId] = {
      status: current?.status === "Present" ? "Absent" : "Present",
      time: new Date().toLocaleTimeString()
    };
    setAppState({ ...appState, attendance });
  };

  return (
    <div className="page-content">
      <h2 className="text-xl font-bold mb-4">Mark Daily Attendance ({today})</h2>

      <div className="flex space-x-4 mb-4 items-center">
        <label htmlFor="year-select" className="font-medium">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={e => {
            setSelectedYear(e.target.value);
            // Also update subject selection when year changes
            setSelectedSubject(SUBJECTS_BY_YEAR[e.target.value]?.[0]?.code || "")
          }}
          className="select-field"
        >
          {YEARS.map(y => <option key={y.code} value={y.code}>{y.name}</option>)}
        </select>

        <label htmlFor="subject-select" className="font-medium">Select Subject:</label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          className="select-field"
        >
          {subjectsForYear.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
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
          {studentsForYear.map(st => {
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
                  {s ? ` @ ${s.time}` : ''}
                </td>
                <td>
                  <button
                    onClick={() => toggleAttendance(st.id)}
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
      background: #fafafbff; 
      color: #333;
    }
    .app-container { min-height: 100vh; }

    .grid{
    display:flex;
    gap:20px;
    }

    .card {
  background-color: #e2effbff;
  width: 300px; /* or use 100% if you’re using a grid */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* center content horizontally */
  justify-content: center; /* center content vertically */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 20px auto; /* centers the card itself */
  text-align: center;
}

    
    .navbar { 
  display:flex; 
  justify-content: space-between; 
  align-items: center;
  background:#3379baff;;   /* deep blue */
  color: white;          /* make text white for contrast */
  padding:8px 10px; 
  box-shadow:0 4px 12px rgba(0,0,0,0.15);
}
  .navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
   .college-logo {
  height: 60px;
  width: auto;
  border-radius: 8px;
  background: transparent;
}
  .campus-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
}
    .user-info { font-weight: 600; color: #3379baff; }
    .nav-links { display: flex; gap: 8px; }
    
    .nav-button {
      padding: 8px 12px;
      border: none;
      border-radius:6px;
      background: transparent;
      color: #fbf8f8ff;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      font-weight: 500;
      font-size:17px;
    }
    .nav-button:hover { 
    background: #a8d2eeff; 
    color: #051549ff;
    }
    .nav-button.active { 
      font-weight: 700; 
      color: #051549ff; 
      border-bottom: 3px solid #b3d6f3ff; 
      border-radius: 6px;
      background: #b3d6f3ff;
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
.status-text {
  font-size: 1.05rem;
  font-weight:bold;   /* Bigger than normal text */
}
.marked-at {
  font-size: 0.875rem;  /* Smaller text */
  color: #6b7280;       /* gray-500 equivalent */
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
      background: #e2effbff; 
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
