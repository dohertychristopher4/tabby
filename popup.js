document.addEventListener('DOMContentLoaded', () => {
    validJSONstr = '[{}]'

    chrome.storage.local.get(['config'], result => {
        document.getElementById('jsonConfig').value = JSON.stringify(result.config, null, 3)
        validJSONstr = JSON.stringify(result.config, null, 3)
    })

    document.getElementById('saveButton').addEventListener('click', () => {
        try {
            const updatedData = JSON.parse(document.getElementById('jsonConfig').value)
            chrome.storage.local.set({'config': updatedData}, () => {})
            window.close()
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.reload(tabs[0].id, {bypassCache: true})
            })
        } catch {
            document.getElementById('error').textContent = 'Error: invalid json, config was reset, please try again'
            document.getElementById('jsonConfig').value = validJSONstr
        }
    })
    
    document.getElementById('resetDefaultButton').addEventListener('click', () => {
        chrome.storage.local.remove(['config'], () => {})
        window.close()
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.reload(tabs[0].id, {bypassCache: true})
        })
    })
})
