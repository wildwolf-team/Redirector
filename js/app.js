function loadRedirector() {
    let script = document.createElement('script')
    script.src = 'js/config.js'
    script.setAttribute('onload', 'redirector(testURL, testTimeout, testInterval)')
    document.head.appendChild(script)
}

function loadServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then((reg) => {
            if (reg.installing) {
                console.log('Service worker: installing')
            } else if (reg.waiting) {
                console.log('Service worker: installed')
            } else if (reg.active) {
                console.log('Service worker: active')
            }
        }).catch((err) => {
            console.log('Service worker: registration failed with ' + err)
        })
    }
}

document.addEventListener('readystatechange', (event) => {
    if (document.readyState === 'complete') {
        loadServiceWorker()
        loadRedirector()
    }
})
