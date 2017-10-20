// CORS must be enabled it order for it work on browser (the one below works)
// ANY url will work on server
import("https://unpkg.com/moment@2.19.1/moment.js").then(moment => {
    console.log(moment().format('LLLL'));
});
