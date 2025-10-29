let students = [];
let attendance = {};
let loggedIn = false;

// ✅ Generate students for SEC-1, SEC-2, and SEC-3
function generateStudents() {
  // SEC-1 → 23SW001, 23SW004, 23SW007 ... until 170
  for (let i = 1; i <= 170; i += 3) {
    const id = `23SW${String(i).padStart(3, '0')}`;
    students.push({ id, name: `Student ${i}`, section: "SEC-1" });
  }

  // SEC-2 → 23SW002, 23SW005, 23SW008 ... until 170
  for (let i = 2; i <= 170; i += 3) {
    const id = `23SW${String(i).padStart(3, '0')}`;
    students.push({ id, name: `Student ${i}`, section: "SEC-2" });
  }

  // SEC-3 → 23SW003, 23SW006, 23SW009 ... until 170
  for (let i = 3; i <= 170; i += 3) {
    const id = `23SW${String(i).padStart(3, '0')}`;
    students.push({ id, name: `Student ${i}`, section: "SEC-3" });
  }
}

// ✅ Login simulation
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  if (username === "admin" && password === "password") {
    loggedIn = true;
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    message.textContent = "Invalid credentials!";
    message.style.display = "block";
  }
}

// ✅ Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  loggedIn = false;
  document.getElementById("mainContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
});

// ✅ Load students for selected section
function loadStudents(section = "SEC-3") {
  if (students.length === 0) generateStudents();

  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  const sectionStudents = students.filter(s => s.section === section);

  sectionStudents.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td><input type="checkbox" id="chk-${s.id}" /></td>
    `;
    tbody.appendChild(tr);
  });

  alert(`${sectionStudents.length} students loaded for ${section}`);
}

// ✅ Save Attendance
function saveAttendance() {
  const today = new Date().toISOString().split('T')[0];
  attendance[today] = [];

  students.forEach(s => {
    const checkbox = document.getElementById(`chk-${s.id}`);
    if (checkbox) {
      const present = checkbox.checked;
      attendance[today].push({ id: s.id, name: s.name, section: s.section, present });
    }
  });

  alert("Attendance saved successfully for " + today);
}

// ✅ Generate Report
function generateReport() {
  const reportDiv = document.getElementById("reportContainer");
  reportDiv.innerHTML = "<h3>Attendance Report</h3>";

  const today = new Date().toISOString().split('T')[0];
  const records = attendance[today] || [];
  if (records.length === 0) {
    reportDiv.innerHTML += "<p>No attendance records found for today.</p>";
    return;
  }

  const presentCount = records.filter(r => r.present).length;
  const absentCount = records.length - presentCount;

  reportDiv.innerHTML += `
    <p><strong>Date:</strong> ${today}</p>
    <p><strong>Total Students:</strong> ${records.length}</p>
    <p><strong>Present:</strong> ${presentCount}</p>
    <p><strong>Absent:</strong> ${absentCount}</p>
  `;
}

// ✅ Export Attendance as CSV
function exportCSV() {
  let csv = "Student ID,Name,Section,Present\n";
  const today = new Date().toISOString().split('T')[0];
  const records = attendance[today] || [];
  records.forEach(r => {
    csv += `${r.id},${r.name},${r.section},${r.present ? "Yes" : "No"}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `attendance_${today}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}
