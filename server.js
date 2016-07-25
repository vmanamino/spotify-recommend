<html>
    <head>
        <title>Spotify</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <!-- CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/pure-min.css">
        <!--[if lte IE 8]>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/grids-responsive-old-ie-min.css">
        <![endif]-->
        <!--[if gt IE 8]><!-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/grids-responsive-min.css">
        <!--<![endif]-->

        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
        <style>
body {
    background-color: #F8F8F8;
    color: #1E2835;
    font-size: 1.2em;
}
a, a:visited, a:hover, a:active {
    text-decoration: none;
    color: inherit;
    transition: color 0.5s;
}
a:hover {
    color: #3476FF;
}
form {
    padding: 20px;
    text-align: center;
    background-color: #575E68;
}
form.pure-form {
    margin-bottom: 0;
}
img {
    vertical-align: middle;
}
.button-primary {
    background-color: #3476FF;
}
h1 {
    padding: 20px;
    background-color: #CDDDFF;
    margin: 0 0 20px 0;
    text-align: center;
}
h2 {
    margin: 0 0 5px 0;
}
div#result {
    transition: opacity 1s;
}
div#result.transparent{
    opacity : 0;
}
div.main {
    padding: 60px;
}
div.main img {
    float: left;
}
div.main .artist {
    padding-left: 84px;
    padding: 0 20px 20px 84px;
    margin-bottom: 20px;
}
ul {
    padding: 0;
}
li {
    list-style-type: none;
}
        </style>


        <!-- JS -->
        <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.js"></script>

        <script>
var Spotify = function() {
    this.searchButton = $('button');
    this.searchButton.click(this.onSearchClicked.bind(this));
    this.searchForm = $('form');
    this.searchForm.submit(this.onSearchSubmitted.bind(this));
    this.searchBox = $('input');
    this.result = $('#result');
    this.artistTemplate = Handlebars.compile($("#artist-template").html());
};
Spotify.prototype.onSearchClicked = function() {
    var name = this.searchBox.val();
    this.search(name);
    this.result.toggleClass('transparent');
};
Spotify.prototype.onSearchSubmitted = function(event) {
    event.preventDefault();
    this.searchButton.trigger('click');
};
Spotify.prototype.search = function(name) {
    var ajax = $.ajax('/search/' + name, {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(this.onSearchDone.bind(this));
};
Spotify.prototype.onSearchDone = function(artist) {
    var result = $(this.artistTemplate(artist));
    this.result.empty().append(result);
    this.result.toggleClass('transparent');
};
$(document).ready(function() {
    var app = new Spotify();
});
        </script>
    </head>
    <body>
        <form class="pure-form">
            <input type="text">
            <button type="button" class="pure-button pure-button-primary">Find Related Artists</button>
        </form>
        <div id="result">
        </div>


        <script id="artist-template" type="text/x-handlebars-template">
            <div>
                <h1>
                    {{#each images}}
                    {{#if @last }}
                    <img src="{{ url }}">
                    {{/if}}
                    {{/each}}
                    <a href="{{uri}}">{{ name }}</a>
                </h1>
                <div class="pure-g main">
                    {{#each related}}
                    <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                        {{#each images}}
                        {{#if @last }}
                        <img src="{{ url }}">
                        {{/if}}
                        {{/each}}
                        <div class="artist">
                            <h2>
                                <a href="{{uri}}">{{name}}</a>
                            </h2>
                            <ul>
                                {{#each tracks}}
                                <li>
                                    <a href="{{uri}}">{{ name }}</a>
                                </li>
                                {{/each}}
                            </ul>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
        </script>
    </body>
</html>