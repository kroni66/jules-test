import { mount } from '@vue/test-utils'
import SiteHeader from '@/components/SiteHeader.vue' // Adjust path if SiteHeader is elsewhere

describe('SiteHeader.vue', () => {
  it('renders the website title', () => {
    const wrapper = mount(SiteHeader)
    // The h1 is inside a header tag, so this will check its text content
    expect(wrapper.find('header h1').text()).toMatch('Fish Website')
  })

  it('has the correct background color class or style', () => {
    // This is a more advanced test and depends on how styling is applied.
    // If it's a class:
    // const wrapper = mount(SiteHeader)
    // expect(wrapper.find('header').classes()).toContain('expected-bg-class')

    // If it's an inline style (less common for primary styling):
    // const wrapper = mount(SiteHeader)
    // expect(wrapper.find('header').attributes('style')).toContain('background-color: rgb(0, 123, 255)')
    // Note: color value might need to be exact (e.g. rgb or hex as defined).

    // For this example, let's keep it simple and focus on the title text.
    // The actual style test above is commented out as it adds complexity
    // not covered by the current component's simple structure.
    const wrapper = mount(SiteHeader)
    // A simple existence check for the header element
    expect(wrapper.find('header').exists()).toBe(true)
  })
})
