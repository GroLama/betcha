document.addEventListener("DOMContentLoaded", () => {
    const btnNight = document.querySelector(".night")
    let nightMode = false
    nightMode = localStorage.getItem('nightPref')
    btnNight.addEventListener("click", () => {

        if (!nightMode) {
            const r = document.querySelector(':root')
            r.style.setProperty('--main-bg-color', 'rgb(37, 39, 41)')
            r.style.setProperty('--text-color', 'white')
            nightMode = true
            localStorage.setItem('nightPref', nightMode)
        } else {
            const r = document.querySelector(':root')
            r.style.setProperty('--main-bg-color', 'rgb(212, 212, 212)')
            r.style.setProperty('--text-color', 'black')
            nightMode = false
            localStorage.setItem('nightPref', nightMode)
        }
    })

})