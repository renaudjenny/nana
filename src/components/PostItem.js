import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class PostItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { post: props.post }
  }

  render () {
    return (
      <ListItem>
        <ListItemText primary={this.state.post.title} />
      </ListItem>
    )
  }
}

export default PostItem
