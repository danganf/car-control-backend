"use restrict";

class BaseController {
    
    ok(res, message, data=[], code = 200){
        message = typeof message !== 'undefined' && message !== '' && message !== null ? message : res.__('request.ok');
        return res.status(code).send({ message, data })
    }

    fail(res, message, detail = [], code = 400){
        message = typeof message !== 'undefined' && message !== '' ? message : res.__('request.no')
        if(!detail){detail = []}
        return res.status(code).send({ message, detail: [detail] })
    }

    notFound(res){
        return res.status(404).send({ message: res.__('crud.not_found'), detail: [] })
    }
}

module.exports = new BaseController()