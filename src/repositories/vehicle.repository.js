"use restrict";

const {Vehicle} = require('~models');
const BaseRepository = require('~repo/contract/base.repository');
const UserRepository = require('~repo/user.repository');
const TypeVehicleRepository = require('~repo/type-vehicle.repository');
const ManufactureRepository = require('~repo/manufacture-repository');
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

        let total = await UserRepository.count(user_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'user_id'}))

        total = await TypeVehicleRepository.count(type_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'type_id'}))
        
        total = await ManufactureRepository.count(manufacture_id)
        if(total === 0)
            dataError.push(i18n.__('register_notfound_param',{i: 'manufacture_id'}))

        console.log(objectJson.fuels)

        // objectJson.fuels.foreach(fuel => {
        //     console.log(fuel)
        // })    

        if( dataError.length>0 )
            return this.setMsgError(dataError)

        try{
            
            //const result = await this.getModel().create(_.omit(objectJson,'fuels'))
            console.log('aaaa', result)
        } catch(err){
            this.setMsgError(err.parent.code)
        }
    
        // return await this.getModel().create({name, description})
        // .then(
        //     (reg) => {
        //         return {id: reg.id};
        //     }
        // )
        // .catch((err) => {
        //     this.setMsgError(err.errors[0].message);
        //     return false;
        // })
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
