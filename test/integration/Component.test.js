import assert from 'assert'
import { Types } from '../../src/index.js'
import { createWorld } from '../../src/World.js'
import { $componentMap, addComponent, defineComponent, hasComponent, registerComponent, removeComponent } from '../../src/Component.js'
import { addEntity } from '../../src/Entity.js'
import { createUniverse, resetUniverse } from '../../src/Universe.js'

const globalUniverse = createUniverse()

describe('Component Integration Tests', () => {
  afterEach(() => {
    resetUniverse(globalUniverse)
  })
  it('should register components on-demand', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse, { value: Types.f32 })

    registerComponent(world, TestComponent)
    assert(world[$componentMap].has(TestComponent))
  })
  it('should register components automatically upon adding to an entity', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse, { value: Types.f32 })

    const eid = addEntity(world)

    addComponent(world, TestComponent, eid)
    assert(world[$componentMap].has(TestComponent))
  })
  it('should add and remove components from an entity', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse, { value: Types.f32 })

    const eid = addEntity(world)

    addComponent(world, TestComponent, eid)
    assert(hasComponent(world, TestComponent, eid))

    removeComponent(world, TestComponent, eid)
    assert(hasComponent(world, TestComponent, eid) === false)
  })
  it('should only remove the component specified', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse, { value: Types.f32 })
    const TestComponent2 = defineComponent(globalUniverse, { value: Types.f32 })

    const eid = addEntity(world)

    addComponent(world, TestComponent, eid)
    addComponent(world, TestComponent2, eid)
    assert(hasComponent(world, TestComponent, eid))
    assert(hasComponent(world, TestComponent2, eid))

    removeComponent(world, TestComponent, eid)
    assert(hasComponent(world, TestComponent, eid) === false)
    assert(hasComponent(world, TestComponent2, eid) === true)
  })
  it('should create tag components', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse)

    const eid = addEntity(world)

    addComponent(world, TestComponent, eid)
    assert(hasComponent(world, TestComponent, eid))

    removeComponent(world, TestComponent, eid)
    assert(hasComponent(world, TestComponent, eid) === false)
  })
  it('should correctly register more than 32 components', () => {
    const world = createWorld(globalUniverse)
        
    const eid = addEntity(world)
    
    Array(1024).fill(null)
      .map(_ => defineComponent(globalUniverse))
      .forEach((c) => {
        addComponent(world, c, eid)
        assert(hasComponent(world, c, eid))
      })
  })
})
