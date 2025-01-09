import { IconController } from './app.js';

$(document).on('click', function (event) {
  const isDropdownButton = event.target.matches('[data-dropdown-button]');
  const isDropdown = event.target.matches('[data-dropdown]');
  const isDropdownChild =
    event.target.closest('[data-dropdown]') != null &&
    !$(event.target).closest('.dropdown-menu').length;

  const dropdownButton = $(event.target.closest('[data-dropdown-button]'));
  const dropdown = $(event.target.closest('[data-dropdown]'));
  if (
    (isDropdownButton || isDropdown || isDropdownChild) &&
    $('[data-dropdown-button]').not(dropdown).hasClass('active')
  ) {
    $('[data-dropdown-button]').not(dropdown).removeClass('active');
    IconController.forceDisableIcon($('.dropdown-arrow'));
    return;
  }

  if (
    (!isDropdownButton || dropdown.length > 0) &&
    event.target.closest('[data-dropdown-button]') == null
  ) {
    $('[data-dropdown-button]').not(dropdown).removeClass('active');

    IconController.forceDisableIcon($('.dropdown-arrow'));
    return;
  }
  if (!$(dropdownButton).hasClass('active')) {
    $(dropdownButton).addClass('active');
    IconController.forceEnableIcon($('.dropdown-arrow'));
  }
});
