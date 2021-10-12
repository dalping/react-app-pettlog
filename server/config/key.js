if(process.env.NODE_ENV === 'development'){
    //development Mode
    module.exports = require('./dev')
}else{ 
    //production Mode
    module.exports = require('./prod');
}
