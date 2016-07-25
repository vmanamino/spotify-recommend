var unirest = require('unirest');
var express = require('express');
var events = require('events');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var app = express();
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        console.log(item.artists.items[0].id)
        var id = item.artists.items[0].id;
        var artist = item.artists.items[0];
        unirest.get('https://api.spotify.com/v1/artists/'+id+'/related-artists')
            .end(function(response){
                if(response.ok){
                    // console.log(response.body.artists)
                    artist.related = response.body.artists;
                    console.log(artist)
                }
                else {
                    res.sendStatus(404);
                }
            })
        
        res.json(artist);
    });

    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(process.env.PORT || 8080);