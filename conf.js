var TestObject = require('./node_modules/testobject_api/lib/TestObject');

exports.config = {

    // seleniumAddress: 'http://eu1.appium.testobject.com/wd/hub',
    seleniumAddress: 'http://us1.appium.testobject.com/wd/hub',
    specs: ['specs/*.js'],

    onPrepare: function() {
        var caps = browser.getCapabilities()
    },

    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    multiCapabilities: [{
        testobject_api_key: process.env.apricot_api,
        testobject_device: 'Google_Pixel_real',
        testobject_test_name: Date.now() + " - Testing screenshots",
        testobject_cache_device: "true",
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
        autoWebview : true,
        autoWebviewTimeout: 12000,
    }, {
        testobject_api_key: process.env.apricot_api,
        testobject_test_name: Date.now() + " - Testing screenshots",
        testobject_cache_device: "false",
        platformName: "Android",
        platformVersion: "7",
        phoneOnly: "true",
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
        autoWebview : true,
        autoWebviewTimeout: 12000,
    },
    ],

    // configuring wd in onPrepare
    onPrepare: function () {
        wdBridge.initFromProtractor(config);
    },

    onComplete: function(result) {
        var myAccount = new TestObject({
            username: 'csteam',
            apiKey: process.env.apricot_api,
            password: process.env.RDC_ADMIN_PW
        })

        console.log("result is " + result)

        var printSessionId = function(jobName) {
            browser.getSession().then(function(session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName)
                    myAccount.updateTest(session.getId(), {"passed": result}, function(res){
                })
            })
        }
        printSessionId("Screenshot Tests")
    }
};
