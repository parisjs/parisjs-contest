var twitter = require('ntwitter');
var fs = require('fs');

var twit = new twitter(JSON.parse(fs.readFileSync('config.json')));

var myTweetId = "311056119210602496";

twit
    .verifyCredentials(function(err, data) {
        if (err) throw err;
    })
    .getMentions({count: 200}, function(err, data) {
        if (err) throw err;
        var participants = [];
        data.forEach(function(twitt) {
            if (twitt.in_reply_to_status_id_str === myTweetId) {
                participants.push(twitt);
            }
        });
        console.log(participants.length + ' participants');

        var content = participants.map(function(twitt) {
            return [twitt.created_at, twitt.user.name, twitt.user.screen_name, twitt.text].join(',');
        }).join("\n");
        content = ['Date', 'User', 'Username', 'Text'].join(',')+"\n"+ content;
        fs.writeFile('participants.csv', content, function (err) {
            if (err) throw err;
            console.log('now: $EDITOR participants.csv and remove bad answer');
        });
    });
 ;
