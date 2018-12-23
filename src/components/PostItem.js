import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class PostItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { post: props.post }
  }

  handlePostClick (postId) {
    this.props.history.push({ pathname: `/post/${postId}` })
  }

  render () {
    return (
      <ListItem button onClick={() => this.handlePostClick(this.state.post.id)}>
        <ListItemText primary={this.state.post.title} />
      </ListItem>
    )
  }
}

export default PostItem
