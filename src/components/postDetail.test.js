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
  let postDetail

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <PostDetail />
      </MemoryRouter>
    )
    postDetail = wrapper.find(PostDetail).instance()
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

  describe('When the data are loaded', () => {
    beforeAll(() => {
      Enzyme.configure({ adapter: new Adapter() })
      const mock = new MockAdapter(axios)
      const data = {
        id: 1,
        name: 'Mario Bros',
        username: 'Super Mario',
        email: 'mario@nintendo.com',
        address: {
          street: 'Koopa Street',
          suite: 'Apt. 123',
          city: 'Mushroom Kinkdom',
          zipcode: '12345-6789'
        },
        phone: '1-770-736-8031 x56442',
        website: 'nintendo.com',
        company: {
          name: 'Nintendo corp.',
          catchPhrase: 'Ohhhh. Mamma Mia!',
          bs: 'plumber brothers'
        }
      }
      mock.onGet('http://jsonplaceholder.typicode.com/posts/1').reply(200)
    })

    test('Then the loading indicator is hidden', () => {
      expect.assertions(1)
      return postDetail.postLoadPromise.then(() => {
        wrapper.update()
        const indicator = wrapper.find(CircularProgress)
        expect(indicator).toHaveLength(0)
      })
    })
  })
})
