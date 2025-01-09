export default class IconController {
  static #disabledClassName = 'disabled';
  static #iconOffClassName = 'icon-off';
  static #iconOnClassName = 'icon-on';

  static switchIcons(icons) {
    let index = IconController.#findIndex(icons);
    if (index < 0) return;
    $(icons[index]).removeClass(IconController.#disabledClassName);
    $(icons[1 - index]).addClass(IconController.#disabledClassName);
  }

  static forceEnableIcon(icons) {
    let index = IconController.#findIndex(
      icons,
      IconController.#iconOffClassName
    );
    if (index < 0) return;

    $(icons[index]).removeClass(IconController.#disabledClassName);
    $(icons[1 - index]).addClass(IconController.#disabledClassName);
  }

  static forceDisableIcon(icons) {
    let index = IconController.#findIndex(
      icons,
      IconController.#iconOnClassName
    );
    if (index < 0) return;
    $(icons[index]).removeClass(IconController.#disabledClassName);
    $(icons[1 - index]).addClass(IconController.#disabledClassName);
  }

  static #findIndex(jqList, wantedClass = 'disabled') {
    let indexOfDisabledIcon = -1;
    jqList.each((index, value) => {
      if ($(value).hasClass(wantedClass)) indexOfDisabledIcon = index;
    });
    if (indexOfDisabledIcon > 1) indexOfDisabledIcon = -1;
    return indexOfDisabledIcon;
  }
}
