const ctx = document.getElementById('myChart').getContext('2d');
const maxPoints = 15;
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'currency price',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'USD' },
        ticks: {
          stepSize: 0.01,
          callback: function (value) {
            return value.toFixed(3);
          },
        },
      },
    },
  },
});

function addPoint(label, value) {
  const dataset = chart.data.datasets[0];
  chart.data.labels.push(label);
  dataset.data.push(value);

  if (dataset.data.length > maxPoints) {
    chart.data.labels.shift();
    dataset.data.shift();
  }

  chart.update();
}

setInterval(async () => {
  const now = new Date().toLocaleTimeString();
  let value = -1;
  try {
    const data = await fetch('/get-point', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: 'BTC',
      }),
    });
    if (!data.ok) return;
    const parsedData = await data.json();
    if (parsedData.success) value = parsedData.data;
  } catch (e) {
    console.error('error on fetching data: ' + e);
  }
  console.log(value);

  addPoint(now, value);
}, 2000);
