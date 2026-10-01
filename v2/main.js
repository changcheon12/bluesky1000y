// 창천 2기 홈페이지 스크립트 (외부 라이브러리 없음)
(function () {
  'use strict';

  // 1) 오늘 요일 강조 (한국 시간 기준)
  try {
    var dow = new Date().toLocaleDateString('en-US', { weekday: 'short', timeZone: 'Asia/Seoul' });
    var today = document.querySelector('.week__day[data-dow="' + dow + '"]');
    if (today) today.classList.add('is-today');
  } catch (e) { /* 요일 강조만 생략 */ }

  // 2) 맨 위에서 벗어나면 메뉴 배경 켜기 (scroll 이벤트 대신 IntersectionObserver)
  var nav = document.getElementById('nav');
  var sentinel = document.getElementById('nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-solid', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  // 3) 스크롤 등장 (한 번만). 지원하지 않는 브라우저에서는 바로 보이게 함
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // 4) 카카오톡 ID 복사
  var btn = document.getElementById('copy-btn');
  var status = document.getElementById('copy-status');
  var idEl = document.getElementById('kakao-id');
  if (btn && status && idEl) {
    btn.addEventListener('click', function () {
      var text = idEl.textContent.trim();
      var done = function (msg) {
        status.textContent = msg;
        setTimeout(function () { status.textContent = ''; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done('복사했습니다.'); },
          function () { done('복사하지 못했습니다. ID를 직접 선택해 복사해 주세요.'); }
        );
      } else {
        done('복사하지 못했습니다. ID를 직접 선택해 복사해 주세요.');
      }
    });
  }
})();
