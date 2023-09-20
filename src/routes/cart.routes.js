import { Router } from "express";
import CartProduct from "../CartManager.js";

const cartRouter= Router();
const cartNews = new CartProduct();

cartRouter.get('/:cid', async (req, res)=> {
    const {cid} = req.params;
    const product = await cartNews.getCartById(parseInt(cid));

    if(product.success){
      res.status(200).send(product.message)
    }else {
      res.status(400).send(product.message)
    }
});

cartRouter.post('/', async (req, res)=> {
    const products= await cartNews.addProducts();
    if (products.success){
      res.status(200).send(products.message)
    } else {
      res.status(400).send("Ha ocurrido un error.")
    }
  });

cartRouter.post('/:cid/products/:pid', async (req, res)=> {
    const {cid, pid} = req.params
    const prodAdd = await cartNews.addProductByProduct(parseInt(cid), parseInt(pid));

    if (prodAdd.success){
        res.status(200).send("Se ha creado el producto exitosamente")
    } else {
        res.status(400).send("No se ha logrado crear el producto deseado.")
    }
    
})


export default cartRouter;