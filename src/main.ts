

document.addEventListener('DOMContentLoaded', function () {
  console.log('sjd')
  const navTogglers = document.querySelectorAll("#nav-toggler") as NodeListOf<HTMLDivElement>
console.log(navTogglers)
  navTogglers.forEach((e) => {
    console.log(e)
    e.addEventListener("click", () => {
      console.log('sjdhj')
      const sidebar = document.getElementById("sidebar") as HTMLDivElement
      console.log("tehisbi")
      if (sidebar?.classList.contains("open")) {
        sidebar.classList.remove("open")
      } else {
        sidebar.classList.add("open")
      }
    })
  })
})