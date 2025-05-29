// --- Portfolio Data Storage with localStorage sync ---
const defaultPortfolioData = {
    personal: {
        heroSubtitle: "A highly motivated software developer with expertise in full-stack web development",
        aboutDescription: "A highly motivated and adaptable software developer with a strong foundation in full-stack web development. Proficient in modern technologies including React, Laravel, Node.js, and Oracle SQL, with a passion for clean code, problem-solving, and building scalable software solutions.",
        location: "Nairobi, Kenya",
        email: "Denisobadoharold00@gmail.com",
        phone: "0769345790",
        education: "BSc Information Technology",
        heroImg: ""
    },
    projects: [
        {
            id: 1,
            title: "Rental Property Management System",
            description: "Comprehensive system built with Laravel, Node.js, and Tailwind CSS. Features tenant management, rent tracking, automated reminders, and mobile payment integration.",
            technologies: ["Laravel", "Node.js", "MySQL", "Tailwind"],
            icon: "fas fa-home",
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 2,
            title: "Employee Management System",
            description: "Full-stack application with Laravel backend and React frontend. Includes secure authentication, CRUD operations, and role-based access control.",
            technologies: ["Laravel", "React", "MySQL"],
            icon: "fas fa-users",
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 3,
            title: "Stadium Ticket Booking App",
            description: "Real-time ticketing platform using Node.js and React. Integrated with APIs for match schedules and secure payment processing.",
            technologies: ["Node.js", "React", "MongoDB"],
            icon: "fas fa-ticket-alt",
            liveUrl: "#",
            githubUrl: "#"
        }
    ],
    skills: {
        "Programming Languages": ["PHP", "JavaScript", "TypeScript", "Python", "Bash"],
        "Frameworks & Libraries": ["Laravel", "Node.js", "React.js", "Express.js", "Tailwind CSS"],
        "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Oracle SQL", "Firebase"],
        "DevOps & Tools": ["Git", "Docker", "NGINX", "Linux", "AWS"]
    },
    experience: [
        {
            id: 1,
            title: "ICT Attaché",
            company: "Migori County Government",
            date: "2023",
            description: "Supported troubleshooting and maintenance of IT infrastructure across multiple departments. Provided technical support and gained hands-on experience with networking and systems administration."
        },
        {
            id: 2,
            title: "ALX Software Engineering Bootcamp",
            company: "",
            date: "2023 - 2024",
            description: "Intensive software engineering program focusing on full-stack development, algorithms, and modern development practices."
        },
        {
            id: 3,
            title: "Bachelor of Science in Information Technology",
            company: "KCA University, Nairobi",
            date: "2019 - 2024",
            description: "Comprehensive study of information technology including software development, database management, and system administration."
        }
    ],
    social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
    }
};

function getPortfolioData() {
    const data = localStorage.getItem('portfolioData');
    if (data) {
        try {
            return JSON.parse(data);
        } catch {
            return JSON.parse(JSON.stringify(defaultPortfolioData));
        }
    }
    return JSON.parse(JSON.stringify(defaultPortfolioData));
}

function savePortfolioData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// --- Main Data Object ---
let portfolioData = getPortfolioData();

// --- DOM Elements ---
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const downloadCvBtn = document.getElementById('download-cv');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    setupScrollAnimations();
    loadPortfolioData();
    if (window.isAdmin) {
        setupAdminTabs();
        setupAdminForms();
        loadAdminData();
    }
});

// --- Portfolio Initialization ---
function initializePortfolio() {
    // Smooth scrolling for navigation links
    if (!window.isAdmin && navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    // Navbar scroll effect
    if (!window.isAdmin) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNavLink();
        });
    }
    // Mobile menu toggle
    if (!window.isAdmin && hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    // Download CV
    if (!window.isAdmin && downloadCvBtn) {
        downloadCvBtn.setAttribute('href', 'DENIS_HAROLD_OBADO_CV.pdf');
        downloadCvBtn.setAttribute('download', 'DENIS_HAROLD_OBADO_CV.pdf');
    }
}

// --- Scroll to Section ---
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// --- Update Active Nav Link ---
function updateActiveNavLink() {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// --- Scroll Animations ---
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// --- Load Portfolio Data into DOM ---
function loadPortfolioData() {
    // Personal Info
    if (document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').textContent = portfolioData.personal.heroSubtitle;
    if (document.getElementById('about-description')) document.getElementById('about-description').textContent = portfolioData.personal.aboutDescription;
    if (document.getElementById('location')) document.getElementById('location').textContent = portfolioData.personal.location;
    if (document.getElementById('email')) document.getElementById('email').textContent = portfolioData.personal.email;
    if (document.getElementById('phone')) document.getElementById('phone').textContent = portfolioData.personal.phone;
    if (document.getElementById('education')) document.getElementById('education').textContent = portfolioData.personal.education;
    // About stats
    if (document.getElementById('years-learning')) document.getElementById('years-learning').textContent = "5+";
    if (document.getElementById('tech-count')) document.getElementById('tech-count').textContent = Object.values(portfolioData.skills).reduce((a, b) => a + b.length, 0);
    if (document.getElementById('projects-count')) document.getElementById('projects-count').textContent = portfolioData.projects.length;
    // Contact section
    if (document.getElementById('contact-email')) document.getElementById('contact-email').textContent = portfolioData.personal.email;
    if (document.getElementById('contact-phone')) document.getElementById('contact-phone').textContent = portfolioData.personal.phone;
    if (document.getElementById('contact-location')) document.getElementById('contact-location').textContent = portfolioData.personal.location;
    // Hero image
    if (document.getElementById('hero-img')) {
        if (portfolioData.personal.heroImg && portfolioData.personal.heroImg.startsWith('data:image')) {
            document.getElementById('hero-img').src = portfolioData.personal.heroImg;
        } else {
            document.getElementById('hero-img').src = 'deno';
        }
    }
    // Projects, Skills, Experience, Social
    loadProjects();
    loadSkills();
    loadExperience();
    loadSocialLinks();
}

// --- Load Projects ---
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">Live Demo</a>
                    <a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// --- Load Skills ---
function loadSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';
    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        skillCategory.innerHTML = `
            <h3>${category}</h3>
            <div class="skill-tags">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        skillsGrid.appendChild(skillCategory);
    });
}

// --- Load Experience ---
function loadExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    timeline.innerHTML = '';
    portfolioData.experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                ${exp.company ? `<h4>${exp.company}</h4>` : ''}
                <span class="timeline-date">${exp.date}</span>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// --- Load Social Links ---
function loadSocialLinks() {
    const socialLinks = document.getElementById('social-links');
    if (!socialLinks) return;
    socialLinks.innerHTML = `
        <a href="${portfolioData.social.github}" class="social-link" target="_blank"><i class="fab fa-github"></i></a>
        <a href="${portfolioData.social.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="${portfolioData.social.twitter}" class="social-link" target="_blank"><i class="fab fa-twitter"></i></a>
    `;
}

// --- Contact Form Handler (User Side) ---
function sendEmail() {
    const templateparams = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    };

    emailjs
        .send('your_service_id', 'your_template_id', templateparams)
        .then(() => {
            alert('Email sent successfully!');
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            alert('Failed to send email. Please try again later.');
        });
}


function setupAdminTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

function loadAdminData() {
    // Personal info
    document.getElementById('admin-hero-subtitle').value = portfolioData.personal.heroSubtitle;
    document.getElementById('admin-about-desc').value = portfolioData.personal.aboutDescription;
    document.getElementById('admin-location').value = portfolioData.personal.location;
    document.getElementById('admin-email').value = portfolioData.personal.email;
    document.getElementById('admin-phone').value = portfolioData.personal.phone;
    document.getElementById('admin-education').value = portfolioData.personal.education;
    // Hero image preview
    const imgPrev = document.getElementById('admin-hero-img-preview');
    if (portfolioData.personal.heroImg && portfolioData.personal.heroImg.startsWith('data:image')) {
        imgPrev.src = portfolioData.personal.heroImg;
    } else {
        imgPrev.src = 'deno';
    }
    // Social links
    document.getElementById('admin-github').value = portfolioData.social.github;
    document.getElementById('admin-linkedin').value = portfolioData.social.linkedin;
    document.getElementById('admin-twitter').value = portfolioData.social.twitter;
    // Projects, Skills, Experience
    loadAdminProjects();
    loadAdminSkills();
    loadAdminExperience();
}

function setupAdminForms() {
    // Personal info form
    document.getElementById('personal-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updatePersonalInfo();
    });
    // Hero image upload
    document.getElementById('admin-hero-img').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                portfolioData.personal.heroImg = evt.target.result;
                document.getElementById('admin-hero-img-preview').src = evt.target.result;
                savePortfolioData();
            };
            reader.readAsDataURL(file);
        }
    });
    // Social links form
    document.getElementById('social-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateSocialLinks();
    });
    // Add project button
    document.getElementById('add-project-btn').addEventListener('click', showAddProjectForm);
    // Add experience button
    document.getElementById('add-experience-btn').addEventListener('click', showAddExperienceForm);
}

// --- Update Personal Info ---
function updatePersonalInfo() {
    portfolioData.personal.heroSubtitle = document.getElementById('admin-hero-subtitle').value;
    portfolioData.personal.aboutDescription = document.getElementById('admin-about-desc').value;
    portfolioData.personal.location = document.getElementById('admin-location').value;
    portfolioData.personal.email = document.getElementById('admin-email').value;
    portfolioData.personal.phone = document.getElementById('admin-phone').value;
    portfolioData.personal.education = document.getElementById('admin-education').value;
    savePortfolioData();
    loadPortfolioData();
    alert('Personal information updated!');
}

// --- Update Social Links ---
function updateSocialLinks() {
    portfolioData.social.github = document.getElementById('admin-github').value;
    portfolioData.social.linkedin = document.getElementById('admin-linkedin').value;
    portfolioData.social.twitter = document.getElementById('admin-twitter').value;
    savePortfolioData();
    loadSocialLinks();
    alert('Social links updated!');
}

// --- Admin Projects ---
function loadAdminProjects() {
    const adminProjectsList = document.getElementById('admin-projects-list');
    adminProjectsList.innerHTML = '';
    portfolioData.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-success" onclick="editProject(${project.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `;
        adminProjectsList.appendChild(div);
    });
}

function showAddProjectForm() {
    const title = prompt('Project Title:');
    if (!title) return;
    const description = prompt('Project Description:');
    if (!description) return;
    const newId = portfolioData.projects.length ? Math.max(...portfolioData.projects.map(p => p.id)) + 1 : 1;
    portfolioData.projects.push({
        id: newId,
        title,
        description,
        technologies: [],
        icon: 'fas fa-code',
        liveUrl: '#',
        githubUrl: '#'
    });
    savePortfolioData();
    loadProjects();
    loadAdminProjects();
}

function editProject(id) {
    const project = portfolioData.projects.find(p => p.id === id);
    if (!project) return;
    const title = prompt('Edit Project Title:', project.title);
    if (!title) return;
    const description = prompt('Edit Project Description:', project.description);
    if (!description) return;
    project.title = title;
    project.description = description;
    savePortfolioData();
    loadProjects();
    loadAdminProjects();
}

function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
    savePortfolioData();
    loadProjects();
    loadAdminProjects();
}

// --- Admin Skills ---
function loadAdminSkills() {
    const adminSkillsList = document.getElementById('admin-skills-list');
    adminSkillsList.innerHTML = '';
    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <h4>${category}</h4>
            <div>${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ')}</div>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-success" onclick="addSkill('${category}')">Add Skill</button>
                <button class="btn btn-sm btn-danger" onclick="removeSkill('${category}')">Remove Skill</button>
            </div>
        `;
        adminSkillsList.appendChild(div);
    });
}

function addSkill(category) {
    const skill = prompt(`Add new skill to ${category}:`);
    if (skill) {
        portfolioData.skills[category].push(skill);
        savePortfolioData();
        loadSkills();
        loadAdminSkills();
    }
}

function removeSkill(category) {
    const skill = prompt(`Enter skill to remove from ${category}:`);
    if (skill) {
        portfolioData.skills[category] = portfolioData.skills[category].filter(s => s !== skill);
        savePortfolioData();
        loadSkills();
        loadAdminSkills();
    }
}

// --- Admin Experience ---
function loadAdminExperience() {
    const adminExperienceList = document.getElementById('admin-experience-list');
    adminExperienceList.innerHTML = '';
    portfolioData.experience.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <h4>${exp.title}</h4>
            <p>${exp.company ? exp.company + '<br>' : ''}${exp.date}</p>
            <p>${exp.description}</p>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-success" onclick="editExperience(${exp.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteExperience(${exp.id})">Delete</button>
            </div>
        `;
        adminExperienceList.appendChild(div);
    });
}

function showAddExperienceForm() {
    const title = prompt('Experience Title:');
    if (!title) return;
    const company = prompt('Company (optional):');
    const date = prompt('Date (e.g., 2024):');
    if (!date) return;
    const description = prompt('Description:');
    if (!description) return;
    const newId = portfolioData.experience.length ? Math.max(...portfolioData.experience.map(e => e.id)) + 1 : 1;
    portfolioData.experience.push({
        id: newId,
        title,
        company,
        date,
        description
    });
    savePortfolioData();
    loadExperience();
    loadAdminExperience();
}

function editExperience(id) {
    const exp = portfolioData.experience.find(e => e.id === id);
    if (!exp) return;
    const title = prompt('Edit Title:', exp.title);
    if (!title) return;
    const company = prompt('Edit Company:', exp.company);
    const date = prompt('Edit Date:', exp.date);
    if (!date) return;
    const description = prompt('Edit Description:', exp.description);
    if (!description) return;
    exp.title = title;
    exp.company = company;
    exp.date = date;
    exp.description = description;
    savePortfolioData();
    loadExperience();
    loadAdminExperience();
}

function deleteExperience(id) {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
    savePortfolioData();
    loadExperience();
    loadAdminExperience();
}

// --- Expose functions for inline onclick handlers ---
window.editProject = editProject;
window.deleteProject = deleteProject;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.editExperience = editExperience;
window.deleteExperience = deleteExperience;