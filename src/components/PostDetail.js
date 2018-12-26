import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

class PostDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isDataLoading: true,
      postId: props.match.params.postId,
      userId: null,
      post: null
    }

    this.source = axios.CancelToken.source()
    this.postLoadPromise = Promise.resolve()
  }

  componentDidMount () {
    this.postLoadPromise = this.loadPost()
  }

  componentWillUnmount () {
    this.source.cancel()
  }

  loadPost () {
    const url = `http://jsonplaceholder.typicode.com/posts/${this.state.postId}`
    return axios.get(url, { cancelToken: this.source.token })
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
        return <CircularProgress />
      } else {
        return <Typography variant='title' component='h1'>{this.state.post.title}</Typography>
      }
    }

    return (
      <Grid container spacing={24} direction='column' alignItems='center' justify='center'>
        <Grid item>
          {post()}
        </Grid>
      </Grid>
    )
  }
}

export default PostDetail
