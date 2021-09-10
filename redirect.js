function checkServer(msecs, promise) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('timeout'))
        }, msecs);
    });
    return Promise.race([timeout, promise])
}

const testURL = [
    'http://10.11.36.60:8080/#/signin',
    'http://10.11.36.61:8080/#/signin',
    'http://10.1.2.182/#/signin',
    'http://gcurobot.quickconnect.cn'
]

var testPromise = []
var testStatus = new Array(testURL.length).fill(false)
for (let i = 0; i != testURL.length; i++) {
    testPromise.push(
        checkServer(1000, fetch(testURL[i], { mode: 'no-cors' }))
            .then((result) => {
                testStatus[i] = true
                console.log('Success: ' + testURL[i])
            })
            .catch((e) => {
                console.log(e)
            })
    )
}

Promise.all(testPromise)
    .then(() => {
        for (let i = 0; i != testURL.length; i++) {
            if (testStatus[i]) {
                window.location.href = testURL[i]
                break
            }
        }
    })
