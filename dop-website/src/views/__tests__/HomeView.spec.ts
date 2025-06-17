import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "../HomeView.vue"; // Adjust path as necessary

describe("HomeView.vue", () => {
  it("renders welcome message", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain("Welcome to Dop Ecological Company");
    expect(wrapper.text()).toContain("Your partner in sustainability.");
  });
});
