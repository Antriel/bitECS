import { createUniverse, deleteWorld, resetUniverse } from './Universe.js'
import { createWorld, resetWorld, getWorldComponents, getAllEntities } from './World.js'
import { addEntity, removeEntity, getEntityComponents, entityExists } from './Entity.js'
import { defineComponent, registerComponent, registerComponents, hasComponent, addComponent, removeComponent } from './Component.js'
import { defineSystem } from './System.js'
import { defineQuery, registerQuery, enterQuery, exitQuery, Changed, Not, commitRemovals, resetChangedQuery, removeQuery, checkEntity } from './Query.js'
import { defineSerializer, defineDeserializer, DESERIALIZE_MODE } from './Serialize.js'
import { parentArray } from './Storage.js'
import { TYPES_ENUM } from './Constants.js'

export const pipe = (...fns) => (input) => {
  let tmp = input
  for (let i = 0; i < fns.length; i++) {
    const fn = fns[i]
    tmp = fn(tmp)
  }
  return tmp
}

export const Types = TYPES_ENUM

export {

  createUniverse,
  deleteWorld,
  resetUniverse,

  createWorld,
  resetWorld,
  addEntity,
  removeEntity,
  entityExists,
  getWorldComponents,
  getAllEntities,
  
  registerComponent,
  registerComponents,
  defineComponent,
  addComponent,
  removeComponent,
  hasComponent,
  getEntityComponents,

  defineQuery,
  registerQuery,
  Changed,
  Not,
  enterQuery,
  exitQuery,
  commitRemovals,
  resetChangedQuery,
  removeQuery,
  checkEntity,

  defineSystem,
  
  defineSerializer,
  defineDeserializer,
  DESERIALIZE_MODE,

  parentArray,

}
