const DKG = require('dkg.js')

const dkg = new DKG({ 
    endpoint: '127.0.0.1', 
    port: '8900', 
    useSSL: false,
    loglevel: 'trace' 
});

async function saveArticle(article) {
    var article = await dkg.assets.create({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "author": article.user,
        "submission": article.submission,
        "revision": article.revision,
        "stage": article.stage,
        "finalDecision": article.finalDecision
    }, {
        "keywords": ["article"],
        "visibility": "public"
    });

    var ual = article.data.metadata.UALs[0];
    return ual;
}

function saveUser(user) {
    var user = await dkg.assets.create({
        "@context": "https://schema.org",
        "@type": "Person",
    })
}


(async ()=> {
    var result = await dkg.nodeInfo().then(result => {
        console.log(JSON.stringify(result));
    }).catch(e => {
        console.error(e)
    });
    
})



