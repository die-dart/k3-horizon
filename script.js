document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Logic ---
  const greetingElement = document.getElementById('greeting');
  const indicatorElement = document.getElementById('time-indicator');
  const cardElement = document.querySelector('.card');

  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    let icon = '👋';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good Morning';
      icon = '🌅';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good Afternoon';
      icon = '☀️';
    } else {
      greeting = 'Good Evening';
      icon = '🌙';
    }

    if (greetingElement) {
      greetingElement.textContent = `${greeting}, Horizon`; // Updated brand touch
    }

    if (indicatorElement) {
      indicatorElement.textContent = `${icon} Local time: ${new Date().toLocaleTimeString()}`;
    }
  }

  updateGreeting();
  setInterval(updateGreeting, 1000);

  // --- Hero Section Logic ---

  // Typewriter Animation
  const typewriterText = document.getElementById('typewriter-text');
  const words = ['Kemnaker RI', 'BNSP', 'Softskill', 'Migas'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    // Check if element exists to avoid errors on other pages
    if (!typewriterText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Deleting
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Faster when deleting
    } else {
      // Typing
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Finished typing word, pause before delete
      isDeleting = true;
      typeSpeed = 1000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  // Start the typing loop
  if (typewriterText) {
    type();
  }

  // --- New Navbar & Dark Mode Logic ---

  // 1. Dark Mode
  const themeToggleCtx = document.getElementById('theme-toggle');
  const body = document.body;

  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
  }

  if (themeToggleCtx) {
    themeToggleCtx.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      // Prevent scrolling when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Featured Programs Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function setActiveTab(tabId) {
    // Hide all contents
    tabContents.forEach(content => content.classList.remove('active'));
    // Deactivate all buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Show target content
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    // Activate target buttons (handle multiple buttons if needed)
    tabBtns.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      setActiveTab(tabId);
    });
  });
});
