const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const crypt = require('bcrypt')
const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(session)


//---------------MONGODB------------------------------------------------------

const BDD = "mongodb://localhost:27017/game"

mongoose.connect(BDD, { useNewUrlParser: true }).then(() =>
    console.log("Connected to db")).catch((error) =>
    console.log(error.message))

const UserS = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    }
})
const store = new mongoSession({
    uri: BDD,
    collection: 'sessions'
})

const sessionS = new mongoose.Schema({
    session: {
        userid: String,
        isOnline:Boolean
    }
})
const partieS = mongoose.Schema({
    idGame : Number,
    owner:String,
    lot : {type:Number,default:6},
    ownerToken:Number,
    opponent:String,
    opponentToken:Number,
    statut:{ type: String, enum: ['Pending', 'Live', 'End'], default: 'Pending' },
})


const sessionModel = mongoose.model("sessions",sessionS)
const newUser = mongoose.model("users", UserS)
const newGame = mongoose.model("game",partieS)

//----------------EXPRESS------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static("./public"))

const TTL = 43200000
app.use(session({
    secret:"chutchutcestsecretzeubi",
    saveUninitialized: false,
    cookie: { maxAge: TTL },
    resave: false,
    store:store
}))

app.post("/login", (req, res) => {
    newUser.findOne({username:req.body.username},(err,userFind)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(userFind===null||!userFind)
            {
                res.redirect('/')
                console.log("Utilisateur inexistant");
            }
            else
            {
                crypt.compare(req.body.password,userFind.password,function(err,result){
                    if(result){
                        req.session.userid = req.body.username
                        req.session.isOnline = true
                        res.redirect('/index.html')
                        console.log("CONNECT");
                    }
                    else{
                        res.redirect('/')
                        console.log("FAIL");
                    }
                })
            }
        }
    })
})


app.post("/createAccount", async(req, res) => {
    newUser.findOne({username:req.body.username},(err,userFind)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            if(userFind===null||!userFind)
            {
                crypt.genSalt(10, function(err, salt) {
                    crypt.hash(req.body.password, salt)
                        .then((hash) => {
                            createUser(req.body.username, hash);
                        })
                    })
                    req.session.userid = req.body.username
                    req.session.isOnline = true
                    res.redirect("/index.html")
            }
            else{
                console.log("Utilisateur trouvé");
            }
        }
    })
 })

app.post("/logout", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    });
})




app.get('/', (req, res) => {
    console.log("Oui");                                 
    res.redirect('/index.html')
})
app.get('/session', (req, res) => {

    res.json(req.session.userid)

})
app.get('/listUser',(req,res)=>{
    let copyUsers = []
    
    sessionModel.find({},(err,listuser)=>{
        
        if(err){
            console.log(err);
        }
        else{
           
            for(i=0;i<listuser.length;i++)
            {
                
                if(listuser[i].session.userid != req.session.userid)
                {
                    
                    copyUsers.push(listuser[i])
                    console.log(i);
                }
                
            }
            console.log(copyUsers);
            res.json(copyUsers)
           
        }
    })

})
app.get('/game',(req,res)=>{
    res.redirect('/game.html')
})
app.get('/game/:id',(req,res)=>{
    newGame.findOne({idGame:req.body.idSend},async function(err,game){
        res.json(game)
    })
})
app.post('/createGame',(req,res)=>{
    req.body.owner = req.session.userid
    req.body.idGame = generateId()
    req.body.lot = 6
   req.body.ownerToken = 100
   req.body.opponent = req.body.opponent
   req.body.opponentToken = 100
    let gameCreate = new newGame(req.body)
    gameCreate.save(function(err){
        if(err){throw err}

    })
    res.redirect('/listGame.html')
})
app.get('/deleteGame/:id',async (req,res)=>{
    newGame.findOne({idGame:req.params.id},'idGame',async function(err,game){

        await newGame.deleteOne({idGame : req.params.id})
        res.redirect('/listGame.html')
    })
    
})

app.get('/sendGameList',(req,res)=>{
    newGame.find({owner:req.session.userid},function(err,gameList){
        res.json(gameList)
    })
})
app.get('/sendMyGame',(req,res)=>{

})
app.get('/currentGameData',(req,res)=>{
    res.json("1")
})
   

//---------------Serveur à l'écoute port 3000----------------------------------
app.listen(3000, () => {
    console.log("Serveur start on port 3000");
})



//------------------------FONCTIONS----------------------------------
async function createUser(name, pass) {
    const user = new newUser({
        username: name,
        password: pass,
        isPublished: true
    });
    const result = await user.save();
    console.log(result);
}
function generateId(){
    let genId = Math.floor(Math.random()*1000)
    return genId
}
