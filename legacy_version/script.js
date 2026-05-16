const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_services: "Services",
        nav_gallery: "Gallery",
        nav_how: "How to Rent",
        nav_contact: "Contact",
        hero_title: "FIORA | فيورة",
        hero_tagline: "LUXURY STARTS HERE",
        hero_btn_gallery: "View Gallery",
        hero_btn_contact: "Contact Us",
        feat_rental: "Rental",
        feat_design: "Design",
        feat_delivery: "Delivery",
        about_sub: "Our Story",
        about_title: "About FIORA | عن فيورة",
        about_p: "FIORA is a luxury event decor rental brand specializing in elegant display stands, mirrors, and custom setups for engagements, weddings, and special occasions.",
        val_1: "Elegance",
        val_2: "Quality",
        val_3: "Customization",
        val_4: "Timely Delivery",
        services_title: "Our Services | خدماتنا",
        services_btn: "Request a Custom Design",
        gallery_title: "Our Work | أعمالنا",
        filter_all: "All",
        filter_stands: "Stands",
        filter_weddings: "Weddings",
        filter_engagement: "Engagement",
        filter_decor: "Decor",
        filter_custom: "Custom",
        filter_others: "Others",
        how_title: "How It Works | كيف يعمل",
        contact_title: "Get In Touch | تواصل معنا",
        contact_sub: "We are here to bring your vision to life",
        contact_wa: "WhatsApp",
        contact_ph: "Phone",
        contact_tk: "TikTok",
        footer_about: "Crafting elegance for your most precious moments. Luxury event decor and rentals in Sudan.",
        footer_explore: "Explore",
        footer_services: "Our Niche",
        footer_social: "Follow Us",
        footer_n1: "Weddings",
        footer_n2: "Engagements",
        footer_n3: "Corporate Events",
        footer_copy: "All rights reserved.",
        how_step1_t: "Contact Us",
        how_step1_d: "Via WhatsApp or phone to start the process.",
        how_step2_t: "Share Details",
        how_step2_d: "Tell us your event date and specific requirements.",
        how_step3_t: "Choose Items",
        how_step3_d: "Select the perfect pieces from our premium catalog.",
        how_step4_t: "We Deliver",
        how_step4_d: "Complete setup and collection at your venue."
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "من نحن",
        nav_services: "خدماتنا",
        nav_gallery: "أعمالنا",
        nav_how: "كيفية التأجير",
        nav_contact: "اتصل بنا",
        hero_title: "فيورة | FIORA",
        hero_tagline: "الفخامة تبدأ من هنا",
        hero_btn_gallery: "مشاهدة المعرض",
        hero_btn_contact: "تواصل معنا",
        feat_rental: "تأجير",
        feat_design: "تصميم",
        feat_delivery: "توصيل",
        about_sub: "قصتنا",
        about_title: "عن فيورة | About FIORA",
        about_p: "فيورة هي علامة تجارية فاخرة لتأجير ديكورات المناسبات، متخصصة في حوامل العرض الأنيقة والمرايا والتجهيزات المخصصة للخطوبة والزفاف والمناسبات الخاصة.",
        val_1: "الأناقة",
        val_2: "الجودة",
        val_3: "التخصيص",
        val_4: "التسليم في الوقت المحدد",
        services_title: "خدماتنا | Our Services",
        services_btn: "اطلب تصميماً خاصاً",
        gallery_title: "أعمالنا | Our Work",
        filter_all: "الكل",
        filter_stands: "ستاندات",
        filter_weddings: "أفراح",
        filter_engagement: "خطوبة",
        filter_decor: "ديكور",
        filter_custom: "خاص",
        filter_others: "أخرى",
        how_title: "كيف يعمل | How It Works",
        contact_title: "تواصل معنا | Get In Touch",
        contact_sub: "نحن هنا لتحويل رؤيتك إلى حقيقة",
        contact_wa: "واتساب",
        contact_ph: "الهاتف",
        contact_tk: "تيك توك",
        footer_about: "نصنع الأناقة لأغلى لحظاتك. تأجير ديكورات المناسبات الفاخرة في السودان.",
        footer_explore: "استكشف",
        footer_services: "مجالنا",
        footer_social: "تابعنا",
        footer_n1: "حفلات زفاف",
        footer_n2: "خطوبات",
        footer_n3: "مناسبات الشركات",
        footer_copy: "جميع الحقوق محفوظة.",
        how_step1_t: "تواصل معنا",
        how_step1_d: "عبر الواتساب أو الهاتف لبدء العملية.",
        how_step2_t: "شارك التفاصيل",
        how_step2_d: "أخبرنا بموعد مناسبتك ومتطلباتك الخاصة.",
        how_step3_t: "اختر القطع",
        how_step3_d: "اختر القطع المثالية من كتالوجنا المميز.",
        how_step4_t: "نحن نسلم",
        how_step4_d: "التجهيز الكامل والاستلام من موقعك."
    }
};

const serviceData = [
    { id: 1, icon: 'fas fa-th-large', en_t: 'Event Stand Rentals', en_d: 'Premium display stands for your event highlights.', ar_t: 'تأجير ستاندات المناسبات', ar_d: 'حوامل عرض فاخرة لتسليط الضوء على مناسبتك.' },
    { id: 2, icon: 'fas fa-gem', en_t: 'Jewelry & Ring Stands', en_d: 'Elegant solutions for engagement and wedding rings.', ar_t: 'ستاندات المجوهرات والشبكة', ar_d: 'حلول أنيقة لخواتم الخطوبة والزفاف.' },
    { id: 3, icon: 'fas fa-certificate', en_t: 'Wedding Preparations', en_d: 'Complete decor setups for your special day.', ar_t: 'تجهيزات الأفراح', ar_d: 'تجهيزات ديكور كاملة ليومك المميز.' },
    { id: 4, icon: 'fas fa-eye', en_t: 'Luxury Mirrors & Decor', en_d: 'Reflecting elegance through custom mirror designs.', ar_t: 'مرايا وديكورات فاخرة', ar_d: 'نعكس الأناقة من خلال تصميمات المرايا الخاصة.' },
    { id: 5, icon: 'fas fa-lightbulb', en_t: 'Modern Decor Pieces', en_d: 'Contemporary items to elevate your venue.', ar_t: 'قطع ديكور حديثة', ar_d: 'قطع عصرية لرفع مستوى مكان مناسبتك.' },
    { id: 6, icon: 'fas fa-drafting-table', en_t: 'Custom Execution', en_d: 'Bringing your unique design visions to life.', ar_t: 'التنفيذ الخاص', ar_d: 'نحول رؤيتك التصميمية الفريدة إلى واقع ملموس.' }
];

const galleryItems = [
    { id: 1, category: 'stands', en_t: 'Modern Minimalist Stand', en_d: 'Sleek contemporary display.', ar_t: 'ستاند عصري بسيط', ar_d: 'عرض عصري أنيق ومميز.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=60' },
    { id: 2, category: 'weddings', en_t: 'Floral Archway', en_d: 'Grand wedding entrance.', ar_t: 'قوس الزهور', ar_d: 'مدخل زفاف فاخر ومميز.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=60' },
    { id: 3, category: 'engagement', en_t: 'Diamond Display', en_d: 'Luxury velvet stand.', ar_t: 'عرض الشبكة', ar_d: 'ستاند مخملي فاخر للمجوهرات.', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=500&q=60' },
    { id: 4, category: 'others', en_t: 'Artistic Sculpture', en_d: 'Unique artistic decor.', ar_t: 'مجسم فني', ar_d: 'ديكور فني فريد ومميز.', img: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=500&q=60' },
    { id: 5, category: 'custom', en_t: 'Bespoke Mirror', en_d: 'Custom-made luxury mirror.', ar_t: 'مرآة مخصصة', ar_d: 'مرآة فاخرة مصنوعة خصيصاً.', img: 'https://images.unsplash.com/photo-1470753051111-e6e87f651717?auto=format&fit=crop&w=500&q=60' },
    { id: 6, category: 'stands', en_t: 'Vintage Gold', en_d: 'Classic tiered display.', ar_t: 'ستاند ذهبي كلاسيكي', ar_d: 'عرض كلاسيكي متعدد الطبقات.', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=60' }
];

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const preloader = document.getElementById('preloader');
    const langSwitch = document.getElementById('langSwitch');
    const galleryGrid = document.getElementById('galleryGrid');
    const servicesGrid = document.getElementById('servicesGrid');
    const timelineGrid = document.getElementById('timelineGrid');
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuClose = document.querySelector('.mobile-menu-close');

    // Preloader
    const hidePreloader = () => { if(preloader) preloader.classList.add('hidden'); };
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1500);

    // Navigation & Mobile Menu
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.onclick = (e) => { e.stopPropagation(); navLinks.classList.toggle('active'); };
        if(menuClose) menuClose.onclick = () => navLinks.classList.remove('active');
        navLinks.querySelectorAll('a').forEach(link => {
            link.onclick = () => navLinks.classList.remove('active');
        });
    }

    // Custom Gold Cursor
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.onmousemove = (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if(cursor) cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        if(follower) follower.style.transform = `translate(${followerX - 11}px, ${followerY - 11}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lbClose = document.querySelector('.lightbox-close');

    function openLightbox(imgSrc, captionText) {
        if(lightbox) {
            lightbox.style.display = "block";
            if(lightboxImg) lightboxImg.src = imgSrc;
            if(lightboxCaption) lightboxCaption.innerHTML = captionText;
            document.body.style.overflow = "hidden";
        }
    }
    if(lbClose) lbClose.onclick = () => { lightbox.style.display = "none"; document.body.style.overflow = "auto"; };
    window.onclick = (e) => { if (e.target == lightbox) { lightbox.style.display = "none"; document.body.style.overflow = "auto"; } };

    // Particle System
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        function setCanvasSize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        setCanvasSize(); window.onresize = setCanvasSize;
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(219, 192, 126, ' + (Math.random() * 0.2 + 0.05) + ')';
            }
            update() {
                this.x += this.speedX; this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
            }
            draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        for (let i = 0; i < 80; i++) particlesArray.push(new Particle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
    }

    // Language & Population
    function updateLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.textContent = translations[lang][key];
        });
        populateServices(); populateGallery(); populateTimeline();
    }

    function populateServices() {
        if (!servicesGrid) return;
        servicesGrid.innerHTML = '';
        serviceData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <i class="${item.icon}"></i>
                <h3>${currentLang === 'en' ? item.en_t : item.ar_t}</h3>
                <p>${currentLang === 'en' ? item.en_d : item.ar_d}</p>
            `;
            servicesGrid.appendChild(card);
        });
    }

    function populateGallery(filter = 'all') {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        const filtered = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = `gallery-card ${item.category}`;
            card.innerHTML = `
                <div class="gallery-image"><img src="${item.img}" alt="${item.en_t}"></div>
                <div class="gallery-info">
                    <h4>${currentLang === 'en' ? item.en_t : item.ar_t}</h4>
                    <p>${currentLang === 'en' ? item.en_d : item.ar_d}</p>
                </div>
            `;
            galleryGrid.appendChild(card);
            card.querySelector('.gallery-image').onclick = () => {
                openLightbox(item.img, currentLang === 'en' ? item.en_t : item.ar_t);
            };
        });
    }

    function populateTimeline() {
        if (!timelineGrid) return;
        timelineGrid.innerHTML = '';
        [1, 2, 3, 4].forEach(step => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="step-number">${step}</div>
                <div class="timeline-content">
                    <h4>${translations[currentLang][`how_step${step}_t`]}</h4>
                    <p>${translations[currentLang][`how_step${step}_d`]}</p>
                </div>
            `;
            timelineGrid.appendChild(item);
        });
    }

    if (langSwitch) {
        langSwitch.onclick = () => updateLanguage(currentLang === 'en' ? 'ar' : 'en');
    }

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            populateGallery(btn.getAttribute('data-filter'));
        };
    });

    window.onscroll = () => {
        if (window.scrollY > 80) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if (window.scrollY > 600) backToTopBtn.classList.add('visible'); else backToTopBtn.classList.remove('visible');
    };

    if(backToTopBtn) backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Initialize
    updateLanguage('ar');
});
