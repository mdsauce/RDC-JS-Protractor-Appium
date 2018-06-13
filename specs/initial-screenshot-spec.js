let fs = require('fs')

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('When my app loads', function () {
    it('checks that two contexts are available', function () {
        console.log(wdBrowser.contexts())
    })

    console.log("Jasmine default timeout", jasmine.DEFAULT_TIMEOUT_INTERVAL)
    console.log("Now trying to take a screenshot")
    it('will take a screenshot of the login', function () {
        console.log("The screenshot is about to start <<<< 5, 4, 3, 2, 1...")
        browser.driver.sleep(7000)
        browser.takeScreenshot().then(function (png){
            console.log("inside the screenshot function <--------<----------<-----")
            writeScreenShot(png, 'loginScreenshot.png')
        })
    })
})