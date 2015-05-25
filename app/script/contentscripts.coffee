r = chrome.runtime

r.onMessage.addListener (req) ->
  body = document.body
  switch req.emit
    when 'ikasumi:has'
      r.sendMessage {has: /chrome-extension-ikasumi/.test body.className}, ->
    when 'ikasumi:apply'
      body.className += ' chrome-extension-ikasumi'
    when 'ikasumi:unapply'
      body.className = body.className.replace /\schrome-extension-ikasumi/, ''
