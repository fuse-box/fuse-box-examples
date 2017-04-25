import { should } from "fuse-test-runner";
import { Foo } from "../Foo";


export class FooTest {
    "Should be okay"() {
        should(Foo).beOkay().beObject()
    }

    "Should construct Bar Object"() {
        should(new Foo())
            .beObject()
            .mutate((bar: Foo) => bar.name)
            .equal("I am FOO")
    }
}