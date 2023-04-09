/*
Esse código cria um roteador para os controllers que controlam o Blog. 
O módulo express é usado para criar o roteador, que é armazenado na variável router.
 O router possui duas rotas, "/" e "/:id". 
 A primeira rota é usada para obter todos os blogs e criar um novo blog, 
 enquanto a segunda rota é usada para obter um único blog por ID,  atualizar um blog por ID e excluir um blog por ID.
  Os métodos necessários para essas operações são importados do controlador de Blog.
   Por fim, o roteador é exportado para ser usado em outro lugar.
*/

const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");
 
const router = express.Router();
 
router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
 
module.exports = router;