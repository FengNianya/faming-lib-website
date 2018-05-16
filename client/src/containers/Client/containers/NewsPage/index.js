import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewsPage extends Component {
  static propTypes = {
    match: PropTypes.object, // 这个是路由提供的参数，可以拿到路由带过来的参数
  }
  render (){
    console.log(this.props)
    const { match: { params: { id } } } = this.props;
    return (`${id}新闻展示`);
  }
} 