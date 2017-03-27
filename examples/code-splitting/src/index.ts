import { lazyLoad } from "fuse-tools";

// lazy load a fusebox bundle (split)
lazyLoad("about").then(module => {
    const about = new module.AboutComponent();
    console.log(about);
});

lazyLoad("home").then(module => {
    const home = new module.HomeComponent();
    console.log(home);
});
