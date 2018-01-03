// that's a typescript package
import { checkPassword } from "fuse-ts-raw-package"
async function testMe(){
    // that package contains "import" statement which
    // is nicely handled (split) by FuseBox
    const result = await checkPassword("123456");
    console.log(result);
}
testMe();