
self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
      case 'ping':
        self.postMessage('pong', void 0);
        break;
    };
  }, false);