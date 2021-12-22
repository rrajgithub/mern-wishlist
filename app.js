const bodyParser = require('body-parser')
const express =require('express')
const app = express()

const mongose=require('mongoose')

const port= process.env.PORT || 8000
const Wish=require('./models/wish')

const {mongourl}=require('./config/keys')
const wish = require('./models/wish')

mongose.connect(mongourl,{useNewUrlParser:true})

app.use(express.static('public'))
// require('./routes')(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.set('view engine', 'ejs');

// const data=['code','eat','sleep']





app.get('/',async (req,res)=>{
    let data=await Wish.find({})
    console.log(data)
    res.render('home',{wish:data})
})

// app.get('/profile/:id',(req,res)=>{
//     res.send(`${req.params.id}`)
// })



// app.post('/home',(req,res)=>{
//     let item1=req.body.item1
    
//     data.push(item1)
//     res.redirect('/')


//     let item2=req.body.item2


//     let index=data.indexOf(item2)
//     console.log(index)

//     if(index>-1)
//     {
//         data.splice(index,1)
//         res.redirect('/')

//     }
//     else res.send("not found")

// })


app.post('/home',async (req,res)=>{
    const Item=new Wish({
        wish:req.body.item
    })
    await Item.save()
    
    res.redirect('/')
})




app.get('/about',(req,res)=>{
    res.render('about')
})

app.listen(port,()=>{
    console.log("listeing ... "+port);
})