if(process.env.NODE_ENV === 'development'){
    //production Mode
    module.exports = require('./prod');
}else{ 
    //development Mode
    module.exports = require('./dev')
}
