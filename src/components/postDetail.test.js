import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import PostDetail from './PostDetail'
import CircularProgress from '@material-ui/core/CircularProgress'

describe('Given I\'m on a Post Detail', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <PostDetail />
      </MemoryRouter>
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('When the data are loading', () => {
    beforeAll(() => {
      Enzyme.configure({ adapter: new Adapter(), delayResponse: 2000 })
      const mock = new MockAdapter(axios)
      mock.onGet('http://jsonplaceholder.typicode.com/posts/1').reply(200)
    })

    test('Then I see an indicator shows data are loading', () => {
      const indicator = wrapper.find(CircularProgress)
      expect(indicator).toHaveLength(1)
    })
  })
})
