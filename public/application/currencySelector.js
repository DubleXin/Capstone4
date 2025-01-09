$(document).on('click', '.link', function (e) {
  const target = e.currentTarget;

  const currency = Object.keys(target.dataset)[0];
  $('.link').each(function () {
    $(this).removeClass('active-link');
  });
  $(`[data-${currency}]`).addClass('active-link');
});
