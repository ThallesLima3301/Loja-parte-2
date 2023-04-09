////Esse código é um módulo do Mongoose que permite criar um esquema para um banco de dados MongoDB. O esquema aqui criado é para uma loja,  
//contendo informações como nome, email, senha,  título, corpo e imagem. 
//O módulo também especifica que a data de criação deve ser adicionada automaticamente, e é exportado como um modelo chamado loja.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const blogSchema = new Schema({
    //posso mudar para oq quiser ex clientes usuarios 
  name:  String,
  email: String,
  senha: String,
  title: String,
  body: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Blog", blogSchema);