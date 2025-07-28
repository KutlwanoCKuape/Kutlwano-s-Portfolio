const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// === Smooth scrolling for navigation links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        mobileMenu.classList.add('hidden');
    });
});

// === Typing animation ===
const typingText = document.getElementById('typing-text');
const roles = [
    'Building Intelligent Solutions',
    'Machine Learning Expert',
    'Data Science Innovator',
    'AI Research Enthusiast',
    'Deep Learning Specialist'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// === Fade-in animation on scroll ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// === Skill bar animation ===
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(el => {
    skillObserver.observe(el.closest('.fade-in'));
});

// === Presentation slides ===
let currentSlide = 1;
const totalSlides = 5;

function showSlide(n) {
    document.querySelectorAll('.presentation-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    document.getElementById(`slide-${n}`).classList.add('active');
    document.getElementById('slide-counter').textContent = `${n} / ${totalSlides}`;
}

function nextSlide() {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
    showSlide(currentSlide);
}

// === Demo modal functionality ===
function openDemo(demoType) {
    const modal = document.getElementById('demo-modal');
    const title = document.getElementById('demo-title');
    const content = document.getElementById('demo-content');
    
    modal.classList.remove('hidden');

    switch(demoType) {
        case 'cv-demo':
            title.textContent = 'Computer Vision Demo';
            content.innerHTML = `
                <div class="demo-container">
                    <h4 class="text-xl font-semibold mb-4">AI Image Recognition System</h4>
                    <div class="mb-6">
                        <div class="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-6xl mb-4">
                            📷
                        </div>
                        <p class="text-gray-600 mb-4">Upload an image to see real-time object detection and classification</p>
                        <button class="ai-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300">
                            <i class="fas fa-upload mr-2"></i>Upload Image
                        </button>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <h5 class="font-semibold mb-2">Model Performance</h5>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• Accuracy: 95.2%</li>
                                <li>• Inference Time: 23ms</li>
                                <li>• Supported Classes: 1000+</li>
                                <li>• Real-time Processing: Yes</li>
                            </ul>
                        </div>
                        <div>
                            <h5 class="font-semibold mb-2">Technical Stack</h5>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• TensorFlow 2.x</li>
                                <li>• OpenCV</li>
                                <li>• Flask API</li>
                                <li>• Docker Deployment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'nlp-demo':
            title.textContent = 'NLP Chatbot Demo';
            content.innerHTML = `
                <div class="demo-container">
                    <h4 class="text-xl font-semibold mb-4">Intelligent Chatbot Platform</h4>
                    <div class="bg-gray-100 rounded-lg p-4 h-64 mb-4 overflow-y-auto">
                        <div class="mb-3">
                            <div class="bg-indigo-600 text-white p-3 rounded-lg inline-block">
                                Hello! I'm an AI assistant. How can I help you today?
                            </div>
                        </div>
                        <div class="mb-3 text-right">
                            <div class="bg-gray-300 text-gray-800 p-3 rounded-lg inline-block">
                                What services do you offer?
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="bg-indigo-600 text-white p-3 rounded-lg inline-block">
                                I can help with customer support, product information, and technical assistance. I support multiple languages and can understand context from our conversation.
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <input type="text" placeholder="Type your message..." class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-600">
                        <button class="ai-gradient text-white px-6 py-2 rounded-r-lg hover:opacity-90 transition duration-300">
                            Send
                        </button>
                    </div>
                </div>
            `;
            break;

        case 'analytics-demo':
            title.textContent = 'Predictive Analytics Demo';
            content.innerHTML = `
                <div class="demo-container">
                    <h4 class="text-xl font-semibold mb-4">Market Prediction Engine</h4>
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h5 class="font-semibold mb-3">Real-time Predictions</h5>
                            <div class="bg-white p-4 rounded-lg border">
                                <div class="flex justify-between items-center mb-2">
                                    <span>AAPL</span>
                                    <span class="text-green-600 font-semibold">↗ +2.3%</span>
                                </div>
                                <div class="flex justify-between items-center mb-2">
                                    <span>GOOGL</span>
                                    <span class="text-red-600 font-semibold">↘ -1.1%</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span>TSLA</span>
                                    <span class="text-green-600 font-semibold">↗ +4.7%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold mb-3">Model Metrics</h5>
                            <div class="space-y-2">
                                <div class="flex justify-between"><span>Accuracy:</span><span class="font-semibold text-green-600">87.3%</span></div>
                                <div class="flex justify-between"><span>Precision:</span><span class="font-semibold text-green-600">85.1%</span></div>
                                <div class="flex justify-between"><span>Recall:</span><span class="font-semibold text-green-600">89.2%</span></div>
                            </div>
                        </div>
                    </div>
                    <button class="ai-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300">
                        <i class="fas fa-chart-line mr-2"></i>View Full Dashboard
                    </button>
                </div>
            `;
            break;
    }
}

function closeDemo() {
    document.getElementById('demo-modal').classList.add('hidden');
}

document.getElementById('demo-modal').addEventListener('click', function (e) {
    if (e.target === this) closeDemo();
});

// === Contact Form with EmailJS ===
emailjs.init("HIupw65IOuD6VukVs");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("Subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
        alert("❗ Please fill in all fields.");
        return;
    }

    emailjs.send("service_ggz6ygk", "template_wjfr7s9", {
        name,
        email,
        subject,
        message
    })
    .then(response => {
        console.log("✅ Email sent successfully!", response);
        alert(`✅ Thank you ${name}! Your message about "${subject}" has been received. I'll get back to you soon at ${email}.`);
        form.reset();
    })
    .catch(error => {
        console.error("❌ Email error:", error);
        alert("❌ Failed to send message. Please try again.");
    });
});

// === Active nav link highlighting ===
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active', 'text-indigo-600');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-indigo-600');
        }
    });
});