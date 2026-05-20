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
        how_step4_d: "Complete setup and collection at your venue.",
        load_more: "Load More"
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
        how_step4_d: "التجهيز الكامل والاستلام من موقعك.",
        load_more: "إظهار المزيد"
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

// Initialize App Functions (Immediately invoked for Next.js compatibility)
const initApp = () => {
    // Elements
    const preloader = document.getElementById('preloader');
    const langSwitch = document.getElementById('langSwitch');
    const servicesCircular = document.querySelector('.services-circular-container');
    const servicesMobile = document.getElementById('servicesMobileCarousel');
    const timelineGrid = document.getElementById('timelineGrid');
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('backToTop');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuClose = document.querySelector('.mobile-menu-close');

    // Preloader - Robust hiding for Next.js
    const hidePreloader = () => { 
        const loader = document.getElementById('preloader');
        if(loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
    // Safety fallback
    setTimeout(hidePreloader, 2000);

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
    // Language Toggle
    function updateLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update static UI elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
        });
    }

    // Gallery State
    let currentGalleryFilter = 'all';
    let currentGalleryLimit = 5;

    function resizeGridItem(item) {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;
        
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('column-gap')) || 12;
        
        let contentHeight = 0;
        const imgWrapper = item.querySelector('.gallery-image');
        if (imgWrapper) {
            const img = imgWrapper.querySelector('img');
            // If the image is loaded, use its height, else fallback to wrapper height
            contentHeight += img && img.complete ? img.getBoundingClientRect().height : imgWrapper.getBoundingClientRect().height;
        }
        
        const info = item.querySelector('.gallery-info');
        if (info) contentHeight += info.getBoundingClientRect().height;
        
        // Account for grid-gap spacing inside the span
        const rowSpan = Math.ceil((contentHeight + rowGap) / rowHeight);
        item.style.gridRowEnd = "span " + rowSpan;
    }

    function resizeAllGridItems() {
        const allItems = document.querySelectorAll(".gallery-card");
        allItems.forEach(item => {
            if (item.style.display !== 'none') {
                resizeGridItem(item);
            }
        });
    }

    function renderGallery() {
        const cards = Array.from(document.querySelectorAll('.gallery-card'));
        let visibleCount = 0;
        let totalInFilter = 0;

        cards.forEach(card => {
            const filterMatch = currentGalleryFilter === 'all' || card.classList.contains(currentGalleryFilter);
            if (filterMatch) {
                totalInFilter++;
                if (visibleCount < currentGalleryLimit) {
                    card.style.display = 'block'; // Block display for grid items
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });

        const loadMoreBtnContainer = document.getElementById('galleryLoadMore');
        if (loadMoreBtnContainer) {
            if (currentGalleryLimit >= totalInFilter) {
                loadMoreBtnContainer.style.display = 'none';
            } else {
                loadMoreBtnContainer.style.display = 'block';
            }
        }

        // Trigger height recalculation immediately and after a short delay
        resizeAllGridItems();
        setTimeout(resizeAllGridItems, 100);
    }

    // Call initially and when images load
    setTimeout(() => {
        renderGallery();
        
        const allGalleryImages = document.querySelectorAll('.gallery-image img');
        allGalleryImages.forEach(img => {
            if (img.complete) {
                resizeAllGridItems();
            } else {
                img.addEventListener('load', resizeAllGridItems);
            }
        });
    }, 100);

    window.addEventListener('resize', resizeAllGridItems);

    // Event Delegation for bulletproof Next.js integration
    document.addEventListener('click', (e) => {
        // Load More Button
        const loadMoreBtn = e.target.closest('#loadMoreBtn');
        if (loadMoreBtn) {
            e.preventDefault();
            currentGalleryLimit += 5;
            renderGallery();
            return;
        }

        // Language Switcher
        const langBtn = e.target.closest('#langSwitch');
        if (langBtn) {
            e.preventDefault();
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
            return;
        }

        // Gallery Filters
        const filterBtn = e.target.closest('.filter-btn');
        if (filterBtn) {
            e.preventDefault();
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            filterBtn.classList.add('active');
            
            // Update existing state and re-render
            currentGalleryFilter = filterBtn.getAttribute('data-filter') || 'all';
            currentGalleryLimit = 5; // Reset limit when filter changes
            renderGallery();
            
            return;
        }
    });

    window.onscroll = () => {
        if (window.scrollY > 80) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if (window.scrollY > 600) backToTopBtn.classList.add('visible'); else backToTopBtn.classList.remove('visible');
    };

    if(backToTopBtn) backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // -------------------------------------------------------------
    // REDESIGNED SERVICES SECTION INTERACTIVITY
    // -------------------------------------------------------------
    const orbitWrapper = document.getElementById('servicesOrbitWrapper');
    const svgConnections = document.getElementById('servicesConnections');
    const linesGroup = document.getElementById('dynamicLinesGroup');
    const circularCards = document.querySelectorAll('.service-card-circular');
    
    // Desktop/Tablet Circular Layout
    if (orbitWrapper && circularCards.length > 0) {
        const total = circularCards.length;
        
        let angleOffset = 0;
        let isHovered = false;
        let animationFrameId;
        
        function updateOrbitPositions() {
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
            const isMobile = window.innerWidth <= 768;
            if (isMobile) return;
            
            const radiusX = isTablet ? 320 : 450;
            const radiusY = isTablet ? 150 : 200;
            const centerX = 500; // SVG viewBox center (1000x500)
            const centerY = 250;
            const innerRadius = 100; // Logo border radius
            
            circularCards.forEach((card, index) => {
                const baseAngle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
                const angle = baseAngle + angleOffset;
                
                // Position card container relative to center orbit wrapper
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;
                card.style.left = '50%';
                card.style.top = '50%';
                card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                
                // Keep the card upright since we are not rotating the wrapper
                const counter = card.querySelector('.service-card-counter');
                if (counter) {
                    counter.style.transform = `rotate(0deg)`;
                }
                
                // Calculate SVG line points
                let line = document.getElementById(`connection-line-${index}`);
                if (!line) {
                    line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    line.id = `connection-line-${index}`;
                    line.setAttribute('stroke', 'var(--primary-gold)');
                    line.setAttribute('stroke-width', '1.5');
                    line.setAttribute('fill', 'none');
                    line.setAttribute('opacity', '0.35');
                    line.style.transition = 'opacity 0.4s, stroke-width 0.4s, filter 0.4s';
                    linesGroup.appendChild(line);
                }

                const startX = centerX + Math.cos(angle) * innerRadius;
                const startY = centerY + Math.sin(angle) * innerRadius;
                // Offset ends roughly 80px before card center
                const endX = centerX + Math.cos(angle) * (radiusX - 80);
                const endY = centerY + Math.sin(angle) * (radiusY - 80);
                
                // Elegant cubic bezier curve
                const controlPointOffset = 60;
                const cp1x = startX + Math.cos(angle) * controlPointOffset;
                const cp1y = startY + Math.sin(angle) * controlPointOffset;
                const cp2x = endX - Math.cos(angle) * controlPointOffset;
                const cp2y = endY - Math.sin(angle) * controlPointOffset;

                line.setAttribute('d', `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
                
                // Add marker if not added (we use CSS for marker to allow transition, or inline)
                line.setAttribute('marker-end', 'url(#arrow)');
            });
        }

        function setupCircularLayout() {
            linesGroup.innerHTML = ''; // Reset on resize
            updateOrbitPositions();
        }
        
        setupCircularLayout();
        window.addEventListener('resize', setupCircularLayout);
        
        function animateOrbit() {
            if (!isHovered) {
                angleOffset += 0.0015; // Smooth, slow radian increment (floating feel)
                if (angleOffset >= Math.PI * 2) angleOffset -= Math.PI * 2;
                updateOrbitPositions();
            }
            animationFrameId = requestAnimationFrame(animateOrbit);
        }
        
        // Add hover listener on .service-card-inner
        circularCards.forEach((card, index) => {
            const cardInner = card.querySelector('.service-card-inner');
            if (cardInner) {
                cardInner.addEventListener('mouseenter', () => {
                    isHovered = true;
                    const line = document.getElementById(`connection-line-${index}`);
                    if (line) {
                        line.style.strokeWidth = '2.5';
                        line.style.opacity = '0.9';
                        line.style.filter = 'drop-shadow(0 0 8px rgba(219, 192, 126, 0.8))';
                    }
                });
                cardInner.addEventListener('mouseleave', () => {
                    isHovered = false;
                    const line = document.getElementById(`connection-line-${index}`);
                    if (line) {
                        line.style.strokeWidth = '1.5';
                        line.style.opacity = '0.35';
                        line.style.filter = 'none';
                    }
                });
            }
        });
        
        animateOrbit();
    }

    // Mobile Vertical 3D Stack Carousel
    const mobileCarousel = document.getElementById('servicesMobileCarousel');
    const mobileCards = document.querySelectorAll('.service-card-mobile');
    const indicators = document.querySelectorAll('#mobileCarouselIndicators .indicator');
    
    if (mobileCarousel && mobileCards.length > 0) {
        let activeIndex = 0;
        const totalMobile = mobileCards.length;
        let mobileTimer = null;
        
        function updateMobileCarousel() {
            mobileCards.forEach((card, index) => {
                card.className = 'service-card-mobile'; // Reset classes
                
                if (index === activeIndex) {
                    card.classList.add('active');
                } else if (index === (activeIndex - 1 + totalMobile) % totalMobile) {
                    card.classList.add('prev');
                } else if (index === (activeIndex + 1) % totalMobile) {
                    card.classList.add('next');
                }
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === activeIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        function nextMobileCard() {
            activeIndex = (activeIndex + 1) % totalMobile;
            updateMobileCarousel();
        }
        
        function prevMobileCard() {
            activeIndex = (activeIndex - 1 + totalMobile) % totalMobile;
            updateMobileCarousel();
        }
        
        function startMobileAutoplay() {
            stopMobileAutoplay();
            mobileTimer = setInterval(nextMobileCard, 4500); // 4.5 seconds interval
        }
        
        function stopMobileAutoplay() {
            if (mobileTimer) {
                clearInterval(mobileTimer);
                mobileTimer = null;
            }
        }
        
        // Interaction: Tap prev/next cards to navigate directly
        mobileCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (card.classList.contains('prev')) {
                    prevMobileCard();
                    startMobileAutoplay();
                } else if (card.classList.contains('next')) {
                    nextMobileCard();
                    startMobileAutoplay();
                }
            });
        });
        
        // Interaction: Tap indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                activeIndex = index;
                updateMobileCarousel();
                startMobileAutoplay();
            });
        });
        
        // Interaction: Swipe support
        let startY = 0;
        let endY = 0;
        
        mobileCarousel.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            stopMobileAutoplay();
        }, { passive: true });
        
        mobileCarousel.addEventListener('touchend', (e) => {
            endY = e.changedTouches[0].clientY;
            const diffY = startY - endY;
            
            if (Math.abs(diffY) > 50) { // Threshold of 50px
                if (diffY > 0) {
                    nextMobileCard(); // Swiped up -> next
                } else {
                    prevMobileCard(); // Swiped down -> prev
                }
            }
            startMobileAutoplay();
        }, { passive: true });
        
        // Initial setup
        updateMobileCarousel();
        startMobileAutoplay();
    }

    // Initialize
    updateLanguage('ar');
};

// Run initialization immediately or when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
