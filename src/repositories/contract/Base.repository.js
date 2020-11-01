"use restrict";

module.exports = class {

    constructor(){
        this._msgError = null;
    }

    setMsgError(msg){
        this._msgError = msg;
        return this;
    }

    getMsgError(){
        return this._msgError;
    }

};