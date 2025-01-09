import { IconController } from './app.js';

$('.theme-btn').on('click', function (e) {
  changeThemes();
  IconController.switchIcons($('.theme-icon'));
});

function changeThemes() {
  const DARK = 'dark';
  const LIGHT = 'light';
  const CURRENT = $('html').attr('data-theme');
  let themeToSet = CURRENT == DARK ? LIGHT : DARK;
  $('html').attr('data-theme', themeToSet);
}
