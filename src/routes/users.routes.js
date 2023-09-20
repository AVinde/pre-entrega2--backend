import {Router } from "express"
import { userModel } from "../dao/models/user.models.js"

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({respuesta: 'ok', mensaje: users})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await userModel.findById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.post('/', async (req, res) => {
    const {nombre, apellido, edad, email, password} = req.body
    try {
        const respuesta = await userModel.create({nombre, apellido, edad, email, password});
        res.status(200).send({respuesta: 'ok', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {nombre, apellido, edad, emial, password} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, {nombre, apellido, edad, emial, password});
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

export default userRouter
