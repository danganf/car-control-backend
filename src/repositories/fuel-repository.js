"use restrict";

var exceptions = require('~/util/Exceptions');
const {CON_LANG, DATE_TIME_ZONE} = require('~/configs/config-default');
const {Fuel} = require('~models');
const BaseRepository = require('~repo/contract/Base.repository');

class FuelRepository extends BaseRepository {

    constructor(){
        super(Fuel)
    }
    
    async getAll() {
        let data = [];
        return data;
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

    async update(id, arrayData){
        
        return await this.getModel().findOne({
            where: {id},
        })
        .then( (fuel) => {

            if (!fuel) {
                return this.setMsgError('Registro não encontrado')
            }

            const { name, description } = arrayData
            return fuel.update({ name, description })
            .then((c) => {
                return c
            })
            .catch((err) => {
                return this.setMsgError(err.errors[0].message);
            })
        })
        .catch((err) => {
            return this.setMsgError(err.errors[0].message);
        })
    }

}

module.exports = new FuelRepository()

// exports.getAll = async () => {

//     let data = [];
//     return data;
// };

// exports.createOrUpdate = async(arrayData) => {

//     const { name, description } = arrayData
//     console.log(Fuel);

//     return Fuel.create({name, description})
//     .then(
//         (fuel) => {
//             return fuel.id;
//         }
//     )
//     .catch((err) => {
//       return err.errors[0].message
//     })
// }