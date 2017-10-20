// CORS must be enabled it order for it work on browser (the one below works)
// ANY url will work on server
import("https://unpkg.com/bespoke@1.1.0/lib/bespoke.js").then(module => {
    console.log(module);
});
