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
                control.ok(res, "Registro criado com sucesso", dataResult, 201);
            } else {
                control.fail(res, "Ocorreu um erro ao criar um registro", repository.getMsgError());
            }
        } catch(e){
            control.fail(res, "Ocorreu um erro ao criar um registro");
        }
    }

    async update(req, res, next) {
        try{
            let dataResult = await repository.update(req.params.id, req.body);
            if( dataResult ){
                control.ok(res, "Registro atualizado com sucesso", dataResult);
            } else {
                control.fail(res, "Ocorreu um erro ao atualizar o registro", repository.getMsgError());
            }
        } catch(e){
            control.fail(res, "Ocorreu um erro ao atualizar o registro");
        }
    }

    async delete(req, res, next){
        try{
            let dataResult = await repository.delete(req.params.id);
            if( dataResult ){
                control.ok(res, "Registro deletado com sucesso");
            } else {
                control.fail(res, "Ocorreu um erro ao deletar o registro", repository.getMsgError(), repository.getStatusCode());
            }
        } catch(e){
            control.fail(res, "Ocorreu um erro ao deletar o registro", repository.getStatusCode()); 
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