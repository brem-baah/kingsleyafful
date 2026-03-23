const header = document.getElementById('main-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
hamburger.addEventListener('click', () => { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; });
mobileClose.addEventListener('click', () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; });
document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }));


const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Animate charts if applicable
            if (e.target.id === 'results' || e.target.querySelector('.chart-container')) {
                animateCharts();
            }
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Chart Animation
function animateCharts() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const height = bar.getAttribute('style').match(/--h:\s*(\d+)%/)[1];
        setTimeout(() => {
            bar.style.height = height + '%';
        }, 200);
    });
}


// Modal Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalVideo = document.getElementById('modalVideo');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.portfolio-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const video = card.querySelector('video');
        const title = card.querySelector('.p-title').innerText;
        const tag = card.querySelector('.p-tag').innerText;
        
        modal.style.display = 'block';
        modalCaption.innerHTML = `<strong>${title}</strong><br>${tag}`;
        document.body.style.overflow = 'hidden'; 

        if (video) {
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = video.querySelector('source') ? video.querySelector('source').src : video.src;
            modalVideo.play();
        } else {
            modalVideo.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = img.src;
        }
    });
});

const closeModal = () => {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = ""; // Clear src to stop loading/playback
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
