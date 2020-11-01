"use restrict";

module.exports = class {

    constructor(model){
        this._msgError = null
        this._model = model
        this._statusCodeError = 400
    }

    getModel(){
        return this._model
    }

    forceModel(model){
        this._model = model
        return this
    }

    setMsgError(msg, code){
        this._msgError = msg
        if(typeof code !== undefined){
            this._statusCodeError = code
        }
        return false;
    }

    setNotFound(){
        this._msgError = `Registro não encontrado`;
        this._statusCodeError = 404;
    }

    getMsgError(){
        return this._msgError
    }

    getStatusCode(){
        return this._statusCodeError
    }

};