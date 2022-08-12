import { strictEqual } from 'assert'
import { createWorld } from '../../src/World.js'
import { addComponent, defineComponent } from '../../src/Component.js'
import { addEntity } from '../../src/Entity.js'
import { defineSystem } from '../../src/System.js'
import { defineQuery, Types } from '../../src/index.js'
import { createUniverse, resetUniverse } from '../../src/Universe.js'

const globalUniverse = createUniverse()

describe('System Integration Tests', () => {
  afterEach(() => {
    resetUniverse(globalUniverse)
  })
  it('should run against a world and update state', () => {
    const world = createWorld(globalUniverse)
    const TestComponent = defineComponent(globalUniverse, { value: Types.f32 })

    const query = defineQuery([TestComponent])
    const eid = addEntity(world)
    addComponent(world, TestComponent, eid)

    const system = defineSystem(world => 
      query(world).forEach(eid => {
        TestComponent.value[eid]++
      })
    )

    system(world)

    strictEqual(TestComponent.value[eid], 1)
  })
})
