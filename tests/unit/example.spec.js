import { mount } from "@vue/test-utils";
import Calculator from "@/App";

describe("Calculator", () => {
  it("rendered", () => {
    const wrapper = mount(Calculator);
    expect(wrapper.find("form").exists()).toBe(true);
  });
});
