(function (module) {

  function Piece(keys) {
    // Title, Date, Url, Github url, imgUrl, Description
    this.title = keys.title;
    this.date = keys.date;
    this.url = keys.url;
    this.gitUrl = keys.gitUrl;
    this.imgUrl = keys.imgUrl;
    this.description = keys.description;
  }
  Piece.all = [];

  Piece.prototype.postIt = function(){
    var newPiece = $('#template').html();
    var compiledPost = Handlebars.compile(newPiece);
    console.log('Handlebars compiler has been ran');
    return compiledPost(this);

  };


  Piece.loadAll = function (rawData) {
    Piece.all = rawData.map(function(el){
      return new Piece(el);
    });
  };

  Piece.fetchData = function(callback) {
    if(localStorage.portItems) {
      Piece.loadAll(JSON.parse(localStorage.portItems));
      console.log('loaded all from local storage');
      callback();

    } else {
      $.getJSON('data/portfolioData.json', function(rawData) {
        console.log('Getting json rawdata from file', rawData);
        Piece.loadAll(rawData);
        localStorage.portItems = JSON.stringify(rawData);
        console.log('stringifying things:', rawData);
        callback();
      });

    }
  };


  Piece.numWordsAll = function() {
    return Piece.all.map(function(portItems) {
      return portItems.description.split(' ').length;
    })
   .reduce(function(accum, index) {
     return accum + index;
   });
  };




  module.Piece = Piece;

})(window);
