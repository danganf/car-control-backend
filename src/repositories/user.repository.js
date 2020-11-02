"use restrict";

const {User} = require('~models')
const BaseRepository = require('~repo/contract/base.repository')

class UserRepository extends BaseRepository {

    constructor(){
        super(User)
    }

    /**
     * Overrider class BaseController
     * @param Request req 
     */
    async getByPaginate(req){
        return super.getByPaginate(req, ['id','name','email'])
    }
}

module.exports = new UserRepository()
