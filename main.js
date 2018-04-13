(function main() {

var Plot = {
    id: 'plot',
    imgId: 'hover-image',
    domain: 'https://plot.ly'
};

Plot.iframe = document.getElementById(Plot.id);
Plot.graphContentWindow = Plot.iframe.contentWindow;

Plot.hoverImg = document.getElementById(Plot.imgId);

Plot.init = function init() {
    var pinger = setInterval(function() {
        Plot.post({task: 'ping'});
    }, 500);

    function messageListener(e) {
        var message = e.data;

        if(message.pong) {
            console.log('Initial pong, frame is ready to receive');
            clearInterval(pinger);

            Plot.post({
                'task': 'listen',
                'events': ['hover']
            });
        }
        else if(message.type === 'hover') {
            Plot.onHover(message);
        }
    }

    window.removeEventListener('message', messageListener);
    window.addEventListener('message', messageListener);
};

Plot.post = function post(o) {
    Plot.graphContentWindow.postMessage(o, Plot.domain);
};

 var artistToUrl = {
     'camisa-jeans-alongada':'https://fnagano.github.io/jeans/Blusa1.jpg',
     'camisa-jeans-bolso':'https://fnagano.github.io/jeans/Blusa2.jpg',
     'camisa-jeans-azul-médio':'https://fnagano.github.io/jeans/Blusa3.jpg',
     'camisa-feminina-jeans-manga-longa-azul-escuro':'https://fnagano.github.io/jeans/Blusa4.jpg',
     'camisa-jeans-feminina-manga-longa-azul-escuro':'https://fnagano.github.io/jeans/Blusa5.jpg',
     'camisa-jeans-bolso-':'https://fnagano.github.io/jeans/Blusa6.jpg',
     'camisa-jeans-textura':'https://fnagano.github.io/jeans/BLusa7.jpg',
     'camisa-jeans-básica':'https://fnagano.github.io/jeans/Blusa8.jpg',
     'camisa-jeans-alongada-':'https://fnagano.github.io/jeans/Blusa9.jpg',
 };    


var blankImg = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

Plot.onHover = function(message) {
    var artist = message.points[0].x
        .toLowerCase()
        .replace(/ /g, '-');

    var imgSrc = blankImg;

    if(artistToUrl[artist] !== undefined) imgSrc = artistToUrl[artist];

    Plot.hoverImg.src = imgSrc;
};

Plot.init();

})();
