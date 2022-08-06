const TextSignature = require('text-signature');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
require('jest-canvas-mock');

    //#custom fonts to load 
    var optionsParameter = {
        "width": "700",
        "height": "300",
        "paddingX": "100",
        "paddingY": "100",
        "canvasTargetDom": ".js-canvasTargetDom",
        "font": "50px 'Homemade Apple'",
        "color": "blue",
        "textString": "John Cena",
        "customFont": {
            "name": "'Homemade Apple'",
            "url": "//fonts.googleapis.com/css?family=Homemade+Apple"
        },
        "fillStyle": "blue"
};

textSignature = new TextSignature(optionsParameter);

textSignature.generateImage(optionsParameter);

//get base64 image source data 
textSignature.getImageData( ) ;
