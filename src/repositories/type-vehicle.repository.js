"use restrict";

const {TypeVehicle} = require('~models');
const BaseRepository = require('~repo/contract/base.repository');

class TypeVehicleRepository extends BaseRepository {

    constructor(){
        super(TypeVehicle)
    }
    
    /**
     * 
     * @param Array arrayData
     * @return string | boolean
     */
    async create(arrayData) {

        const { name, wheels } = arrayData
    
        return this.getModel().create({name, wheels})
        .then(
            (reg) => {
                return {id: reg.id};
            }
        )
        .catch((err) => {
            this.setMsgError(err.errors[0].message);
            return false;
        })
    }

    /**
     * @param integer id 
     * @param array arrayData 
     */
    async update(id, arrayData){

        try{
            const reg = await this.getModel().findOne({where: {id}});
            if( !reg ){
                return this.setNotFound();
            }

            const { name, wheels } = arrayData
            return reg.update({ name, wheels })
                    .then((c) => { return c })
                    .catch((err) => { return this.setMsgError(err.errors[0].message) })


        } catch(e){            
            return this.setMsgError(err.errors[0].message);
        }
    }

    /**
     * @param integer id 
     */
    async delete(id){

        try{
            const reg = await this.getModel().findOne({where: {id}});
            if( !reg ){
                return this.setNotFound()
            }

            return reg.destroy()
                    .then((d) => true)
                    .catch((err) => { return this.setMsgError(err.errors[0].message) })


        } catch(e){            
            return this.setMsgError(err.errors[0].message)
        }
    }

    /**
     * Overrider class BaseController
     * @param Request req 
     */
    async getByPaginate(req){
        return super.getByPaginate(req, ['id','name','wheels'])
    }
}

module.exports = new TypeVehicleRepository()
