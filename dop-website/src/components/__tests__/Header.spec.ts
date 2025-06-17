import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue"; // Adjust path as necessary
import { createRouter, createWebHistory } from "vue-router";

// Mock router for testing components with <router-link>
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home</div>" } },
    { path: "/about", component: { template: "<div>About</div>" } },
    { path: "/services", component: { template: "<div>Services</div>" } },
    { path: "/blog", component: { template: "<div>Blog</div>" } },
    { path: "/contact", component: { template: "<div>Contact</div>" } },
  ],
});

describe("Header.vue", () => {
  it("renders navigation links", () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router], // Provide the mock router
      },
    });
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("About Us");
    expect(wrapper.text()).toContain("Services");
    expect(wrapper.text()).toContain("Blog");
    expect(wrapper.text()).toContain("Contact");
  });
});
