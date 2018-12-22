import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

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
        return <Typography>Posts will be shown here</Typography>
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

export default MainPage
