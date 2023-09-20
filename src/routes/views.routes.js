import express from "express";
import { CartManager } from "../dao/models/cartManager.js"

const viewsRouter = express.Router();

viewsRouter.get('/static', (req, res) => {
    res.render('chat', {
        js: "chat.js",
        css: "home.css",
        title: "Chat",
        
    });
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Products",
        js: "realTimeProducts.js"

    })
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await CartManager.findById(cid);
        console.log(cart)

        if (cart) {
            res.render('carts', { products: cart.products });
        } else {
            res.status(404).send({ respuesta: 'Error', mensaje: 'Carrito no encontrado' });
        }

    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: error.message });
    }
});


export default viewsRouter;