document.addEventListener("DOMContentLoaded", () => {
    const btnNight = document.querySelector(".night")
    let nightMode = false
    btnNight.addEventListener("click", () => {
        if(!nightMode){
            const r = document.querySelector(':root')
            r.style.setProperty('--main-bg-color', 'rgb(37, 39, 41)')
            r.style.setProperty('--text-color', 'white')
            r.style.setProperty('--box-shadow-color','0 0 20px 0 rgba(255, 255, 255, 0.2)')
            r.style.setProperty('--box-shadow-color2','0 5px 5px 0 rgba(255, 255, 255, 0.24)')

            nightMode=true
        }
        else{
            const r = document.querySelector(':root')
            r.style.setProperty('--main-bg-color', 'rgb(212, 212, 212)')
            r.style.setProperty('--text-color', 'black')
            r.style.setProperty('--box-shadow-color','0 0 20px 0 rgba(0, 0, 0, 0.2)')
            r.style.setProperty('--box-shadow-color2','0 5px 5px 0 rgba(0, 0, 0, 0.24)')
            nightMode=false
        }
    })
    
})
