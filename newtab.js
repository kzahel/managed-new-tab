// TODO support non managed

chrome.management.getSelf( async info => {
  if (info.mayDisable) {
    setup_local()
  } else {
    setup_managed()
  }
})


function onconf(d) {
  if (d['title']) {
    var h1 = document.createElement('h1')
    h1.innerText = d['title']
    document.body.appendChild(h1)
  }
  if (d['urls']) {
    for (var url of d['urls']) {
      var a = document.createElement('a')
      a.href = url
      a.innerText = url
      document.body.appendChild(a)
      document.body.appendChild(document.createElement('hr'))
    }
  }
}

function setup_managed() {
  chrome.storage.managed.get(null, onconf)
}

const oMap = (o, f) => Object.assign(...Object.keys(o).map(k => ({ [k]: f(o[k]) })))

async function setup_local() {
  const res = await fetch('/bookmarks_configuration.txt')
  const rawconfig = await res.json()
  const config = oMap( rawconfig, v => v.Value )
  onconf(config)
}
