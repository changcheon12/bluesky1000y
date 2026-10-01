// 풍류 스크립트 (외부 라이브러리 없음)
(function () {
  'use strict';

  // 맨 위에서 벗어나면 메뉴 배경 켜기 (scroll 이벤트 대신 IntersectionObserver)
  var nav = document.getElementById('nav');
  var sentinel = document.getElementById('nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-solid', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  // 스크롤 등장 (한 번만). 지원하지 않는 브라우저에서는 바로 보이게 함
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
})();
