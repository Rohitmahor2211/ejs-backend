require('dotenv').config() // load .env
const express = require("express")
const axios = require("axios")

const app = express()
const PORT = process.env.PORT || 3000
const db_URI = process.env.db_URI

app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")


app.get('/create', (req,res)=>{
    res.render("create_user")
})


app.post('/create', async(req,res)=>{
    const {name,email,age,gender} = req.body
    try {
        await axios.post(`${db_URI}`,{name,email,age,gender})
        console.log("user created successfully...")
        res.redirect('/view')    
    } catch (error) {
        console.log(error)
    }

})


app.get('/view', async(req,res)=>{
    try {
        const response = await axios.get(`${db_URI}`)
        const users = response.data
        res.render('view_user',{users})
    } catch (error) {
        console.log(error)
    }
})


app.get('/update/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const response = await axios.get(`${db_URI}/${id}`)
        const user = response.data
        res.render('update_user',{user})
    } catch (error) {
        console.log(error)
    }
})


app.post('/update/:id', async(req,res)=>{
    const id = req.params.id;
    const {name,email,age,gender} = req.body;

    try {
       await axios.put(`${db_URI}/${id}`,{name,email,age,gender})
        res.redirect('/view')
    } catch (error) {
        console.log(error)
    }
})


app.post('/delete/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        await axios.delete(`${db_URI}/${id}`)
        res.redirect('/view')
    } catch (error) {
        console.log(error)
    }
})



app.listen(PORT,()=>{
    console.log("Server is running on port:-",PORT)
})