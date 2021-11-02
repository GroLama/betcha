document.addEventListener('DOMContentLoaded',async(req,res)=>{
    fetch('/currentGameData').then((data)=>{
        return data.json()
    }).then(function(gameData){
        //Retrieve data and generate grid
        const startGrid = document.querySelector('.gridStart')
        gridL = 11
        arrayDiv =[]
        for (i=0;i<gridL;i++){
            let grid = document.createElement("div")
            arrayDiv.push(grid)
            startGrid.appendChild(grid).className="grid"
        }
        arrayDiv[5].className="active"
    })
})