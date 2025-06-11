// Carrusel dinámico
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    let current = 0;

    // Oculta todas las imágenes excepto la actual
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    // Botones de navegación
    let prevBtn = carousel.querySelector('.carousel-prev');
    let nextBtn = carousel.querySelector('.carousel-next');
    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.textContent = '‹';
        prevBtn.className = 'carousel-btn carousel-prev';
        carousel.appendChild(prevBtn);
    }
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.textContent = '›';
        nextBtn.className = 'carousel-btn carousel-next';
        carousel.appendChild(nextBtn);
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        showImage(current);
    });

    // Swipe para móvil
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        if (endX < startX - 30) {
            // Swipe izquierda: siguiente imagen
            current = (current + 1) % images.length;
            showImage(current);
        } else if (endX > startX + 30) {
            // Swipe derecha: imagen anterior
            current = (current - 1 + images.length) % images.length;
            showImage(current);
        }
    });

    // Cambio automático cada 4 segundos (opcional)
    setInterval(() => {
        current = (current + 1) % images.length;
        showImage(current);
    }, 4000);

    showImage(current);
});


// Banner con texto deslizante
document.addEventListener('DOMContentLoaded', function() {
    const promo = document.querySelector('.promo-message');
    if (promo) {
        promo.style.overflow = 'hidden';
        promo.style.position = 'relative';

        const text = document.createElement('div');
        text.textContent = promo.textContent;
        text.style.whiteSpace = 'nowrap';
        text.style.position = 'absolute';
        text.style.left = '100%';
        text.style.top = '50%';
        text.style.transform = 'translateY(-50%)';
        text.style.fontSize = '1.1em';

        promo.textContent = '';
        promo.appendChild(text);

        let pos = promo.offsetWidth;
        function animate() {
            pos -= 1;
            if (pos < -text.offsetWidth) {
                pos = promo.offsetWidth;
            }
            text.style.left = pos + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }
});

// Menú móvil desplegable
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });
    }

    submenuToggles.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = btn.nextElementSibling;
            submenu.classList.toggle('open');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (
            mobileNav.classList.contains('open') &&
            !mobileNav.contains(e.target) &&
            e.target !== menuToggle
        ) {
            mobileNav.classList.remove('open');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.product-slider');
    if (!slider) return;
    const productList = slider.querySelector('.product-list');
    const products = productList.querySelectorAll('.product-box');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const visibleCount = 4;
    let start = 0;

    function getBoxWidth() {
        // Calcula el ancho real incluyendo margen
        const style = window.getComputedStyle(products[0]);
        const width = products[0].offsetWidth;
        const marginLeft = parseInt(style.marginLeft) || 0;
        const marginRight = parseInt(style.marginRight) || 0;
        return width + marginLeft + marginRight;
    }

    function updateSlider() {
        const boxWidth = getBoxWidth();
        const maxStart = Math.max(0, products.length - visibleCount);
        const offset = -start * boxWidth;
        productList.style.transform = `translateX(${offset}px)`;
        prevBtn.disabled = start === 0;
        nextBtn.disabled = start >= maxStart;
    }

    prevBtn.addEventListener('click', () => {
        if (start > 0) {
            start--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (start < products.length - visibleCount) {
            start++;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');

    images.forEach(img => {
        img.addEventListener('click', function() {  
            modal.classList.add('open');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
        modalImg.src = '';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            modalImg.src = '';
        }
    });
});