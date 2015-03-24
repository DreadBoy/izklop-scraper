var $ = require('cheerio'),
    request = require('request'),
    iconv = require('iconv-lite');

function getArticles(html, domain){
    var articles = [];
    var parsedHTML = $.load(html);
    parsedHTML('.titlelink').map(function(i, link) {
        var href = $(link).attr('href');
        articles.push("http://izklop.com" + href);
    });
    return articles;
}

function getComments(html){
    var comments = [];
    var parsedHTML = $.load(html);
    parsedHTML(".postbodymain").each(function(index, post){
        var text = $(post).text().trim();
        if(text.length > 0) {
            comments.push(text);
        }
    });
    return comments;
}


module.exports = new function IzklopParser(){
    var that = this;


    that.parseArticleList = function (domain, callback) {
        var comments = [];
        var articlesFinished = 0;
        var articlesNum = 0;
        request.get({
                uri:domain,
                encoding: null
            },
            function(err, response, html) {
                if (err)
                    return console.error(err);
                html = iconv.decode(html, 'windows-1250');
                var articles = getArticles(html);
                articlesNum = articles.length;
                articles.forEach(function (link, index) {
                    request.get({
                        uri:link,
                        encoding: null
                    },
                    function (err, response, html) {
                        articlesFinished++;
                        console.log(articlesFinished + "/" + articlesNum);
                        if (err)
                            return console.error(err);
                        html = iconv.decode(html, 'windows-1250');
                        var cooms = getComments(html);
                        cooms.forEach(function (comment) {
                            comments.push(comment);
                        });
                        if (articlesFinished == articlesNum)
                            callback(comments);
                    });
                });
            });

    };

    that.parseArticleListMore = function (start, number, callback) {
        var comments = [];
        for(var j = start; j < start + number; j++) {
            (function(i) {
                var domain = "http://izklop.com/?page=" + i;
                that.parseArticleList(domain, function (comms) {
                    console.log("Končana stran: " + i + "/" + (number));
                    comments = comments.concat(comms);
                    if(i == start + number - 1)
                        callback(comments);
                });
            })(j);
        }
    };

    return that;
};