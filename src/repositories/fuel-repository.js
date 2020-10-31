"use restrict";

var exceptions = require('~/util/Exceptions');
const {CON_LANG, DATE_TIME_ZONE} = require('~/configs/config-default');
const {Fuel} = require('~models'); // new require for db object
const { v4: uuidv4 } = require('uuid');

exports.getAll = async () => {

    let data = [];
    return data;
};

exports.createOrUpdate = async(arrayData) => {

    const { name, description } = arrayData
    console.log(Fuel);

    return Fuel.create({ 
        id: uuidv4(),
        name, 
        description
    })
    .then(
        (fuel) => {
            console.log(fuel);
        }
    )
    .catch((err) => {
      return err
    })
}