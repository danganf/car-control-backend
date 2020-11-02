"use restrict";

const {Vehicle} = require('~models');
const BaseRepository = require('~repo/contract/base.repository');
const UserRepository = require('~repo/user.repository');
const TypeVehicleRepository = require('~repo/type-vehicle.repository');
const ManufactureRepository = require('~repo/manufacture-repository');
const FuelRepository = require('~repo/fuel.repository');
const i18n = require("i18n")

class VehicleRepository extends BaseRepository {

    constructor(){
        super(Vehicle)
    }
    
    /**
     * 
     * @param {object} objectJson
     * @param {string} id
     * @return string | boolean
     */
    async createOrUpdate(objectJson, id=null) {

        const { user_id, type_id, manufacture_id } = objectJson
        const dataError = []

        //VALID USER
        let total = await UserRepository.count(user_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'user_id'}))

        //VALID TYPE VEHICLE
        total = await TypeVehicleRepository.count(type_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'type_id'}))
        
        //VALID MANUFACTORE 
        total = await ManufactureRepository.count(manufacture_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'manufacture_id'}))

        ///VALID IF FUELS EXITS
        let dataFuel = []
        let promises = Object.values(objectJson.fuels).map(async(fuel) => {
            const {id,size} = fuel
            if(id){
                const data = await FuelRepository.getById(id)
                if(data){
                    dataFuel.push({model: data, size})
                }
            }
        });
        await Promise.all(promises)
        //END

        if(objectJson.fuels.length != dataFuel.length)
            dataError.push(i18n.__('crud.fuels_not_found'))

        if( dataError.length>0 )
            return this.setMsgError(dataError)

        try{
            const vehicle = await this.getModel().create(_.omit(objectJson,'fuels'));
            if( !vehicle ){
                return this.setMsgError(i18n.__('crud.create.no'))
            }
            
            let flag = true
            promises = Object.values(dataFuel).map(async(fuel) => {
                const result = await vehicle.addFuels(fuel.model, { 
                    through: {
                        size: fuel.size,
                    }
                })
                if(!result) flag = false
            })

            await Promise.all(promises)

            if(flag){
                return {id: vehicle.id}
            } else {
                vehicle.destroy()
                return this.setMsgError(i18n.__('crud.create.no'))
            }

        } catch(err){
            console.log(err)
            this.setMsgError(err.parent.code)
        }
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

            const { name, description } = arrayData
            return reg.update({ name, description })
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
        return super.getByPaginate(req, ['id','name','description'])
    }
}

module.exports = new VehicleRepository()
