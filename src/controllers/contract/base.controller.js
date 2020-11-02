"use restrict";

class BaseController {

    constructor(){

    }
    
    ok(res, message, data=[], code = 200){
        message = typeof message !== 'undefined' && message !== '' && message !== null ? message : res.__('request.ok');
        return res.status(code).send({ message, data })
    }

    fail(res, message, data = [], code = 400){
        message = typeof message !== 'undefined' && message !== '' ? message : res.__('request.no')
        let detail = []
        if(!data){data = []}

        if(typeof data === 'string'){
            detail.push({msg: data})
        } else {
            detail = data
        }
        return res.status(code).send({ message, detail })
    }

    notFound(res){
        return res.status(404).send({ message: res.__('crud.not_found'), detail: [] })
    }
}

module.exports = BaseController