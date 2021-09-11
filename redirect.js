function checkServer(msecs, promise) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('timeout'))
        }, msecs)
    })
    return Promise.race([timeout, promise])
}

const testURL = [
    'http://nas-local.wildwolf.pw:8080/#/signin',
    'http://nas-proxy.wildwolf.pw/#/signin',
    'http://gcurobot.quickconnect.cn'
]

var testPromise = []
var testStatus = new Array(testURL.length).fill(false)
testURL.forEach((url, i) => {
    testPromise.push(
        checkServer(1000, fetch(url, { mode: 'no-cors' }))
            .then((result) => {
                testStatus[i] = true
                console.log('Success: ' + url)
            })
            .catch((e) => {
                console.log(e)
            })
    )
})

Promise.all(testPromise)
    .then(() => {
        for (let i = 0; i != testStatus.length; i++) {
            if (testStatus[i]) {
                window.location.href = testURL[i]
                break
            }
        }
    })
