"use restrict";

const repository = require('~repo/fuel-repository');
const control = require('~control/contract/base.controller');

class FuelController {
    
    async getAll(req, res, next) {
        try{
            let dataResult = await repository.getAll();
            res.status(200).send(dataResult);
        } catch(e){
            res.status(500).send({ message: "Nenhum registro localizado", data: e });
        }
    }

    async create(req, res, next) {
        try{
            let dataResult = await repository.create(req.body);
            if( dataResult ){
                control.ok(res, dataResult, "Registro criado com sucesso", 201);
            } else {
                control.fail(res, "Ocorreu um erro ao criar um registro", repository.getMsgError());
            }
        } catch(e){
            control.fail(res, "Ocorreu um erro ao criar um registro");
        }
    }

}

module.exports = new FuelController()


// exports.getAll = async (req, res, next) => {
//     try{
//         let dataResult = await repository.getAll;
//         res.status(200).send(dataResult);
//     } catch(e){
//         res.status(500).send({ message: "Nenhum registro localizado", data: e });
//     }
// }

// exports.create = async (req, res, next) => {
//     try{
//         let dataResult = await repository.create(req.body);
//         if( dataResult ){
//             res.status(201).send(dataResult);
//         } else {
//             return baseController.fail(res, "Ocorreu um erro ao criar um registro", repository.getMsgError());
//         }
//     } catch(e){
//         res.status(400).send({ message: "Ocorreu um erro ao criar um registro", data: e });
//     }
// }