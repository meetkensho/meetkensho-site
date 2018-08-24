$(function () {

  const $testimonals = $('.single-testimonial');
  const $dots = $('.carousel-dots img');

  const size = $testimonals.length;
  var index = 0;
  var isFadding = false;

  $testimonals.hide();
  $testimonals.first().show();

  function changeTestimonal() {
    isFadding = true;
    $testimonals.eq(index).fadeOut(500, function () {
      isFadding = false;
      $testimonals.hide();
      $testimonals.eq(index).fadeIn(500);
    });
  }

  function switchIdx(newIndex) {
    if (isFadding) return;
    changeTestimonal();
    index = newIndex;
    updateDots();
  }

  function updateDots() {
    $dots.attr('src', './img/oval-inactive.png');
    $dots.eq(index).attr('src', './img/oval-active.png');
  }

  $dots.click(function () {
    switchIdx($(this).index());
  });

  $('.next.arrow-button').click(function () {
    switchIdx((index + 1) % size);
  });

  $('.previous.arrow-button').click(function () {
    switchIdx((size + index - 1) % size);
  });

});
