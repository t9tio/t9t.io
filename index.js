// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function() {

  
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);

    document.addEventListener('click', function() {
      burger.classList.remove('is-active');
      menu.classList.remove('is-active');
    });

    burger.addEventListener('click', function(event) {
      event.stopPropagation();
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });

    // typed.js
    var options = {
      strings: ["t9t^1300", "transparent"],
      typeSpeed: 60,
      backSpeed: 30
    }
    
    var typed = new Typed("#typedEl", options);

})();