/* 
Esse código é um servidor feito com Express.
Ele configura um servidor Express para uso, usa o pacote dotenv para carregar variáveis de ambiente, 
o mongoose para conectar-se ao banco de dados MongoDB, o blogRouter para lidar com as requisições de rota da API, 
o bcrypt para criptografar a senha do usuário, o jwt para gerar tokens de autenticação, o bodyParser para lidar com os dados da requisição
e o Blog para modelar os dados do usuário.

O servidor configura rotas para o registro de usuários e o login de usuários, e também possui uma rota privada que precisa de um token para acessá-la.
 */
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require('./routes/BlogRoutes')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')


const Blog = require("./models/Blog.js")

const app = express();

//models
const { discriminator } = require('./models/Blog');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) =>{
  res.status(200).json({msg: 'deus, bv api'})
  
})
// Private Route
app.get("/user/:id", checkToken, async(req, res) => {
  const id = req.params.id

  const user = await Blog.findById(id, '-password')
  if(!user){
    return res.status(404).json({msg: 'Usuario n encontrado'})
  }
  res.status(200).json({ user })
})

function checkToken(req, res, next){
  const authHeader = req.header['autorizado']
  const token = authHeader &&  authHeader.split("")[1] 
  if (!token) {
    return res.status(401).json({msg: 'acesso negado'})
  }
  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({msg: "Token invalido"})
  }
}

//Registar User
app.post('/auth/register',async (req, res) => {
const{name, email, senha, confirmasenha} = req.body
console.log(name, email, senha, confirmasenha);
//validadores
  if(!name){
    return res.status(422).json({ msg: 'nome obrigatório'})
  }
  if(!email){
    return res.status(422).json({ msg: 'email obrigatório'})
  }
  if(!senha){
    return res.status(422).json({ msg: 'senha obrigatório'})
  }
  if(senha !== confirmasenha){
    return res.status(422).json({ msg: 'senha diferentes'})
  }
  
  // check para ver se o email ja existe
  const userExiste = await Blog.findOne({email: email})
  if(userExiste){
    return res.status(422).json({msg: 'email ja em uso'})
    
  }
  //criar senha
  const criarsenha =  await bcrypt.genSalt(12)
  const senhaHash = await bcrypt.hash(senha, criarsenha) ///esconder senhas criadas pelos usuários em forma de texto “puro” em dados indecifráveis, utilizando o algoritmo hash

  //criar usuario
  const usuario = new Blog({
    name,
    email,
    senha: senhaHash, 
    
  })
  try{
    await usuario.save()
    res.status(201).json({msg: 'usuario criando com sucesso!'})
  } catch(error){
  
    console.log(error)
    res.status(500).json({msg: 'erro inesperado '})
  }
})

//fim do auth/register

//login
app.post("/auth/login", async (req, res) => {
  const {email, senha} = req.body
//validaçoes
if(!email){
  return res.status(422).json({ msg: 'email obrigatório'})
}
if(!senha){
  return res.status(422).json({ msg: 'senha obrigatório'})
}
// check se o usuario existe

const user = await Blog.findOne({email: email})

if(!user){
  return res.status(422).json({msg: 'Usuario nao escontrador!'})
}

// ver se as senhas sao iguais


const validarsenhar = await bcrypt.compare(senha, user.senha)
if (!validarsenhar) {
  return res.status(422).json({msg: 'senha errada'})
}
try {
  //POSSIVEL ERRO
  const secret = process.env.SECRET
  const token = jwt.sign(
    {
      id: user._id,
    },
    secret,
  )
  res.status(200).json({msg: "confirma senha foi um sucesso", token })
} catch (error) {
  console.log(error)
  res.status(500).json({
    msg: 'occoreu um erro', token
  })
}


})

//fim do auth/login 

app.use(express.json());
const username = "thalleslima3301";
const password = "thalles123";
const cluster = "cluster0";
const dbname = "myFirstDatabase";



mongoose.connect(
//conta mongo
  `mongodb://thalleslima3301:thalles123@ac-cjxmmmh-shard-00-00.w3ak6gs.mongodb.net:27017,ac-cjxmmmh-shard-00-01.w3ak6gs.mongodb.net:27017,ac-cjxmmmh-shard-00-02.w3ak6gs.mongodb.net:27017/?ssl=true&replicaSet=atlas-zllgd9-shard-0&authSource=admin&retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
    }
);
//vendo se conecotu ou n
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("parabens!");
  
});


app.use("/api/blogs", blogRouter);
//pedindo pra trocar de prota(8080 )
app.listen(3000 , () => {
  console.log("Server is running at port 3000 ");
});