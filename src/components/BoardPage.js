import React from 'react'

import Board from './Board'

import './BoardPage.css'

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columnData: {
        backlog: {
          buttonColor: '#00d1bd',
          columnTitle: 'Backlog',
          tasks: [
            {
              id: 1,
              title: 'Do Work',
              description: 'Do it good'
            }
          ]
        },
        'in-progress': {
          buttonColor: '#49a7f6',
          columnTitle: 'In Progress',
          tasks: [],

        },
        completed: {
          buttonColor: '#7f50ff',
          columnTitle: 'Completed',
          tasks: []
        }
      },
      nextTaskId: 2
    }
  }

  updateColumns(currColumn, targetColumn, task, data) {
    console.log('task: ', task)
    const { columnData, nextTaskId } = this.state
    const updatedTargetTasks = [...columnData[targetColumn].tasks, task.id ? task : {...task, id: nextTaskId}]
    if (!task.id) { this.setState({ nextTaskId: nextTaskId + 1 }) }

    if (currColumn) {
      // update tasks
      const oldTasksCleaned = [...columnData[currColumn].tasks.filter(x => x.id !== task.id)]

      this.setState({
        columnData: {
          ...this.state.columnData,
          [currColumn]: {
            ...this.state.columnData[currColumn],
            tasks: oldTasksCleaned
          },
          [targetColumn]: {
            ...this.state.columnData[targetColumn],
            tasks: updatedTargetTasks
          }
        },
      })
    } else {
      // create tasks
      console.log('updateObject: ', {
        ...this.state.columnData,
        [targetColumn]: {
          ...this.state.columnData[targetColumn],
          tasks: updatedTargetTasks
        }
      })

      this.setState({
        columnData: {
          ...this.state.columnData,
          [targetColumn]: {
            ...this.state.columnData[targetColumn],
            tasks: updatedTargetTasks
          }
        }
      })
    }
  }

  render() {
    const { columnData } = this.state

    console.log('this.state: ', this.state)

    return (
      <div className="board-page">
        <Board
          columns={columnData}
          updateColumns={this.updateColumns.bind(this)}
        />
      </div>
    )
  }
}