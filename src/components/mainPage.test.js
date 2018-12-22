import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MainPage from './MainPage'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

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

  describe('When the data are loading', () => {
    beforeAll(() => {
      Enzyme.configure({ adapter: new Adapter(), delayResponse: 2000 })
      const mock = new MockAdapter(axios)
      mock.onGet('http://jsonplaceholder.typicode.com/posts').reply(200, [])
    })

    test('Then I see the title Posts list', () => {
      const title = wrapper.find(Typography).at(typoPosition.title)
      expect(title.text()).toEqual('Posts list')
    })

    test('Then I see an indicator shows data are loading', () => {
      const indicator = wrapper.find(CircularProgress)
      expect(indicator).toHaveLength(1)
    })
  })

  describe('When the data is loaded', () => {
    beforeAll(() => {
      Enzyme.configure({ adapter: new Adapter() })
      const mock = new MockAdapter(axios)
      let data = [
        {
          'userId': 1,
          'id': 1,
          'title': 'First Fake Post',
          'body': 'First Post body'
        },
        {
          'userId': 1,
          'id': 2,
          'title': 'Second Fake Post',
          'body': 'Second Post body'
        }
      ]
      mock.onGet('http://jsonplaceholder.typicode.com/posts').reply(200, data)
    })

    test('Then the loading indicator is hidden', () => {
      expect.assertions(1)
      return wrapper.find(MainPage).instance().postsLoadPromise.then(() => {
        wrapper.update()
        const indicator = wrapper.find(CircularProgress)
        expect(indicator).toHaveLength(0)
      })
    })
  })
})
