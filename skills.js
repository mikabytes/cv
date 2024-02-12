import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "https://cdn.jsdelivr.net/npm/chart.js@4.4/+esm"
import DataLabels from "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2/+esm"

const target = document.querySelector(`#skillsCanvas`)

Chart.register(BarController, BarElement, CategoryScale, LinearScale)
Chart.register(DataLabels)

const skills = [
  [`Modern JavaScript`, 99],
  [`Web Apps (PWA)`, 95],
  [`Architecture & System Design`, 95],
  [`Ruby`, 65],
  [`C`, 65],
  [`Database management`, 60],
  [`Server management`, 60],
  [`C#`, 60],
  [`Kubernetes`, 50],
  [`Leadership`, 50],
  [`Python`, 45],
  [`Java`, 40],
  [`Message brokers`, 40],
  [`Embedded Systems`, 40],
  [`Hiring & Training`, 30],
  [`Ceph`, 20],
  [`PCB design & manufacturing`, 20],
]

// Text in canvas can't be parsed by robots, so do some SEO here
document.querySelector(`#skillsContainer`).prepend(
  Object.assign(document.createElement(`div`), {
    style: `position: absolute; font-size: 1px; color: white;`,
    textContent: skills.map((it) => it[0]).join(`, `),
  })
)

const data = {
  labels: skills.map((it) => it[0]),
  datasets: [
    {
      label: "Skills",
      data: skills.map((it) => it[1]),
    },
  ],
}

const config = {
  type: `bar`,
  data,
  options: {
    maintainAspectRatio: false,
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      y: {
        max: 100,
        ticks: {
          mirror: true,
          font: {
            weight: 600,
          },
        },
      },
    },
    plugins: {
      title: {
        display: false,
        //text: 'Chart.js Horizontal Bar Chart'
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  },
}

new Chart(target, config)
