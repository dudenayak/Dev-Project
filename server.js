const { urlencoded } = require('body-parser');
const express = require('Express');
const  mysql=require('mysql')
const path =require('path')
const app =express()
const router =express.Router()

const port =3000|| process.env.PORT;

var urlencodedparser=urlencoded({extended:false})

app.use(express.static(path.join(__dirname )));

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',

    //for executing the project for first time, comment the below lines and include coorect user and password
    //after creating database uncomment these lines
    database:'HACKTOBERFEST_REGISTRY',
    multipleStatements:true
})

db.connect((err)=>{
   if(err) console.log('Connection Failed due to',err)
   else console.log('Connection Success')
})
app.set('views',path.join(__dirname))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.redirect('/register')
})

app.get('/register',(req,res)=>{ 
   res.render('RegistrationForm/index',{ err:''})
})
app.get('/login',(req,res)=>{ 
   res.render('LoginPage/index',{err:''})
})
// for executing the project for the first time uncomment the below lines
// db.query('CREATE DATABASE HACKTOBERFEST_REGISTRY',(err,result)=>{
//   if(err) throw err
//   else console.log('Database created',result)
// })

//after creating db uncomment below lines

// var query=`CREATE TABLE REGISTRATION(
//                 fullname varchar(30),
//                 email  varchar(30) PRIMARY KEY NOT NULL,
//                 password varchar(30) NOT NULL,
//                 phonenumber varchar(10)
//                )`
// db.query(query,(err,result)=>{
//   if(err) throw err
//   else console.log('TABLE CREATION SUCCESSFULL',result)

// })

app.post('/register',urlencodedparser,(req,res)=>{
  var nullvl=null
    console.log(req.body)
    body=req.body
    var regExp = /[a-zA-Z]/;
  if(regExp.test(body.pass)){
    if(body.pass===body.c_pass){
                if(body.phone==''){
                              db.query(`INSERT INTO REGISTRATION VALUES('${body.full_name}','${body.email}','${body.pass}',${nullvl});`,(err,result)=>{
                                if(err){
                                  res.render('RegistrationForm/index',{err:`This email has been already taken`})
                                }
                                else{
                                  res.render('LoginPage/index',{err:`Your Registration has been Successfull. Now Login here`})
                                  console.log(result)
                                }
                                
                              })
                }
                else{
                                db.query(`INSERT INTO REGISTRATION VALUES('${body.full_name}','${body.email}','${body.pass}','${body.phone}');`,(err,result)=>{
                                  if(err){
                                    res.render('RegistrationForm/index',{err:`Your Registration has been Unsuccessfull ${err}`})
                                  }
                                  else{
                                    res.render('LoginPage/index',{err:`Your Registration has been Successfull. Now Login here`})
                                    console.log(result)
                                  }
                                
                              })
                
              }
    
      }
    else{
        res.render('RegistrationForm/index',{err:`Oops..the Confirmation Password doesn't match..Please try again`})
      }  
  }
  else{
    res.render('RegistrationForm/index',{err:`Please include at least one non-digit in password`})
  }
  
})

app.post('/login',urlencodedparser,(req,res)=>{

   db.query(`SELECT fullname, password FROM Registration WHERE email ='${req.body.email}'`,(err,result)=>{
    
    if(result==false){
      res.render('LoginPage/index',{err:`Seems you have not registered`})
     }
     else{
      if(result[0].password===req.body.pass){
        res.render('LoginPage/visitpage',{Successmsg:`Login Successfull...Welcome ${result[0].fullname}`})
        
       }
       else{
        res.render('LoginPage/index',{err:`Invalid Password please try again`})
       }
     }
    
   })
})
app.listen(port,()=>{
    console.log('Listening on port ',3000)
})