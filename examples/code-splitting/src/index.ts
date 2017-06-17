import("./routes/about/AboutComponent").then(module => {
    const about = new module.AboutComponent();
    console.log(about);
});

import("./routes/home/HomeComponent").then(module => {
    const home = new module.HomeComponent();
    console.log(home);
});


