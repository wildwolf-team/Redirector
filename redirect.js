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
    'https://gcurobot.quickconnect.cn'
]

for (let i = 0; i < testURL.length; i++) {
    checkServer(1000, fetch(testURL[i], { mode: 'no-cors' }))
        .then((result) => {
            console.log('Success: redirecting')
            window.location.href = testURL[i]
        })
        .catch((e) => {
            console.log(e)
        })
}
