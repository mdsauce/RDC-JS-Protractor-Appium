let fs = require('fs')

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('Grab initial screenshot of Login page', () => {
    browser.takeScreenshot().then(function (png){
        writeScreenShot(png, 'loginScreenshot.png')
    })
})