"use restrict";

const repository = require('~repo/fuel-repository');
const control = require('~control/contract/base.controller');

class FuelController {
    
    async get(req, res, next) {
        try{
            let dataResult = []
            if( typeof req.params.id !== 'undefined' ){
                dataResult = await repository.getById(req.params.id)
            } else {
                dataResult = await repository.getByPaginate(req)
            }
            repository.isOk() ? control.ok(res, null, dataResult) : control.notFound(res)

        } catch(e){
            control.notFound(res)
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