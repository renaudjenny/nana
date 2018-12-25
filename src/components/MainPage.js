import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import List from '@material-ui/core/List'
import PostItem from './PostItem'
import { withRouter } from 'react-router-dom'

class MainPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isDataLoading: true,
      posts: []
    }

    this.source = axios.CancelToken.source()
    this.postsLoadPromise = Promise.resolve()
  }

  componentDidMount () {
    this.postsLoadPromise = this.loadPosts()
  }

  componentWillUnmount () {
    this.source.cancel()
  }

  loadPosts () {
    return axios.get('http://jsonplaceholder.typicode.com/posts', { cancelToken: this.source.token })
      .then((response) => {
        return this.setState({
          isDataLoading: false,
          posts: response.data
        })
      })
      .catch((error) => {
        if (axios.isCancel(error)) { return }
        throw error
      })
  }

  render () {
    const posts = () => {
      if (this.state.isDataLoading) {
        return (
          <Grid item>
            <CircularProgress />
          </Grid>
        )
      } else {
        return (
          <List style={{ width: '100%', maxWidth: 360 }}>
            {this.state.posts.map(post =>
              <PostItem
                key={`post_${post.id}`}
                post={post}
                history={this.props.history}
              />
            )}
          </List>
        )
      }
    }

    return (
      <Grid container spacing={24} direction='column' alignItems='center' justify='center'>
        <Grid item>
          <Typography variant='title' component='h1'>Posts list</Typography>
        </Grid>
        {posts()}
      </Grid>
    )
  }
}

export default withRouter(MainPage)
