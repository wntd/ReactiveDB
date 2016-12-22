import * as moment from 'moment'
import { TaskSchema } from '../index'
import { uuid } from './uuid'
import subtaskGenerator from './subtaskGenerator'
// import postGenerator from './postGenerator'
import { randomNumber } from './random'

export default function (limit: number) {
  const result: TaskSchema[] = []
  while (limit > 0) {
    limit --
    const _id = uuid()
    const _projectId = uuid()
    result.push({
      _id, _projectId,
      _stageId: uuid(),
      _creatorId: uuid(),
      _executorId: uuid(),
      _tasklistId: uuid(),
      _sourceId: null,
      accomplished: null,
      subtasks: subtaskGenerator(randomNumber(1, 20), _id),
      content: 'content: ' + uuid(),
      note: 'note: ' + uuid(),
      project: {
        _id: _projectId,
        name: 'project name: ' + uuid(),
        isArchived: true
      },
      involveMembers: [],
      created: moment().add(6 - randomNumber(0, 12), 'month').add(30 - randomNumber(0, 30), 'day').toISOString()
    })
  }
  return result
}
