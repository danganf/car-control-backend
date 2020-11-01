"use restrict";

module.exports = class {

    constructor(model){
        this._msgError = null
        this._model = model
        this._statusCodeError = 400
        this._dataResult = []
        this.isEmpty = true
    }

    getModel(){
        return this._model
    }

    forceModel(model){
        this._model = model
        return this
    }

    async getById(id) {
        let data = await this.getModel().findOne({where: {id}})
        if( !data ){data = []}
        this._setDataResult(data)
        return data
    }
    
    async getByPaginate(req) {
        const data = {
            items_count: 0,
            page_count: 0,
            pages: 0,
            rows: []
        }

        let page = typeof req.query.page !== 'undefined' ? parseInt(req.query.page) : 1
        let limit = typeof req.query.limit !== 'undefined' ? parseInt(req.query.limit) : 1

        await this.getModel()
        .findAndCountAll({limit: 10, offset: 0})
        .then(results => {
            data.items_count = results.count
            data.page_count = Math.ceil(results.count / limit)
            data.rows = results.rows

            res.render('users/all_users', {
                users: results.rows,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(3, data.page_count, page)
            });
        }).catch(err => {
            return data
        });
    }

    isOk(){
        const flag = Object.keys(this._dataResult).length > 0 ? true : false
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
        this._msgError = `Registro não encontrado`
        this._statusCodeError = 404
    }

    getMsgError(){
        return this._msgError
    }

    getStatusCode(){
        return this._statusCodeError
    }

};