var worker = new Worker('worker.js');

setInterval(() => {
    worker.postMessage({'cmd': 'ping'});
}, 1000);



worker.addEventListener('message', (e) => {
    console.log("worker says!:", e);
});
