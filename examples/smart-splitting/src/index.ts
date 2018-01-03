
async function test() {
    
    
    const about = await import("./components/AboutComponent");
    new about.AboutComponent();


    const home = await import("./components/HomeComponent");
    new home.HomeComponent();

}



test();
