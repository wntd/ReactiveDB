import { uuid } from './uuid'
import { randomNumber, randomString } from './random'
import { EngineerSchema, ProgramSchema, ModuleSchema } from '../index'

export default function() {

  const engineerCount = 10
  const moduleCount = 5
  const programId = uuid()

  const engineers: EngineerSchema[] = Array.from({ length: randomNumber(0, engineerCount) }, () => {
    return {
      _id: uuid(),
      name: randomString()
    }
  })

  const redundantSeed = randomNumber(3, 7)
  const modules: ModuleSchema[] = Array.from({ length: randomNumber(0, moduleCount + redundantSeed) }, (_, index) => {
    return {
      _id: uuid(),
      name: randomString(),
      ownerId: engineers[randomNumber(0, engineers.length) - 1]._id,
      parentId: index < moduleCount ? programId : uuid()
    }
  })

  const program: ProgramSchema = {
    _id: programId,
    ownerId: engineers[randomNumber(0, engineers.length) - 1]._id
  }

  return { program, modules, engineers }
}
