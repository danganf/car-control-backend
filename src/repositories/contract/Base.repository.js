"use restrict";

module.exports = class {

    constructor(model){
        this._msgError = null;
        this._model = model;
    }

    getModel(){
        return this._model;
    }

    forceModel(model){
        this._model = model;
        return this;
    }

    setMsgError(msg){
        this._msgError = msg;
        return false;
    }

    getMsgError(){
        return this._msgError;
    }

};