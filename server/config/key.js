if(process.env.NODE_ENV === 'production'){  
     module.exports = require('./prod');
}else{ 
    //development Mode
    module.exports = require('./dev');
}