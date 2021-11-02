document.addEventListener('DOMContentLoaded',async(req,res)=>{
    fetch('/sendGameList').then((data)=>{
        return data.json()
    }).then(function(listGame){
        let ulGame = document.querySelector('.startTable')
        for(i=0;i<listGame.length;i++)
        {
            let liGame = document.createElement('tr')
            let tdOpponent = document.createElement('td')
            let tdStatut = document.createElement('td')
            let tdToken = document.createElement('td')
            let tdOToken = document.createElement('td')
            let delBttn = document.createElement('button')
            let joinBttn = document.createElement('button')

            joinBttn.innerHTML = "Join"
            joinBttn.className = "joinBttn"
            joinBttn.id=listGame[i].idGame
            delBttn.innerHTML = "Delete"
            delBttn.className = "buttonDelete"
            delBttn.id = listGame[i].idGame
            tdOpponent.innerHTML = listGame[i].opponent
            tdStatut.innerHTML = listGame[i].statut
            tdToken.innerHTML = listGame[i].ownerToken
            tdOToken.innerHTML = listGame[i].opponentToken
            liGame.id = listGame[i].idGame
            ulGame.appendChild(liGame)
            liGame.appendChild(tdOpponent)
            liGame.appendChild(tdStatut)
            liGame.appendChild(tdToken)
            liGame.appendChild(tdOToken)
            liGame.appendChild(delBttn)
            liGame.appendChild(joinBttn)
            delBttn.addEventListener('click',async function(){
                await fetch('/deleteGame/'+delBttn.id)
                location.reload()
            })
            joinBttn.addEventListener('click',async function(){
                window.location.replace('/game/'+joinBttn.id)
            })
        }
        
    })  
   
})