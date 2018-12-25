import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

class PostDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isDataLoading: true,
      postId: 1,
      userId: 1,
      post: null
    }

    this.source = axios.CancelToken.source()
    this.postLoadPromise = Promise.resolve()
  }

  componentDidMount () {
    this.postLoadPromise = this.loadPost()
  }

  loadPost () {
    return axios.get(`http://jsonplaceholder.typicode.com/posts/${this.state.postId}`, { cancelToken: this.source.token })
      .then((response) => {
        return this.setState({
          isDataLoading: false,
          post: response.data
        })
      })
      .catch((error) => {
        if (axios.isCancel(error)) { return }
        throw error
      })
  }

  render () {
    const post = () => {
      if (this.state.isDataLoading) {
        return (
          <Grid item>
            <CircularProgress />
          </Grid>
        )
      } else {
        return (
          <p>Post data is loaded</p>
        )
      }
    }

    return (
      <Grid container spacing={24} direction='column' alignItems='center' justify='center'>
        {post()}
      </Grid>
    )
  }
}

export default PostDetail
