// TopperHub - E-Learning Platform JavaScript

// Data
const courses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch to build modern web applications.",
    price: 99.99,
    icon: "💻",
    students: 12500,
    rating: 4.8,
    category: "Programming",
  },
  {
    id: 2,
    title: "Python Programming",
    description: "Master Python programming from basics to advanced concepts including data structures and algorithms.",
    price: 79.99,
    icon: "🐍",
    students: 9800,
    rating: 4.9,
    category: "Programming",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Explore data analysis, visualization, and machine learning with hands-on projects.",
    price: 129.99,
    icon: "📊",
    students: 7200,
    rating: 4.7,
    category: "Programming",
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps using React Native and Flutter frameworks.",
    price: 109.99,
    icon: "📱",
    students: 5600,
    rating: 4.6,
    category: "Programming",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Master SEO, social media marketing, content strategy, and paid advertising.",
    price: 89.99,
    icon: "📈",
    students: 8400,
    rating: 4.8,
    category: "Marketing",
  },
  {
    id: 6,
    title: "Graphic Design",
    description: "Learn design principles, Adobe Creative Suite, and create stunning visual content.",
    price: 69.99,
    icon: "🎨",
    students: 6300,
    rating: 4.7,
    category: "Design",
  },
]

const subjects = [
  { id: 1, name: "Programming", icon: "💻", courseCount: 24 },
  { id: 2, name: "Business", icon: "💼", courseCount: 18 },
  { id: 3, name: "Design", icon: "🎨", courseCount: 15 },
  { id: 4, name: "Marketing", icon: "📈", courseCount: 12 },
  { id: 5, name: "Photography", icon: "📷", courseCount: 9 },
  { id: 6, name: "Music", icon: "🎵", courseCount: 11 },
]

const videos = [
  {
    id: 1,
    title: "Introduction to the Course",
    duration: "5:32",
    description: "Welcome to the course! Let's go through what you'll learn.",
  },
  {
    id: 2,
    title: "Setting Up Your Environment",
    duration: "12:45",
    description: "Install all the necessary tools and configure your development environment.",
  },
  {
    id: 3,
    title: "Understanding the Basics",
    duration: "18:20",
    description: "Dive into the fundamental concepts that will form the foundation of your learning.",
  },
  {
    id: 4,
    title: "Building Your First Project",
    duration: "24:15",
    description: "Apply what you've learned by building a real-world project from scratch.",
  },
  {
    id: 5,
    title: "Advanced Techniques",
    duration: "21:30",
    description: "Take your skills to the next level with advanced tips and techniques.",
  },
]

const studentCourses = [
  { id: 1, title: "Web Development Masterclass", progress: 75 },
  { id: 2, title: "Python Programming", progress: 45 },
  { id: 3, title: "Data Science Fundamentals", progress: 20 },
]

const adminUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", courses: 3, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", courses: 5, status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", courses: 2, status: "Inactive" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", courses: 4, status: "Active" },
]

const adminMessages = [
  { id: 1, name: "Alex Brown", email: "alex@example.com", subject: "Course Inquiry", date: "2024-01-15" },
  { id: 2, name: "Emily Davis", email: "emily@example.com", subject: "Technical Support", date: "2024-01-14" },
  { id: 3, name: "Chris Lee", email: "chris@example.com", subject: "Refund Request", date: "2024-01-13" },
]

// Auth State - Updated localStorage key to topperhub_user
let currentUser = JSON.parse(localStorage.getItem("topperhub_user")) || null

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initializePage()
})

// Initialize Page
function initializePage() {
  updateAuthUI()
  setupMobileMenu()

  // Page-specific initializations
  const page = document.body.dataset.page

  switch (page) {
    case "home":
      renderFeaturedCourses()
      break
    case "products":
      renderAllCourses()
      break
    case "subjects":
      renderSubjects()
      break
    case "login":
      setupLoginPage()
      break
    case "dashboard":
      setupDashboard()
      break
    case "admin":
      setupAdminDashboard()
      break
    case "videos":
      setupVideosPage()
      break
    case "contact":
      setupContactPage()
      break
  }
}

// Mobile Menu
function setupMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      const isOpen = mobileMenu.classList.contains("active")
      menuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    })
  }
}

// Auth UI Updates
function updateAuthUI() {
  const authDesktop = document.getElementById("auth-desktop")
  const authMobile = document.getElementById("auth-mobile")

  if (currentUser) {
    const dashboardLink = currentUser.type === "admin" ? "admin.html" : "dashboard.html"

    if (authDesktop) {
      authDesktop.innerHTML = `
        <a href="${dashboardLink}">
          <button class="btn btn-ghost">Dashboard</button>
        </a>
        <button class="btn btn-secondary" onclick="logout()">Logout</button>
      `
    }

    if (authMobile) {
      authMobile.innerHTML = `
        <a href="${dashboardLink}">
          <button class="btn btn-ghost" style="width: 100%;">Dashboard</button>
        </a>
        <button class="btn btn-secondary" style="width: 100%;" onclick="logout()">Logout</button>
      `
    }
  } else {
    if (authDesktop) {
      authDesktop.innerHTML = `
        <a href="login.html">
          <button class="btn btn-secondary">Login</button>
        </a>
      `
    }

    if (authMobile) {
      authMobile.innerHTML = `
        <a href="login.html">
          <button class="btn btn-secondary" style="width: 100%;">Login</button>
        </a>
      `
    }
  }
}

// Login/Register
function setupLoginPage() {
  const loginTab = document.getElementById("login-tab")
  const registerTab = document.getElementById("register-tab")
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginTab && registerTab) {
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active")
      registerTab.classList.remove("active")
      loginForm.classList.remove("hidden")
      registerForm.classList.add("hidden")
      clearError()
    })

    registerTab.addEventListener("click", () => {
      registerTab.classList.add("active")
      loginTab.classList.remove("active")
      registerForm.classList.remove("hidden")
      loginForm.classList.add("hidden")
      clearError()
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
}

function handleLogin(e) {
  e.preventDefault()
  clearError()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  if (!email || !password) {
    showError("Please fill in all fields")
    return
  }

  // Demo login - check if email contains "admin"
  const isAdmin = email.toLowerCase().includes("admin")

  currentUser = {
    name: email.split("@")[0],
    email: email,
    type: isAdmin ? "admin" : "student",
  }

  localStorage.setItem("topperhub_user", JSON.stringify(currentUser))

  window.location.href = isAdmin ? "admin.html" : "dashboard.html"
}

function handleRegister(e) {
  e.preventDefault()
  clearError()

  const name = document.getElementById("register-name").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const userType = document.getElementById("register-type").value

  if (!name || !email || !password) {
    showError("Please fill in all fields")
    return
  }

  currentUser = {
    name: name,
    email: email,
    type: userType,
  }

  localStorage.setItem("topperhub_user", JSON.stringify(currentUser))

  window.location.href = userType === "admin" ? "admin.html" : "dashboard.html"
}

function logout() {
  currentUser = null
  localStorage.removeItem("topperhub_user")
  window.location.href = "index.html"
}

function showError(message) {
  const errorEl = document.getElementById("error-message")
  if (errorEl) {
    errorEl.textContent = message
    errorEl.classList.remove("hidden")
  }
}

function clearError() {
  const errorEl = document.getElementById("error-message")
  if (errorEl) {
    errorEl.classList.add("hidden")
  }
}

// Render Featured Courses (Home Page)
function renderFeaturedCourses() {
  const container = document.getElementById("featured-courses")
  if (!container) return

  const featuredCourses = courses.slice(0, 3)

  container.innerHTML = featuredCourses
    .map(
      (course) => `
    <div class="card course-card">
      <div class="course-image">
        <span>${course.icon}</span>
      </div>
      <div class="card-content">
        <h3>${course.title}</h3>
        <p class="description">${course.description}</p>
        <div class="course-meta">
          <div class="rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${course.rating}</span>
          </div>
          <span style="color: var(--muted-foreground);">•</span>
          <span class="students">${course.students.toLocaleString()} students</span>
        </div>
      </div>
      <div class="card-footer">
        <span class="course-price">$${course.price}</span>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  `,
    )
    .join("")
}

// Render All Courses (Products Page)
function renderAllCourses() {
  const container = document.getElementById("courses-grid")
  if (!container) return

  container.innerHTML = courses
    .map(
      (course) => `
    <div class="card course-card">
      <div class="course-image" style="height: 192px;">
        <span style="font-size: 4.5rem;">${course.icon}</span>
      </div>
      <div class="card-content">
        <span class="course-category">${course.category}</span>
        <h3>${course.title}</h3>
        <p class="description">${course.description}</p>
        <div class="course-meta">
          <div class="rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${course.rating}</span>
          </div>
          <div class="students">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>${course.students.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <span class="course-price">$${course.price}</span>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  `,
    )
    .join("")
}

// Render Subjects
function renderSubjects() {
  const container = document.getElementById("subjects-grid")
  if (!container) return

  container.innerHTML = subjects
    .map(
      (subject) => `
    <a href="products.html" class="card subject-card">
      <div class="card-content" style="padding: 2rem;">
        <div class="subject-icon">
          <span>${subject.icon}</span>
        </div>
        <h3>${subject.name}</h3>
        <p class="course-count">${subject.courseCount} courses available</p>
        <div class="browse-link">
          <span>Browse Courses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </a>
  `,
    )
    .join("")
}

// Dashboard
function setupDashboard() {
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  if (currentUser.type === "admin") {
    window.location.href = "admin.html"
    return
  }

  const welcomeEl = document.getElementById("welcome-name")
  if (welcomeEl) {
    welcomeEl.textContent = currentUser.name
  }

  renderStudentCourses()
}

function renderStudentCourses() {
  const container = document.getElementById("student-courses")
  if (!container) return

  container.innerHTML = studentCourses
    .map(
      (course) => `
    <div class="course-list-item">
      <div class="info">
        <h3>${course.title}</h3>
        <p class="progress-text">${course.progress}% completed</p>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm">Continue</button>
    </div>
  `,
    )
    .join("")
}

// Admin Dashboard
function setupAdminDashboard() {
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  if (currentUser.type !== "admin") {
    window.location.href = "dashboard.html"
    return
  }

  const tabs = document.querySelectorAll(".admin-tab")
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      const tabId = this.dataset.tab
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.add("hidden")
      })
      document.getElementById(`${tabId}-table`).classList.remove("hidden")
    })
  })

  renderAdminTables()
}

function renderAdminTables() {
  // Users Table
  const usersTable = document.getElementById("users-table")
  if (usersTable) {
    usersTable.querySelector("tbody").innerHTML = adminUsers
      .map(
        (user) => `
      <tr>
        <td style="font-weight: 600;">${user.name}</td>
        <td style="color: var(--muted-foreground);">${user.email}</td>
        <td>${user.courses}</td>
        <td>
          <span class="status-badge ${user.status.toLowerCase()}">${user.status}</span>
        </td>
      </tr>
    `,
      )
      .join("")
  }

  // Courses Table
  const coursesTable = document.getElementById("courses-table")
  if (coursesTable) {
    coursesTable.querySelector("tbody").innerHTML = courses
      .map(
        (course) => `
      <tr>
        <td>
          <div class="table-course">
            <span>${course.icon}</span>
            <span style="font-weight: 600;">${course.title}</span>
          </div>
        </td>
        <td style="color: var(--muted-foreground);">${course.category}</td>
        <td>${course.students.toLocaleString()}</td>
        <td style="font-weight: 700; color: var(--primary);">$${course.price}</td>
      </tr>
    `,
      )
      .join("")
  }

  // Messages Table
  const messagesTable = document.getElementById("messages-table")
  if (messagesTable) {
    messagesTable.querySelector("tbody").innerHTML = adminMessages
      .map(
        (message) => `
      <tr>
        <td style="font-weight: 600;">${message.name}</td>
        <td style="color: var(--muted-foreground);">${message.email}</td>
        <td>${message.subject}</td>
        <td style="color: var(--muted-foreground);">${message.date}</td>
      </tr>
    `,
      )
      .join("")
  }
}

// Videos Page
let selectedVideo = videos[0]
const completedVideos = []

function setupVideosPage() {
  renderPlaylist()
  updateVideoPlayer()
}

function renderPlaylist() {
  const container = document.getElementById("playlist")
  if (!container) return

  container.innerHTML = videos
    .map(
      (video, index) => `
    <button class="playlist-item ${video.id === selectedVideo.id ? "active" : ""} ${completedVideos.includes(video.id) ? "completed" : ""}" onclick="selectVideo(${video.id})">
      <div class="playlist-number">
        ${
          completedVideos.includes(video.id)
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
            : index + 1
        }
      </div>
      <div class="playlist-info">
        <h4>${video.title}</h4>
        <span>${video.duration}</span>
      </div>
    </button>
  `,
    )
    .join("")

  // Update progress
  const progressEl = document.getElementById("playlist-progress")
  if (progressEl) {
    progressEl.textContent = `${completedVideos.length}/${videos.length}`
  }
}

function selectVideo(videoId) {
  selectedVideo = videos.find((v) => v.id === videoId)

  if (!completedVideos.includes(videoId)) {
    completedVideos.push(videoId)
  }

  updateVideoPlayer()
  renderPlaylist()
}

function updateVideoPlayer() {
  const titleEl = document.getElementById("video-title")
  const descEl = document.getElementById("video-description")
  const durationEl = document.getElementById("video-duration")

  if (titleEl) titleEl.textContent = selectedVideo.title
  if (descEl) descEl.textContent = selectedVideo.description
  if (durationEl) durationEl.textContent = selectedVideo.duration
}

// Contact Page
function setupContactPage() {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      form.classList.add("hidden")
      successMessage.classList.remove("hidden")

      // Reset after 3 seconds
      setTimeout(() => {
        form.reset()
        form.classList.remove("hidden")
        successMessage.classList.add("hidden")
      }, 3000)
    })
  }
}

// Make functions globally available
window.logout = logout
window.selectVideo = selectVideo
