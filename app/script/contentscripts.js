(function() {
  var r;

  r = chrome.runtime;

  r.onMessage.addListener(function(req) {
    var body;
    body = document.body;
    switch (req.emit) {
      case 'ikasumi:has':
        return r.sendMessage({
          has: /chrome-extension-ikasumi/.test(body.className)
        }, function() {});
      case 'ikasumi:apply':
        return body.className += ' chrome-extension-ikasumi';
      case 'ikasumi:unapply':
        return body.className = body.className.replace(/\schrome-extension-ikasumi/, '');
    }
  });

}).call(this);

//# sourceMappingURL=contentscripts.js.map