import { mount, createLocalVue } from "@vue/test-utils";
import Calculator from "@/App";

let wrapper;
const localVue = createLocalVue();

// region Data
const DATA = {
  "+-*/": [
    ["2+2", 4],
    ["4-2", 2],
    ["123.45*67.89", 8381.0205],
    ["99999/0.123", 813000]
  ]
};
// endregion

beforeEach(() => {
  wrapper = mount(Calculator, {
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

it("Calculator rendered", () => {
  expect(wrapper.find("form").exists()).toBe(true);
});

describe("Calculator can add, subtract, multiply, divide numbers", () => {
  it.each(DATA["+-*/"])("%s = %i", async (expression, expected) => {
    await wrapper.setData({ expression });
    expect(wrapper.vm.result).toBe(expected);
  });
});

describe("Calculate edge cases", () => {
  it("Infinity", async () => {
    await wrapper.setData({ expression: "1e500" });
    expect(wrapper.vm.result).toBe(Infinity);
  });
  it("Round problem", async () => {
    await wrapper.setData({ expression: ".1+.2" });
    expect(wrapper.vm.result).toBe(0.3);
  });
});
