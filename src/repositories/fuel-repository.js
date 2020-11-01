"use restrict";

var exceptions = require('~/util/Exceptions');
const {CON_LANG, DATE_TIME_ZONE} = require('~/configs/config-default');
const {Fuel} = require('~models');
const BaseRepository = require('~repo/contract/Base.repository');

class FuelRepository extends BaseRepository {
    
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
    
        return Fuel.create({name, description})
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