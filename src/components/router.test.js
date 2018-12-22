import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter, Route } from 'react-router-dom'
import ReactRouter from './ReactRouter'
import MainPage from './MainPage'

describe("When I'm connected to Nana app", () => {
  Enzyme.configure({ adapter: new Adapter() })
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ReactRouter />
      </MemoryRouter>
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('Then application router startup', () => {
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})

    expect(pathMap['/']).toBe(MainPage)
  })
})