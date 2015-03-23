var parser = require('./parser'),
    fs = require('fs'),
    _ = require('lodash');



parser.parseArticleListMore(2, function(comments){
    comments = _.uniq(comments);
    fs.writeFile('korpus.txt', comments.join("\n"), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});



/*
request.get({
        uri:'http://izklop.com',
        encoding: null
    },
    function(err, resp, html){
        html = iconv.decode(html, 'windows-1250');
        console.log(html);
        fs.writeFile('index.html', html, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');

        });
    }
);
*/
