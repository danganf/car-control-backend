"use restrict";

const repository = require('~repo/fuel-repository');

exports.getAll = async (req, res, next) => {
    try{
        let dataResult = await repository.getAll();
        res.status(200).send(dataResult);
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }
}

exports.create = async (req, res, next) => {
    try{
        let dataResult = await repository.createOrUpdate(req.body);
        res.status(201).send(dataResult);
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }
}