"use restrict";

const {FORMAT_RESUL,formatPaginate} = require('~/util/paginate');
const i18n = require("i18n")
const sequelize = require("sequelize")

module.exports = class {

    constructor(model){
        this._msgError = null
        this._model = model
        this._statusCodeError = 400
        this._dataResult = []
        this.isEmpty = true
        this._orm = sequelize
    }

    getModel(){
        return this._model
    }

    forceModel(model){
        this._model = model
        return this
    }

    async count(id) {
        return await this.getModel().count({
            where: this._orm.literal(`id = '${id}'`)
        })
    }
    
    async getById(id, attributes=[]) {
        let search = {where: {id}}
        
        if( _.isArray(attributes) && !_.isEmpty(attributes) ){
           search.attributes = attributes
        }

        let data = await this.getModel().findOne(search)
        if( !data ){data = []}
        this._setDataResult(data)
        return data
    }
    
    async getByPaginate(req, arrayFields, arrayOrderBy) {

        arrayOrderBy = arrayOrderBy || ['created_at','DESC']

        this._setDataResult(FORMAT_RESUL)
        let limit = req.query.limit
        return await this.getModel()
        .findAndCountAll({
            limit, 
            offset: req.skip, 
            raw: true, 
            nest: true,
            attributes: arrayFields,
            order: [ arrayOrderBy ] // sequelize.literal("")
        })
        .then(results => {
            this._setDataResult(results)
            return formatPaginate(req, results)

        }).catch(err => {
            return data
        });
    }

    isOk(){
        const flag = Object.keys(
                        typeof this._dataResult.rows === 'undefined' ? this._dataResult : this._dataResult.rows
                    ).length > 0 ? true : false
        this.isEmpty = !flag
        if(!flag){
            this.setNotFound()
        }
        return flag
    }

    _setDataResult(data){
        this._dataResult = data
        this.isOk()
        return this
    }

    setMsgError(msg, code){
        this._msgError = msg
        if(typeof code !== 'undefined'){
            this._statusCodeError = code
        }
        return false
    }

    setNotFound(){
        this._msgError = i18n.__('crud.not_found')
        this._statusCodeError = 404
    }

    getMsgError(){
        return this._msgError
    }

    getStatusCode(){
        return this._statusCodeError
    }

};