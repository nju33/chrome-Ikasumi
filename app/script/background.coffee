b = chrome.browserAction
t = chrome.tabs
r = chrome.runtime

updateBa = (title, iconPath) ->
  b.setTitle {title: title}
  b.setIcon {path: iconPath}
confirmBa = (id) ->
  t.sendMessage id, {emit: 'ikasumi:has'}, ->
  r.onMessage.addListener (req) ->
    if req.has then updateBa 'Unapply Ikasumi', 'icon/icon_38_act.png'
    else updateBa 'Apply Ikasumi', 'icon/icon_38.png'

t.onUpdated.addListener confirmBa
t.onSelectionChanged.addListener confirmBa

b.onClicked.addListener (tab) ->
  b.getTitle {}, (title) ->
    if title is 'Unapply Ikasumi'
      t.sendMessage tab.id, {emit: 'ikasumi:unapply'}, ->
      updateBa 'Apply Ikasumi', 'icon/icon_38.png'
    else if title is 'Apply Ikasumi'
      t.sendMessage tab.id, {emit: 'ikasumi:apply'}, ->
      updateBa 'Unapply Ikasumi', 'icon/icon_38_act.png'
