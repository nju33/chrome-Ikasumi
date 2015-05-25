(function() {
  var b, confirmBa, r, t, updateBa;

  b = chrome.browserAction;

  t = chrome.tabs;

  r = chrome.runtime;

  updateBa = function(title, iconPath) {
    b.setTitle({
      title: title
    });
    return b.setIcon({
      path: iconPath
    });
  };

  confirmBa = function(id) {
    t.sendMessage(id, {
      emit: 'ikasumi:has'
    }, function() {});
    return r.onMessage.addListener(function(req) {
      if (req.has) {
        return updateBa('Unapply Ikasumi', 'icon/icon_38_act.png');
      } else {
        return updateBa('Apply Ikasumi', 'icon/icon_38.png');
      }
    });
  };

  t.onUpdated.addListener(confirmBa);

  t.onSelectionChanged.addListener(confirmBa);

  b.onClicked.addListener(function(tab) {
    return b.getTitle({}, function(title) {
      if (title === 'Unapply Ikasumi') {
        t.sendMessage(tab.id, {
          emit: 'ikasumi:unapply'
        }, function() {});
        return updateBa('Apply Ikasumi', 'icon/icon_38.png');
      } else if (title === 'Apply Ikasumi') {
        t.sendMessage(tab.id, {
          emit: 'ikasumi:apply'
        }, function() {});
        return updateBa('Unapply Ikasumi', 'icon/icon_38_act.png');
      }
    });
  });

}).call(this);

//# sourceMappingURL=background.js.map