var parser = require('./parser'),
    database = require('./database'),
    fs = require('fs'),
    _ = require('lodash');



parser.parseArticleListMore(23, 1, function(comments){
    comments = _.uniq(comments);
    console.log("Done! Vse pobrano in shranjeno.");
    console.log("Našel sem " + comments.length + " komentarjev.");
    database.saveNerazvrščen(comments);
    /*fs.writeFile('korpus.txt', comments.join("\n"), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });*/
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
