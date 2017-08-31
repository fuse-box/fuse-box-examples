import * as React from "react";
import { shallow } from "enzyme";

import { HelloWorld } from "../HelloWorld";

it("Increment change after click", () => {
    // Render a checkbox with label in the document
    const target = shallow(
        <HelloWorld/>
    );
    const button  = target.find("button");
    const counter = target.find("span.badge");

    expect(button).toBeDefined();
    expect(button.children().first().text()).toEqual("Message increment");
    expect(counter.text()).toEqual("0");
    button.simulate("click");
    expect(target.find("span.badge").text()).toEqual("1");
});
