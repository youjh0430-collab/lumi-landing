/**
 * Role: 루미(Lumi) 랜딩페이지 인터랙션 스크립트
 * Key Features: D-day 카운터, FAQ 아코디언, 모달, 햄버거 메뉴, 스크롤 애니메이션
 * Dependencies: 없음 (바닐라 JS)
 */

// ==========================================
// D-day 카운터 — 런칭일 경과 시 배너 자체를 숨김
// ==========================================
(function initDday() {
    const launch = new Date('2026-03-30');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((launch - today) / (1000 * 60 * 60 * 24));

    const el = document.getElementById('dday-badge');
    const container = document.getElementById('dday-container');
    if (!el || !container) return;

    if (diff > 0) {
        el.textContent = 'D-' + diff;
    } else if (diff === 0) {
        el.textContent = 'D-DAY';
    } else {
        // 런칭일 지남 → 배너 숨김
        container.classList.add('hidden');
    }
})();

// ==========================================
// FAQ 아코디언
// ==========================================
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
    });
    if (!isOpen) item.classList.add('open');
}

// ==========================================
// 모달 열기/닫기
// ==========================================
function openModal() {
    document.getElementById('trialModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // 최소 방문일 설정 (내일부터)
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var minDate = tomorrow.toISOString().split('T')[0];
    var visitDateEl = document.getElementById('visitDate');
    if (visitDateEl) visitDateEl.min = minDate;
}

function closeModal() {
    var modal = document.getElementById('trialModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // 폼/완료 화면 초기화 (다음에 열 때를 위해)
    setTimeout(function () {
        var form = modal.querySelector('.modal-form');
        var header = modal.querySelector('.modal-header');
        var success = modal.querySelector('.modal-success');
        if (form) { form.style.display = ''; form.reset(); }
        if (header) header.style.display = '';
        if (success) success.classList.remove('active');
    }, 300);
}

function closeModalOutside(e) {
    if (e.target === document.getElementById('trialModal')) closeModal();
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});

// 폼 제출 처리
function submitForm(e) {
    e.preventDefault();
    document.querySelector('.modal-form').style.display = 'none';
    document.querySelector('.modal-header').style.display = 'none';
    document.querySelector('.modal-success').classList.add('active');
}

// 모달 여는 버튼 전체 연결
document.querySelectorAll('a[href="#cta"], a[href="#"]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    });
});

// ==========================================
// 모바일 햄버거 메뉴
// ==========================================
(function initHamburger() {
    var hamburger = document.getElementById('navHamburger');
    var mobileMenu = document.getElementById('navMobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
})();

// ==========================================
// 스크롤 애니메이션 (Intersection Observer)
// ==========================================
(function initScrollAnimation() {
    var targets = document.querySelectorAll('.fade-up');
    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(function (el) {
        observer.observe(el);
    });
})();
