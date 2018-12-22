import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MainPage from './MainPage'
import Typography from '@material-ui/core/Typography'

describe('Given I\'m on Nana main page', () => {
  let wrapper

  const typoPosition = {
    title: 0
  }

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('When the data is loading', () => {
    beforeAll(() => {
      Enzyme.configure({ adapter: new Adapter(), delayResponse: 2000 })
      const mock = new MockAdapter(axios)
      mock.onGet('http://jsonplaceholder.typicode.com/posts').reply(200, [])
    })

    test('Then I see the title Posts list', () => {
      const title = wrapper.find(Typography).at(typoPosition.title)
      expect(title.text()).toEqual('Posts list')
    })
  })
})
