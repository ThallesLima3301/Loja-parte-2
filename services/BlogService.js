/*
// Esse código faz parte de um arquivo de controlador, 
Ele possui diversas funções que são responsáveis por realizar operações como listar,  criar, atualizar e deletar. 
*/
const BlogModel = require("../models/Blog"); 
exports.getAllBlogs = async () => {
  // A função getAllBlogs() é responsável por obter todos os documentos salvos no banco de dados, 
  return await BlogModel.find();
  //- Find: Retorna todos os documentos de um determinado Model.
};
 
exports.createBlog = async (blog) => {
  //a função createBlog() é responsável por criar um novo documento, 
  return await BlogModel.create(blog);
  //- Create: Cria um novo documento de um determinado Model.
};
exports.getBlogById = async (id) => {
  //a função getBlogById()   é responsável por obter um documento de acordo com o seu identificador,
  return await BlogModel.findById(id);
  //- FindById: Retorna o documento de um determinado Model com o ID especificado.
};
 
exports.updateBlog = async (id, blog) => {
  // a função updateBlog()   é responsável por atualizar um documento de acordo com seu identificador
  return await BlogModel.findByIdAndUpdate(id, blog);
  //- FindByIdAndUpdate: Atualiza o documento de um determinado Model com o ID especificado.
};
 
exports.deleteBlog = async (id) => {
  // e a função deleteBlog()   é responsável por deletar um documento de acordo com seu identificador.
  return await BlogModel.findByIdAndDelete(id);
  //- FindByIdAndDelete: Exclui o documento de um determinado Model com o ID especificado.
};