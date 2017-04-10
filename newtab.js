chrome.storage.managed.get('urls', d=> {
  if (d['urls']) {
    for (var url of d['urls']) {
      var a = document.createElement('a')
      a.href = url
      a.innerText = url
      document.body.appendChild(a)
      document.body.appendChild(document.createElement('hr'))
    }
  }
})
