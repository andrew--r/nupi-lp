let $$ = require('./modules/$$.js');

document.addEventListener('DOMContentLoaded', () => {
  $$('.hero__icon').on('click', function() {
    $$('.modal')[0].classList.add('modal--visible');
    $$('body')[0].classList.add('no-scroll');
    $$('.modal__video iframe')[0].setAttribute('src', 'https://www.youtube-nocookie.com/embed/gLDYtH1RH-U?rel=0&showinfo=0&controls=0&enablejsapi=1&autoplay=1');
  });

  $$('.modal__close').on('click', function() {
    $$('.modal')[0].classList.remove('modal--visible');
    $$('body')[0].classList.remove('no-scroll');
    $$('.modal__video iframe')[0].setAttribute('src', '');
  });
});