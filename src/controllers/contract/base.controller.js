"use restrict";

class BaseController {
    
    ok(res, message, data=[], code = 200){
        message = typeof message !== 'undefined' && message !== '' && message !== null ? message : "Requisição executada com sucesso";
        return res.status(code).send({ message, data })
    }

    fail(res, message, detail = [], code = 400){
        message = typeof message !== 'undefined' && message !== '' ? message : "Ocorreu um erro na requisição"
        if(!detail){detail = []}
        return res.status(code).send({ message, detail: [detail] })
    }

    notFound(res){
        return res.status(404).send({ message: 'Registro não encontrado', detail: [] })
    }
}

module.exports = new BaseController()