

document.addEventListener('DOMContentLoaded',async(req,res)=>{
    fetch('/session').then((data)=>{
        return data.json()
    }).then(function(userData){
        if(userData==undefined||userData==null){
            let selectButton  = document.querySelector(".logButt")
            let selectForm  = document.querySelector(".logForm")
            let selectLi  = document.querySelector(".logLi")
            selectButton.style.display ="none"
            selectForm.style.display="none"
            selectLi.style.display ="none"
            console.log("User not log");
            //console.log(userData);
            
        }
        else{
            
            let selectUsername = document.querySelector('#username')
            let selectHome = document.querySelector('#toHome')
            let selectList = document.querySelector('#toList')
            let selectButton  = document.querySelector(".logButt")
            let selectForm  = document.querySelector(".logForm")
            let selectLi  = document.querySelector(".logLi")
            selectButton.innerHTML ="Logout"
            selectForm.style.display="block"
            selectLi.style.display ="block"
            selectUsername.innerHTML = userData
            selectHome.innerHTML = "Home"
            selectHome.href = "/index.html"

            selectList.innerHTML ="Game list"
            selectList.href="/listGame.html"



        }
    })
    fetch('/sendGameList').then((dataGame)=>{
        return dataGame.json()
    }).then(function(game){
        //CREATE LIST AND APPEND WITH DATA
    })


})