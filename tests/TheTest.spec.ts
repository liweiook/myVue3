import { mount } from '@vue/test-utils'
// 这里不能写 @/views/TheTest.vue，不然单元测试找不到该文件不通过
import Test from '../src/views/TheTest.vue'

test('TheTest.vue', async () => {
  const wrapper = mount(Test)
  expect(wrapper.html()).toContain('Unit Test Page')
  expect(wrapper.html()).toContain('count is: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('count is: 1')
})
