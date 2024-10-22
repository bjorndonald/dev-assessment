import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import gsap from 'gsap'
import events from './data'

const setUpTable = (data: {
  name: string;
  date: string;
  speaker: string;
  status: "Completed" | "In Progress";
}[]) => {
  const tableRows = document.querySelectorAll(".table .trow")
  tableRows.forEach(e => {
    e.remove()
  })
  const tableDetails = document.querySelectorAll(".table details")
  tableDetails.forEach(e => {
    e.remove()
  })

  const tableDesktop = document.querySelector(".table.desktop")
  const tableMobile = document.querySelector(".table.mobile")
  data.map((x) => {
    const trow = document.createElement("div")
    trow.className = "trow"
    trow.innerHTML = `
      <div id="open-modal" class="td">
        ${x.name}
      </div>
      <div class="td">
        ${x.date}
      </div>
      <div class="td">
        ${x.speaker}
      </div>
      <div class="td" data-status="${x.status}">
        <div class="bubble ${x.status.toLowerCase().replace(" ", "-")}">
          <div class="dot"></div>
          ${x.status}
        </div>
      </div>
    `

    const detail = document.createElement("details")
    detail.innerHTML = `
      <summary>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="#334155" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="name" id="open-modal">${x.name}</span>
        <div data-status="${x.status}" class="bubble ${x.status.toLowerCase().replace(" ", "-")}">
          In Progress
        </div>
      </summary>
      <div class="info">
        <span class="speaker">${x.speaker}</span>
        <span class="date">${x.date}</span>
      </div>
    `

    tableDesktop?.append(trow)
    tableMobile?.append(detail)
  })
}

const handleSearch = (e: Event) => {
  const input = e.target as HTMLInputElement
  setUpTable(events.filter(x => x.name.includes(input.value)))
}

const handleStatusClick = (e: Element) => {
  const statusText = document.querySelector(".status.dropdown .dropdown-btn span")
  if(!statusText) return
  statusText.textContent = e.textContent
  console.log(e.textContent?.trim())
  if (e.textContent === "Status"){
    setUpTable(events)
  } else
  setUpTable(events.filter(x => x.status.toLowerCase().includes(e.textContent?.toLowerCase().trim() ??"")))
  const statusCheck = document.querySelector(".status.dropdown input") as HTMLInputElement
  statusCheck.click()
}

const handleNameClick = (e: Element) => {
  const nameText = document.querySelector(".name.dropdown .dropdown-btn span")
  if (!nameText) return
  const textContent = e.textContent?.trim().toLowerCase()
  nameText.textContent = e.textContent
  if(e.textContent === "Name")
    setUpTable(events.sort((a, b) => new Date(b.date) - new Date(a.date)))
  else
    setUpTable(events.filter(x => x.name.toLowerCase().includes(textContent ??"")))
  const nameCheck = document.querySelector(".name.dropdown input") as HTMLInputElement
  nameCheck.click()
}

const handleSortClick = (e: Element) => {
  const sortText = document.querySelector(".sort.dropdown .dropdown-btn span")
  if (!sortText) return
  sortText.textContent = e.textContent
  console.log(e.textContent)
  if (e.textContent === "Most Recent")
    setUpTable(events.sort((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()))
  else if (e.textContent === "Alphabetical")
    setUpTable(events.sort((a, b) => a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase())))
 
  const sortCheck = document.querySelector(".sort.dropdown input") as HTMLInputElement
  sortCheck.click()
}

document.addEventListener('DOMContentLoaded', function () {
  setUpTable(events.sort((a, b) => new Date(b.date) - new Date(a.date)))
 
  const searchTerm = document.getElementById("searchterm")
  searchTerm?.addEventListener("change", handleSearch)

  const sortDropdown = document.querySelectorAll(".sort.dropdown .dropdown-item")
  sortDropdown.forEach(e => {
    e?.addEventListener("click", () => handleSortClick(e))
  })

  const nameDropdown = document.querySelectorAll(".name.dropdown .dropdown-item")
  nameDropdown.forEach(e => {
    e?.addEventListener("click", () => handleNameClick(e))
  })

  const statusDropdown = document.querySelectorAll(".status.dropdown .dropdown-item")
  statusDropdown.forEach(e => {
    e?.addEventListener("click", () => handleStatusClick(e))
  })
  
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
    const main = document.querySelector("main") as HTMLDivElement
    if (sidebar?.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed")
      main.style.paddingLeft = 240 + 32 + "px"
    } else {
      sidebar.classList.add("collapsed")
      main.style.paddingLeft = 64 + 32 + "px"
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

  const slideLeft = () => {
    if (index == 0)
      index = 2
    else index -= 1
    showSlide()
    changeThumbs(index)
  }

  const slideLeftBtn = document.getElementById("slideleft-btn") as HTMLDivElement
  slideLeftBtn.addEventListener("click", slideLeft)

  const slideRight = () => {
    if (index == 2)
      index = 0
    else index += 1
    showSlide()
    changeThumbs(index)
  }

  const slideRightBtn = document.getElementById("slideright-btn") as HTMLDivElement
  slideRightBtn.addEventListener("click", slideRight)

  setInterval(() => {
    slideRight()
  }, 3000);
    
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
    const eventName = document.querySelector(".modal-header h4") as HTMLDivElement
    const eventDate = document.querySelector(".modal-header span") as HTMLDivElement
    const eventSpeaker = document.querySelector(".modal-body p span") as HTMLDivElement
    const eventBtn = document.querySelector(".modal-footer .mark-btn") as HTMLDivElement


    if(window.innerWidth > 475){
      modalContent.style.top = bounds.bottom + "px"
      modalContent.style.left = bounds.left + 20 + "px"
      const nameElem = firstCol
      eventName.textContent = nameElem.textContent

      const speakerElem = firstCol.parentElement?.parentElement?.children.item(1)?.children.item(0) as HTMLSpanElement
      eventSpeaker.textContent = speakerElem.textContent

      const dateElem = firstCol.parentElement?.parentElement?.children.item(1)?.children.item(1) as HTMLSpanElement
      eventDate.textContent = dateElem.textContent

      const btnElem = firstCol.parentElement?.children.item(1) as HTMLSpanElement
      eventBtn.textContent = btnElem.textContent
    } else {
      const cols = firstCol.parentElement?.children
      if (!cols)
        return
      
      const nameElem = cols.item(0) as HTMLDivElement
      eventName.textContent = nameElem.textContent
      const dateElem = cols.item(1) as HTMLDivElement
      eventDate.textContent = dateElem.textContent
      const speakerElem = cols.item(2) as HTMLDivElement
      eventSpeaker.textContent = speakerElem.textContent
      const btnElem = cols.item(3) as HTMLDivElement
      if (btnElem.getAttribute("data-status") == "Completed")
        eventBtn.textContent = "Mark as In progress"
      else eventBtn.textContent = "Mark as Completed"
    }

    const modal = document.querySelector(".modal")
    if(!modal) return
    modal.setAttribute("open", "true")
  }

  const closeEventModal = () => {
    const modal = document.querySelector(".modal")
    if (!modal) return
    modal.removeAttribute("open")
  }

  const rows = document.querySelectorAll("#open-modal")

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