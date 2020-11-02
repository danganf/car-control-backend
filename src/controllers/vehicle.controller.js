"use restrict";

const repository = require('~repo/vehicle.repository');
const baseController = require('~control/contract/base.controller');

class VehicleController extends baseController {
    
    async get(req, res, next) {
        try{
            let dataResult = []
            if( typeof req.params.id !== 'undefined' ){
                dataResult = await repository.getById(req.params.id)
            } else {
                dataResult = await repository.getByPaginate(req)
            }
            
            repository.isOk() ? super.ok(res, null, dataResult) : super.notFound(res)

        } catch(e){
            super.notFound(res)
        }
    }

    async create(req, res, next) {
        try{
            let dataResult = await repository.create(req.body);
            if( dataResult ){
                super.ok(res, req.__('crud.create.yes'), dataResult, 201);
            } else {
                super.fail(res, req.__('crud.create.no'), repository.getMsgError());
            }
        } catch(e){
            super.fail(res, req.__('crud.create.no') );
        }
    }

    async update(req, res, next) {
        try{
            let dataResult = await repository.update(req.params.id, req.body);
            if( dataResult ){
                super.ok(res, req.__('crud.update.yes'), dataResult);
            } else {
                super.fail(res, req.__('crud.update.no'), repository.getMsgError());
            }
        } catch(e){
            super.fail(res, req.__('crud.update.no'));
        }
    }

    async delete(req, res, next){
        try{
            let dataResult = await repository.delete(req.params.id);
            if( dataResult ){
                super.ok(res, req.__('crud.delete.yes'));
            } else {
                super.fail(res, req.__('crud.delete.no'), repository.getMsgError(), repository.getStatusCode());
            }
        } catch(e){
            super.fail(res, req.__('crud.delete.no'), repository.getStatusCode()); 
        }
    }

}

module.exports = new VehicleController()