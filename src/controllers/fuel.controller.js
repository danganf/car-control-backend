"use restrict";

//const repository = require('../repositories/fuel-repository');

exports.getAll = async (req, res, next) => {
    try{
        //let dataResult = await repository.getAll();
        res.status(200).send({teste: true});
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }
}