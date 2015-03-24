var mongoose = require('mongoose'),
    _ = require('lodash');


var korpusSchema = new mongoose.Schema({
    "ime": String,
    "nerazvrščen": [String],
    "primeren": [String],
    "neprimeren": [String]
});
var Korpus = mongoose.model('Korpus', korpusSchema, "neprimeren-govor-korpus");

mongoose.connect('mongodb://jt:jt@kahana.mongohq.com:10016/pesek');
var ročniKorpus = mongoose.Schema.ObjectId("551168966039fd401b2657c7");

module.exports = new function Database() {
    var self = this;
    self.saveNerazvrščen = function (comments) {

        Korpus.findById("551168966039fd401b2657c7", function (err, doc){
            if(err)
                console.log(err);
            doc["nerazvrščen"] = _.uniq(doc["nerazvrščen"].concat(comments));

            doc.save(function (err) {
                if (err) // ...
                    console.log(err);
            });
        });
    };
    return self;
};
