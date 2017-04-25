import { should } from "fuse-test-runner";
import { Bar } from "../Bar";

export class BarTest {
    "Should be okay"() {
        should(Bar).beOkay().beObject()
    }

    "Should construct Bar Object"() {
        should(new Bar())
            .beObject()
            .mutate((bar: Bar) => bar.name)
            .equal("I am bar")
    }
}