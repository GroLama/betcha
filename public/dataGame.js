document.addEventListener('DOMContentLoaded',async(req,res)=>{
    let select = document.querySelector('.selectOpponent')
    fetch('/listUser').then((dataUser)=>{
        console.log("Before second then");
        return dataUser.json()
    }).then(function(users){
        console.log("Oui");
        console.log(users);
        for(i=0;i<users.length;i++){
            let newOption = document.createElement("option")
            newOption.value = users[i].session.userid
            newOption.innerHTML = users[i].session.userid
            select.appendChild(newOption)
        }
    })
})