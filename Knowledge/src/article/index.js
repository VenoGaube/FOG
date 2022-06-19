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

async function readArticle(ual) {
    var articleProxy = await dkg.assets.get(ual);

    const articleData = await articleProxy.data.valueOf;

    return articleData;
}

async function updateArticle(ual, article) {
    var result = await dkg.assets.update({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "author": article.user,
        "submission": article.submission,
        "revision": article.revision,
        "stage": article.stage,
        "finalDecision": article.finalDecision
    }, ual, {
        "keywords": ["article"],
        "visibility": "public"
    })
}

async function searchArticleByKeyword(keyword) {
    var result = dkg.search({query: keyword, resultType: 'entities'});

    const articleData = await articleProxy.data.valueOf;

    return articleData;
}