"use restrict";

const repository = require('~repo/type-vehicle.repository');
const control = require('~control/contract/base.controller');

class TypeVehicleController {
    
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
                control.ok(res, req.__('crud.create.yes'), dataResult, 201);
            } else {
                control.fail(res, req.__('crud.create.no'), repository.getMsgError());
            }
        } catch(e){
            control.fail(res, req.__('crud.create.no') );
        }
    }

    async update(req, res, next) {
        try{
            let dataResult = await repository.update(req.params.id, req.body);
            if( dataResult ){
                control.ok(res, req.__('crud.update.yes'), dataResult);
            } else {
                control.fail(res, req.__('crud.update.no'), repository.getMsgError());
            }
        } catch(e){
            control.fail(res, req.__('crud.update.no'));
        }
    }

    async delete(req, res, next){
        try{
            let dataResult = await repository.delete(req.params.id);
            if( dataResult ){
                control.ok(res, req.__('crud.delete.yes'));
            } else {
                control.fail(res, req.__('crud.delete.no'), repository.getMsgError(), repository.getStatusCode());
            }
        } catch(e){
            control.fail(res, req.__('crud.delete.no'), repository.getStatusCode()); 
        }
    }

}

module.exports = new TypeVehicleController()