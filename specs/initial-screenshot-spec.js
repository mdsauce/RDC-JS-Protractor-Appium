let fs = require('fs')

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('When my app loads', function () {
    browser.driver.sleep(7000)

    it('checks that two contexts are available', function () {
        wdBrowser.contexts().then(function (contexts) { 
            // get list of available views. Should return array: ["NATIVE_APP","WEBVIEW_something.something"]
            console.log(contexts)
        })
    })

    console.log("Jasmine default timeout", jasmine.DEFAULT_TIMEOUT_INTERVAL)
    console.log("Now trying to take a screenshot")
    it('will take a screenshot of the login', function () {
        console.log("The screenshot is about to start <<<< 5, 4, 3, 2, 1...")
        wdBrowser.context('NATIVE_APP').then(() => {
            browser.takeScreenshot().then(function (png){
                console.log("inside the screenshot function <--------<----------<-----")
                writeScreenShot(png, 'loginScreenshot.png')
            })
        })
    })
})