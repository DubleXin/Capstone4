import { globalDataController as dataController } from './app.js';
$('.text-area').on('change', () => {
  let data = $('.text-area').val();
  let parsedValue = Number.parseInt(data, 10);

  if (!Number.isInteger(parsedValue)) return;

  if (!dataController.updateData('TextArea', parsedValue).success)
    dataController.setData('TextArea', parsedValue);
});
