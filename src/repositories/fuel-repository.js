"use restrict";

var exceptions = require('~/util/Exceptions');
const {CON_LANG, DATE_TIME_ZONE} = require('~/configs/config-default');
const {Fuel} = require('~models');
const BaseRepository = require('~repo/contract/Base.repository');

class FuelRepository extends BaseRepository {

    constructor(){
        super(Fuel)
    }
    
    /**
     * 
     * @param Array arrayData
     * @return string | boolean
     */
    async create(arrayData) {

        const { name, description } = arrayData
    
        return this.getModel().create({name, description})
        .then(
            (fuel) => {
                return {id: fuel.id};
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
            const fuel = await this.getModel().findOne({where: {id}});
            if( !fuel ){
                return this.setNotFound();
            }

            const { name, description } = arrayData
            return fuel.update({ name, description })
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
            const fuel = await this.getModel().findOne({where: {id}});
            if( !fuel ){
                return this.setNotFound();
            }

            return fuel.destroy()
                    .then((d) => true)
                    .catch((err) => { return this.setMsgError(err.errors[0].message) })


        } catch(e){            
            return this.setMsgError(err.errors[0].message);
        }
    }
}

module.exports = new FuelRepository()
