document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. PRELOADER & FADE-OUT LOGIC
       ========================================================================== */
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add("fade-out");
        }, 800); // Tạo độ trễ thẩm mỹ cảm nhận sự mượt mà
    });

    // Phòng hờ sự kiện load bị trễ quá lâu từ bên ngoài
    setTimeout(() => {
        if (preloader && !preloader.classList.contains("fade-out")) {
            preloader.classList.add("fade-out");
        }
    }, 3000);


    /* ==========================================================================
       2. STICKY NAVBAR & BACK TO TOP BUTTON LOGIC
       ========================================================================== */
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    const heroSection = document.getElementById("hero");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 500;

        // Sticky Navbar
        if (scrollPos > 50) {
            navbar.classList.add("navbar--sticky");
        } else {
            navbar.classList.remove("navbar--sticky");
        }

        // Back to Top Button
        if (scrollPos > heroHeight - 100) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* ==========================================================================
       3. MOBILE RESPONSIVE HAMBURGER MENU
       ========================================================================== */
    const navbarToggle = document.getElementById("navbarToggle");
    const navbarMenu = document.getElementById("navbarMenu");
    const navbarLinks = document.querySelectorAll(".navbar__link");

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener("click", () => {
            navbarMenu.classList.toggle("active");
            const icon = navbarToggle.querySelector("i");
            if(navbarMenu.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Đóng menu khi nhấp link
        navbarLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbarMenu.classList.remove("active");
                navbarToggle.querySelector("i").className = "fa-solid fa-bars";
            } );
        });
    }


    /* ==========================================================================
       4. SCROLL PARALLAX SYSTEM FOR HERO SECTION
       ========================================================================== */
    const parallaxBg = document.querySelector(".hero-section__parallax");
    window.addEventListener("scroll", () => {
        if (parallaxBg) {
            let offset = window.scrollY;
            parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
        }
    });


    /* ==========================================================================
       5. INTERACTIVE CINEMATIC VIDEO CONTROLLER
       ========================================================================== */
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const videoEmbed = document.getElementById("videoEmbed");

    if (videoPlaceholder && videoEmbed) {
        videoPlaceholder.addEventListener("click", () => {
            videoPlaceholder.style.display = "none";
            // Kích hoạt autoplay tự động chạy video Youtube ẩn phía sau
            const iframe = videoEmbed.querySelector("iframe");
            if (iframe) {
                let src = iframe.src;
                if (src.indexOf("autoplay=1") === -1) {
                    iframe.src = src.indexOf("?") !== -1 ? `${src}&autoplay=1` : `${src}?autoplay=1`;
                }
            }
        });
    }


    /* ==========================================================================
       6. INTERSECTION OBSERVER FOR FADE-IN & REVEAL SYSTEM
       ========================================================================== */
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Tắt theo dõi sau khi đã hiển thị để tăng hiệu năng thiết bị
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       7. MINI-CART LOGIC WITH FLY-TO-CART SIMULATION
       ========================================================================== */
    const buyButtons = document.querySelectorAll(".btn-buy-now");
    const cartCountEl = document.getElementById("cartCount");
    let currentCartCount = 0;

    buyButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentCartCount++;
            if(cartCountEl) cartCountEl.innerText = currentCartCount;

            // Hiệu ứng Visual Feedbacks đơn giản cao cấp dạng toast notification thu nhỏ
            const toast = document.createElement("div");
            toast.style.position = "fixed";
            toast.style.bottom = "30px";
            toast.style.left = "30px";
            toast.style.backgroundColor = "#0077C8";
            toast.style.color = "#FFF";
            toast.style.padding = "1rem 2rem";
            toast.style.borderRadius = "8px";
            toast.style.zIndex = "9999";
            toast.style.fontWeight = "600";
            toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            toast.innerText = "✓ Đã thêm sản phẩm Fujiwa vào giỏ hàng thành công!";
            
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        });
    });


    /* ==========================================================================
       8. PRODUCT CAROUSEL SYSTEM (SMOOTH SLIDER)
       ========================================================================== */
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");

    if (track && prevBtn && nextBtn) {
        let index = 0;
        
        function getSlideWidth() {
            const item = track.querySelector(".carousel-item");
            const style = window.getComputedStyle(item);
            const marginRight = parseFloat(style.marginRight) || 0;
            const gap = parseFloat(window.getComputedStyle(track).gap) || marginRight;
            return item.offsetWidth + gap;
        }

        function updateCarouselPosition() {
            const items = track.querySelectorAll(".carousel-item").length;
            const containerWidth = track.parentElement.offsetWidth;
            const totalWidth = track.scrollWidth;
            const maxIndex = Math.max(0, Array.from(track.children).length - Math.floor(containerWidth / getSlideWidth()));
            
            if (index > maxIndex) index = maxIndex;
            if (index < 0) index = 0;

            const moveAmount = index * getSlideWidth();
            track.style.transform = `translateX(-${moveAmount}px)`;
        }

        nextBtn.addEventListener("click", () => {
            const containerWidth = track.parentElement.offsetWidth;
            const maxIndex = Array.from(track.children).length - Math.floor(containerWidth / getSlideWidth());
            if (index < maxIndex) { index++; } else { index = 0; } // Vòng lặp vô hạn giả lập
            updateCarouselPosition();
        });

        prevBtn.addEventListener("click", () => {
            if (index > 0) { index--; } else { index = Array.from(track.children).length - 4; }
            if (index < 0) index = 0;
            updateCarouselPosition();
        });

        window.addEventListener("resize", updateCarouselPosition);
    }


    /* ==========================================================================
       9. TRIPLE BEFORE/AFTER INTERACTIVE SLIDERS SYNCHRONIZER
       ========================================================================== */
    const baSliders = document.querySelectorAll(".ba-slider");

    baSliders.forEach(slider => {
        const rangeInput = slider.querySelector(".ba-range");
        const afterView = slider.querySelector(".ba-slider__after");
        const handle = slider.querySelector(".ba-handle");

        if (rangeInput && afterView && handle) {
            rangeInput.addEventListener("input", (e) => {
                const value = e.target.value;
                afterView.style.width = `${value}%`;
                handle.style.left = `${value}%`;
            });
        }
    });


    /* ==========================================================================
       10. MASONRY GALLERY FILTER & LIGHTBOX MODAL LOGIC
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let activeGalleryArray = Array.from(galleryItems);
    let currentLightboxIndex = 0;

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Đổi class nút active
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            const masonry = document.getElementById("galleryMasonry");
            
            // Xử lý ẩn hiện phần tử
            activeGalleryArray = [];
            galleryItems.forEach(item => {
                const itemCat = item.getAttribute("data-category");
                if (filterValue === "all" || itemCat === filterValue) {
                    item.style.display = "block";
                    activeGalleryArray.push(item);
                } else {
                    item.style.style = "none"; 
                    item.style.display = "none";
                }
            });
        });
    });

    // Lightbox Logic
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            currentLightboxIndex = activeGalleryArray.indexOf(item);
            if(currentLightboxIndex === -1) currentLightboxIndex = 0;
            openLightbox(activeGalleryArray[currentLightboxIndex]);
        });
    });

    function openLightbox(element) {
        if(!element || !lightboxModal || !lightboxImg) return;
        const imgSrc = element.querySelector("img").src;
        lightboxImg.src = imgSrc;
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Khóa cuộn trang nền
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightboxModal.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
            if(activeGalleryArray.length === 0) return;
            currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryArray.length;
            lightboxImg.src = activeGalleryArray[currentLightboxIndex].querySelector("img").src;
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => {
            if(activeGalleryArray.length === 0) return;
            currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryArray.length) % activeGalleryArray.length;
            lightboxImg.src = activeGalleryArray[currentLightboxIndex].querySelector("img").src;
        });
    }


    /* ==========================================================================
       11. DYNAMIC NUMBER COUNTER ANIMATION ENGINE
       ========================================================================== */
    const counterBoxes = document.querySelectorAll(".counter-box__number");
    const statsSection = document.getElementById("stats");
    let counterAnimated = false;

    function startCounters() {
        counterBoxes.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            const duration = 2000; // 2 giây hoàn thành chuyển động chạy số
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            
            // Định lượng bước nhảy số lớn để chạy mượt
            let increment = Math.ceil(target / (duration / stepTime));

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Định dạng hiển thị chuỗi cao cấp phân tách hàng ngàn
                if(target >= 1000000) {
                    counter.innerText = (current / 1000000).toFixed(0) + "M+";
                } else if (target === 2018) {
                    counter.innerText = current; // Năm thành lập giữ nguyên định dạng
                } else {
                    counter.innerText = current.toLocaleString("vi-VN") + "+";
                }
            }, stepTime);
        });
    }

    // Monitor scroll viewport trigger counters
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    startCounters();
                    counterAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(statsSection);
    }


    /* ==========================================================================
       12. INTERACTIVE PURCHASE HUB & AGENCY LIST INTERACTION
       ========================================================================== */
    const agencyItems = document.querySelectorAll(".agency-item");
    const mapMarkers = document.querySelectorAll(".map-marker");
    const searchInput = document.getElementById("agencySearchInput");

    agencyItems.forEach((item, idx) => {
        item.addEventListener("click", () => {
            agencyItems.forEach(i => i.classList.remove("active"));
            mapMarkers.forEach(m => m.classList.remove("active"));

            item.classList.add("active");
            
            // Giả lập map marker đồng bộ
            if(mapMarkers[idx]) {
                mapMarkers[idx].classList.add("active");
            }
        });
    });

    // Thanh tìm kiếm đại lý đơn giản
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const val = e.target.value.toLowerCase().trim();
            agencyItems.forEach(item => {
                const title = item.querySelector("h5").innerText.toLowerCase();
                const addr = item.querySelector("p").innerText.toLowerCase();
                if (title.includes(val) || addr.includes(val)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }


    /* ==========================================================================
       13. TESTIMONIAL AUTOMATIC SLIDER VÒNG LẶP VÔ HẠN
       ========================================================================== */
    const tTrack = document.getElementById("testimonialTrack");
    const tCards = document.querySelectorAll(".testimonial-card");
    let tIndex = 0;

    if (tTrack && tCards.length > 0) {
        setInterval(() => {
            tIndex = (tIndex + 1) % tCards.length;
            tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
        }, 4000); // 4 giây tự động đổi thẻ đánh giá
    }


    /* ==========================================================================
       14. VALIDATION FORM ĐĂNG KÝ LIÊN HỆ
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isFormValid = true;

            const inputs = contactForm.querySelectorAll("[required]");
            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add("invalid");
                    isFormValid = false;
                } else {
                    group.classList.remove("invalid");
                }
                
                // Kiểm tra riêng regex điện thoại
                if(input.id === "formPhone" && input.value.trim()) {
                    const phoneRegex = /^[0-9]{10,11}$/;
                    if(!phoneRegex.test(input.value.trim())) {
                        group.classList.add("invalid");
                        isFormValid = false;
                    }
                }
            });

            if (isFormValid) {
                alert("Cảm ơn bạn đã gửi liên hệ! Chuyên viên cấp cao của Fujiwa Việt Nam sẽ gọi lại ngay lập tức.");
                contactForm.reset();
                // Reset floating classes
                contactForm.querySelectorAll(".form-group").forEach(g => g.classList.remove("invalid"));
            }
        });

        // Xóa thông báo lỗi khi người dùng gõ phím lại
        contactForm.querySelectorAll(".form-input").forEach(input => {
            input.addEventListener("input", () => {
                input.parentElement.classList.remove("invalid");
            });
        });
    }


    /* ==========================================================================
       15. ACTIVE NAV MENU LINK ON SCROLL POSITION
       ========================================================================== */
    const navSections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollY = window.scrollY;

        navSections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href").substring(1);
            if (href === currentSectionId || (currentSectionId === "campaign-video" && href === "")) {
                link.classList.add("active");
            }
        });
    });
});