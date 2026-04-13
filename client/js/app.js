// 🔥 Local API (change in production)
const API = "http://localhost:5000/api";

// ✅ Helper
function showMsg(msg) {
  alert(msg);
}

// ✅ Register
async function register() {
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Register failed");

    showMsg("Registered successfully!");
    location.href = "login.html";
  } catch (err) {
    showMsg(err.message);
  }
}

// ✅ Login
async function login() {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Login failed");

    localStorage.setItem("token", data.token);

    showMsg("Login successful!");
    location.href = "dashboard.html";
  } catch (err) {
    showMsg(err.message);
  }
}

// ✅ Go to create page
function goCreate() {
  location.href = "createStream.html";
}

// ✅ Create Stream (AWS IVS READY 🔥)
async function createStream() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      showMsg("Please login first");
      return location.href = "login.html";
    }

    const res = await fetch(`${API}/stream/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: title.value || "My Live Stream",
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Stream creation failed");

    document.getElementById("result").style.display = "block";

    document.getElementById("result").innerHTML = `
      <h3>🎥 OBS Setup</h3>
      <p><b>Server:</b> ${data.obs.server}</p>
      <p><b>Stream Key:</b> ${data.obs.key}</p>

      <button onclick="copyText('${data.obs.server}')">Copy Server</button>
      <button onclick="copyText('${data.obs.key}')">Copy Key</button>

      <hr>

      <h3>📺 Watch Live</h3>
      <a href="watch.html?id=${encodeURIComponent(data.playbackUrl)}" target="_blank">
        Open Player
      </a>
    `;
  } catch (err) {
    showMsg(err.message);
  }
}

// ✅ Copy helper
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Copied: " + text);
}