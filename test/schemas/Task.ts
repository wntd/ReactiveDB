import * as lf from 'lovefield'
import { RDBType, Association } from '../index'
import { TeambitionTypes, Database, SubtaskSchema } from '../index'

export interface TaskSchema {
  _id: TeambitionTypes.TaskId
  _creatorId: string
  _executorId: string
  content: string
  note: string
  _sourceId?: string
  _projectId: TeambitionTypes.ProjectId
  _stageId: TeambitionTypes.StageId
  _tasklistId: TeambitionTypes.TasklistId
  accomplished: string
  project?: {
    _id: TeambitionTypes.ProjectId
    name: string,
    isArchived: boolean,
    posts?: any[]
  }
  subtasks: SubtaskSchema[]
  subtasksCount: number
  created: string,
  involveMembers: string[]
}

export default (db: Database) => {
  db.defineSchema('Task', {
    _creatorId: {
      type: RDBType.STRING
    },
    _executorId: {
      type: RDBType.STRING
    },
    _projectId: {
      type: RDBType.STRING
    },
    _id: {
      type: RDBType.STRING,
      primaryKey: true
    },
    _sourceId: {
      type: RDBType.STRING
    },
    _stageId: {
      type: RDBType.STRING,
      index: true
    },
    _tasklistId: {
      type: RDBType.STRING
    },
    accomplished: {
      type: RDBType.STRING
    },
    content: {
      type: RDBType.STRING,
      unique: true
    },
    note: {
      type: RDBType.STRING
    },
    project: {
      type: Association.oneToOne,
      virtual: {
        name: 'Project',
        where: (
          projectTable: lf.schema.Table & TaskSchema
        ) => {
          return {
            _projectId: projectTable._id
          }
        }
      }
    },
    subtasks: {
      type: Association.oneToMany,
      virtual: {
        name: 'Subtask',
        where: (
          subtaskTable: lf.schema.Table & SubtaskSchema
        ) => {
          return {
            _id: subtaskTable._taskId
          }
        }
      }
    },
    subtasksCount: {
      type: RDBType.NUMBER
    },
    involveMembers: {
      type: RDBType.LITERAL_ARRAY
    },
    created: {
      type: RDBType.DATE_TIME
    }
  })

  return db.defineHook('Task', {
    destroy(database, entity) {
      const subtaskTable = database.getSchema().table('Subtask')
      return database.delete()
        .from(subtaskTable)
        .where(subtaskTable['_taskId'].eq(entity._id))
    }
  })
}
