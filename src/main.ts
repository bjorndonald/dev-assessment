import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import gsap from 'gsap'

document.addEventListener('DOMContentLoaded', function () {
  function changeThumbs(newIndex: number) {
    const thumbs = document.querySelectorAll(".thumb")
    thumbs.forEach((e) => {
      e.className = "thumb"
    })

    const thumb = document.getElementById("thumb" + newIndex) as HTMLDivElement
    if (!thumb) return
    thumb.className = "thumb active"
  }

  const navTogglers = document.querySelectorAll("#nav-toggler") as NodeListOf<HTMLDivElement>

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const themeText = document.querySelector(".theme-switcher span") as HTMLDivElement
    if (event.matches){
      themeText.textContent = "Dark Mode"
      document.documentElement.classList.add("dark")
    } else {
      themeText.textContent = "Light Mode"
      document.documentElement.classList.remove("dark")
    }
  });

  const themeSwitcher = document.querySelector(".theme-switcher") as HTMLDivElement
  themeSwitcher.addEventListener("click", () => {
    const themeText = document.querySelector(".theme-switcher span") as HTMLDivElement
    if (document.documentElement?.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      themeText.textContent = "Light Mode"
      setupLightMode()
    } else {
      document.documentElement.classList.add("dark")
      themeText.textContent = "Dark Mode"
      setupDarkMode()
    }
  })

  navTogglers.forEach((e) => {
     e.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar") as HTMLDivElement
      if (sidebar?.classList.contains("open")) {
        sidebar.classList.remove("open")
      } else {
        sidebar.classList.add("open")
      }
    })
  })

  const collapseBtn = document.getElementById("collapse-btn") as HTMLDivElement

  collapseBtn.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar") as HTMLDivElement
    if (sidebar?.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed")
    } else {
      sidebar.classList.add("collapsed")
    }
  })

  const slideArr = document.querySelectorAll(".carousel-item") as NodeListOf<HTMLDivElement>
  const thumbsParent = document.querySelector(".thumbs")
  slideArr.forEach((e, i) => {
    if(i !==0)
    e.style.opacity = 0 +""
    const thumb = document.createElement("div")
    thumb.className = i === 0? "thumb active": "thumb"
    thumb.id = "thumb"+i
    thumbsParent?.append(thumb)
  })

  var index = 0

  function showSlide() {
    gsap.to(".carousel-item", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in"
    })

    gsap.to("#carousel"+index, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.in"
    })
  }

  const slideLeftBtn = document.getElementById("slideleft-btn") as HTMLDivElement
  slideLeftBtn.addEventListener("click", (e) => {
    if(index == 0)
      index = 2
    else index -= 1
    showSlide()
    changeThumbs(index)
  })

  const slideRightBtn = document.getElementById("slideright-btn") as HTMLDivElement
  slideRightBtn.addEventListener("click", () => {
    if (index == 2)
      index = 0
    else index += 1
    showSlide()
    changeThumbs(index)
  })
    
  Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend);
  const chartElem = document.getElementById('bar-chart') as HTMLCanvasElement;
  const myChart = new Chart(chartElem, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
      datasets: [{
        label: '# of Votes',
        data: [650, 975, 780, 420, 1000, 580, 850, 380,840, 640, 975,600],
        backgroundColor: "#8576FF",
        borderColor: "#8576FF",
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false // Disable the legend
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          border: {
            dash: [3, 3],
            color: "#E2E8F0"
          },
          grid: {
            drawTicks: false,
            // offset: true,
            drawOnChartArea: true, // Allow gridlines to be drawn on the chart
            tickBorderDash: [3, 3] // Dashed gridlines for x-axis (5px dash, 5px gap)
          },
          offset: true
        },
        y: {
          min: 0,
          max: 1000,
          ticks: {
            // font: {
            //   size: 10,
            //   lineHeight: 12,
            // },
            color: "#64748B",
            padding: 10,
            stepSize: 200,
          },
          beginAtZero: true,
          border: {
            dash: [3, 3],
            color: "#fff"
          },
          grid: {
            drawTicks: false,
            color: "#E2E8F0",
          }
        }
      }
    }
  });

  const setupLightMode = () => {
    myChart.options.scales = {
      x: {
        beginAtZero: true,
        border: {
          dash: [3, 3],
          color: "#E2E8F0"
        },
        grid: {
          drawTicks: false,
          // offset: true,
          drawOnChartArea: true, // Allow gridlines to be drawn on the chart
          tickBorderDash: [3, 3] // Dashed gridlines for x-axis (5px dash, 5px gap)
        },
        offset: true
      },
      y: {
        min: 0,
        max: 1000,
        ticks: {
          // font: {
          //   size: 10,
          //   lineHeight: 12,
          // },
          color: "#64748B",
          padding: 10,
          stepSize: 200,
        },
        beginAtZero: true,
        border: {
          dash: [3, 3],
          color: "#fff"
        },
        grid: {
          drawTicks: false,
          color: "#E2E8F0",
        }
      }
    }

    myChart.update()
  }

  const setupDarkMode = () => {
    myChart.options.scales = {
      x: {
        beginAtZero: true,
        border: {
          dash: [5, 5],
          color: "#fff"
        },
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#fff",
          drawTicks: false,
          drawOnChartArea: true,
          tickBorderDash: [5, 5]
        },
        offset: true
      },
      y: {
        min: 0,
        max: 1000,
        ticks: {
          color: "#fff",
          padding: 10,
          stepSize: 200,
        },
        beginAtZero: true,
        border: {
          dash: [5, 5],
          color: "#fff"
        },
        grid: {
          drawTicks: false,
          color: "#fff",
        }
      }
    }

    myChart.update()
  }

  const openEventModal = (e: Event) => {
    const modalContent = document.querySelector(".modal-content") as HTMLDivElement
    if (!modalContent) return
    const firstCol = e.target as HTMLDivElement
    const bounds = firstCol.getBoundingClientRect()
    console.log(bounds)
    modalContent.style.top = bounds.bottom + "px"
    modalContent.style.left = bounds.left + 20 + "px"
    const modal = document.querySelector(".modal")
    if(!modal) return
    modal.setAttribute("open", "true")
  }

  const closeEventModal = () => {
    const modal = document.querySelector(".modal")
    if (!modal) return
    modal.removeAttribute("open")
  }

  const rows = document.querySelectorAll(".trow .td:first-child")

  rows.forEach((e) => {
    e.addEventListener(
      "click",
      openEventModal
    )
  })

  const modalClose = document.querySelector(".modal-close")
  modalClose?.addEventListener("click", closeEventModal)

  const backdrop = document.querySelector(".modal-backdrop")
  backdrop?.addEventListener("click", closeEventModal)
})