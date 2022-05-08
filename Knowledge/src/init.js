const DKG = require('dkg.js')

const dkg = new DKG({ 
    endpoint: '127.0.0.1', 
    port: '8900', 
    useSSL: false,
    loglevel: 'trace' 
});

var result = await dkg.nodeInfo();
console.log(JSON.stringify(result, null, 2));