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
    } else {
      document.documentElement.classList.add("dark")
      themeText.textContent = "Dark Mode"
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

  const slideArr = document.querySelectorAll(".carousel-item")
  const thumbsParent = document.querySelector(".thumbs")
  slideArr.forEach((e, i) => {
    const thumb = document.createElement("div")
    thumb.className = i === 0? "thumb active": "thumb"
    thumb.id = "thumb"+i
    thumbsParent?.append(thumb)
  })

  const slideLeftBtn = document.getElementById("slideleft-btn") as HTMLDivElement
  slideLeftBtn.addEventListener("click", (e) => {
    const slides = document.querySelector(".carousel-items")
    if(!slides) return
    const slide = document.querySelectorAll(".carousel-item")
    if (!slide) return
    const widthofSlide = slide[0].clientWidth
    var style = window.getComputedStyle(slides);
    var matrix = new WebKitCSSMatrix(style.transform);
    const posofSlides = matrix.m41
    if (posofSlides > (-1)){
      return 
    }
    gsap.to(slides, {
      x: "+=" + widthofSlide,
      duration: 0.5,
      ease: "power1.in"
    })
    const index = Math.abs(posofSlides) / widthofSlide
    changeThumbs(index)
  })

  const slideRightBtn = document.getElementById("slideright-btn") as HTMLDivElement
  slideRightBtn.addEventListener("click", () => {
    
    const slides = document.querySelector(".carousel-items")
    if (!slides) return
    const slide = document.querySelectorAll(".carousel-item")
    if (!slide) return
    
    const widthofSlide = slide[0].clientWidth
    var style = window.getComputedStyle(slides);
    var matrix = new WebKitCSSMatrix(style.transform);
    const posofSlides = matrix.m41
    if (posofSlides < -((slide.length - 1)*widthofSlide - 1)) {
      return
    }
    const index = Math.abs(posofSlides) / widthofSlide
    changeThumbs(index)
  })


  
    
  Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend);
  const ctx = document.getElementById('bar-chart') as HTMLCanvasElement;
  const myChart = new Chart(ctx, {
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
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          border: {
            dash: [5, 5],
            color: "#E2E8F0"
          },
          grid: {
            drawTicks: false,
            // offset: true,
            drawOnChartArea: true, // Allow gridlines to be drawn on the chart
            tickBorderDash: [5, 5] // Dashed gridlines for x-axis (5px dash, 5px gap)
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
            padding: 20,
            stepSize: 200,
          },
          beginAtZero: true,
          border: {
            dash: [5,5],
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


})