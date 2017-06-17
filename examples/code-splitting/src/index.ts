async function automaticallyLoadSplitBundle() {
    // this file is automatically associated with the bundle "about"
    // you could do import("about") and get the same result, but typings would go wrong
    const aboutModule = await import("./routes/about/AboutComponent");
    console.log(new aboutModule.AboutComponent());

    const homeComponent = await import("./routes/home/HomeComponent");
    console.log(new homeComponent.HomeComponent());
}

automaticallyLoadSplitBundle();



