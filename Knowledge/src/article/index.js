const DKG = require('dkg.js');
const util = require('util')

const dkg = new DKG({ 
    endpoint: '127.0.0.1', 
    port: '8900', 
    useSSL: false,
    loglevel: 'trace' 
});

async function saveArticle(article) {

    try {
        var article = await dkg.assets.create({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "author": article.user,
            "submission": article.submission,
            "revision": article.revision,
            "stage": article.stage,
            "finalDecision": article.finalDecision,
            "review": []
        }, {
            "keywords": ["article"],
            "visibility": "public"
        });
        return article;
    } catch(e) {
        console.log(e);
    }
    
}

async function readArticle(ual) {
    try {
    var articleProxy = await dkg.assets.get(ual);
    const data = await articleProxy.data;
    //const articleData = await articleProxy;

    return data;
    } catch (e) {
        console.log(e);
    }
}

async function updateArticle(ual, article) {
    
    try{
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
    } catch(e) {
        console.log(e);
    }
}

async function searchArticleByKeyword(keyword) {
    var result = dkg.search({query: keyword, resultType: 'entities'});

    const articleData = await articleProxy.data.valueOf;

    return articleData;
}

let article = {
    title: "Article title",
    user: "Author",
    submission: "Submission",
    revision: "Revision",
    stage: "Not ready",
    finalDecision: "NO"
}

async function test() {
    var result = await dkg.nodeInfo();
    console.log(JSON.stringify(result, null, 2));
}

async function saveTestArticle() {
    
    article = await saveArticle(article);
    var ual = await article.data.metadata.UALs[0];
    console.log(ual);
}

ual = "b520cdf18819f471bf9e8bf9624b4e440461e2bfc33a7bf560f8bc41151ea3be"
async function getTestArticle() {
    article = await readArticle(ual);
    console.log(util.inspect(article.valueOf, false, null, true /* enable colors */))
}

//test()
//saveTestArticle()
getTestArticle()