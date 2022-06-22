
const DKG = require('dkg.js');

const dkg = new DKG({ 
    endpoint: '127.0.0.1', 
    port: '8900', 
    useSSL: false,
    loglevel: 'trace' 
});


ual = "b520cdf18819f471bf9e8bf9624b4e440461e2bfc33a7bf560f8bc41151ea3be"
async function addReview(article_ual, reviewData) {
    try{
        var articleProxy = await dkg.assets.get(ual);

        const article = await articleProxy.data.valueOf;

        if(article.review == null ||article.review == []) {
            let updatedArticle = await dkg.assets.update({
                ...article,
                "review": [{
                    "@type": "Review",
                    "author": reviewData.user,
                    "reviewBody": reviewData.text,
                    "dateCreated": reviewData.date
                }]
            }, ual, {"visibility": "public", "keywords": ["article"]});
        }
    } catch(e) {
        console.log(e);
    }
    
    
}

addReview(ual,{date: '22.1.2022', text: 'Good', user: 'un'});

