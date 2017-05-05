import React from 'react'

export const RiverRow = (props) => ({
  render: function() {
    return (
      <tr>
        <td>{this.props.RiverName}</td>
        <td>{this.props.RunName}</td>
        <td>{this.props.ClassType}</td>
        <td>{this.props.FlowLevel}</td>
        <td>{this.props.LastUpdate}</td>
      </tr>
    )
  }
})
