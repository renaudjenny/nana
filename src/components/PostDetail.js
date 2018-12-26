import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

class PostDetail extends React.Component {
  constructor (props) {
    super(props)

    const postId = props.match.params.postId
    this.state = {
      isDataLoading: true,
      postId: postId,
      userId: null,
      post: null
    }

    this.source = axios.CancelToken.source()
    this.postLoadPromise = Promise.resolve()
    this.offlineStorageKey = `postDetail${postId}`
    if (!this.offlinePost) {
      this.offlinePost = { post: null, user: null }
    }
  }

  get offlinePost () {
    return JSON.parse(window.localStorage.getItem(this.offlineStorageKey))
  }

  set offlinePost (data) {
    window.localStorage.setItem(this.offlineStorageKey, JSON.stringify(data))
  }

  componentDidMount () {
    this.postLoadPromise = this.loadPost()
      .then(() => this.loadUser())
      .then(() => this.offlinePost = { post: this.state.post, user: this.state.user })
      .then(() => {
        this.setState({ isDataLoading: false })
      })
  }

  componentWillUnmount () {
    this.source.cancel()
  }

  loadPost () {
    const url = `http://jsonplaceholder.typicode.com/posts/${this.state.postId}`
    return axios.get(url, { cancelToken: this.source.token })
      .then((response) => {
        return this.setState({ post: response.data })
      })
      .catch((error) => {
        if (axios.isCancel(error)) { return }
        if (this.offlinePost && this.offlinePost.post) {
          return this.setState({ post: this.offlinePost.post })
        }
        throw error
      })
  }

  loadUser () {
    const url = `http://jsonplaceholder.typicode.com/users/${this.state.post.userId}`
    return axios.get(url, { cancelToken: this.source.token })
      .then((response) => {
        return this.setState({ user: response.data })
      })
      .catch((error) => {
        if (axios.isCancel(error)) { return }
        if (this.offlinePost && this.offlinePost.user) {
          return this.setState({ user: this.offlinePost.user })
        }
        throw error
      })
  }

  render () {
    const post = () => {
      if (this.state.isDataLoading) {
        return <Grid item><CircularProgress /></Grid>
      } else {
        return (
          <Grid item style={{ maxWidth: 360 }}>
            <Typography variant='title' component='h1'>{this.state.post.title}</Typography>
            <br />
            <Typography>{this.state.post.body}</Typography>
            <br />
            <Typography variant='title' component='h2'>{this.state.user.username}</Typography>
          </Grid>
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
