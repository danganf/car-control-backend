const { CON_API_BASE_URL, CON_API_KEY_AUTH_v3, CON_LANG } = require('../configs/config-default');
const axios = require('axios');
const paginator = {
    current_page: 0,
    total_results: 0,
    total_pages: 0,
};

class axiosService{
    constructor(){
        
    }

    async request( params, paramGet ){
        let data = null;

        paramGet = paramGet || '&';

        const url = CON_API_BASE_URL + params + paramGet + 'language=' + CON_LANG + '&api_key=' + CON_API_KEY_AUTH_v3;
        console.log(url);
        await axios.get( url )
        .then(function (response) {  
            if( typeof response.data.results !== 'undefined'){
                data = response.data.results;
            } else {
                data = response.data;
            }

            paginator.current_page  = response.data.page          || 0;
            paginator.total_results = response.data.total_results || 0;
            paginator.total_pages   = response.data.total_pages   || 0;

        })
        .catch(function (error) {
            
        });
        
        return data;
    }

    getPaginator(key){
        return !key ? paginator : paginator[key];
    }


}

module.exports = new axiosService();