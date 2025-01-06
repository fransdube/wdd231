// Footer content
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Responsive navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Course list
const courses = [
    { code: "CSE 121B", name: "JavaScript Language", credits: 4, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: false },
    // Add more courses
];

function displayCourses(filter = "all") {
    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.code.startsWith(filter));
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = filteredCourses.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    </div>
  `).join('');

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

// Initial display
displayCourses();