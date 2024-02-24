import React, { useEffect, useState } from 'react'
import { Bezier3 } from '.././lib/bezier'
import './World.css'

const TREE_HEIGHT = 300
const FLOWER_HEIGHT_STD = 35
const FLOWER_COUNT = 9
const WORLD_CLASS = 'world'
const TREE_CLASS = 'tree'
const BIRD_CLASS = 'bird'
const FLOWER_CLASS = 'flower'
const FLOWER_FALLING_CLASS = 'flower-falling'
const TREE_BOX_CLASS = 'tree-box'

let flowerIdCounter = 0

interface Flower {
  id: number
  src: number
  left: number
  bottom: number
  height: number
  falling: boolean
}

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function World() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [flowers, setFlowers] = useState<Flower[]>([])

  const treeStyle = {
    height: `${TREE_HEIGHT}px`,
  }
  const birdStyle = {
    left: `${50 + pos.x}%`,
    bottom: `calc(${TREE_HEIGHT * 0.6}px + ${pos.y}%)`,
  }
  const treeBoxStyle: React.CSSProperties = {
    position: 'relative',
    left: '50%',
    bottom: `${TREE_HEIGHT * 0.35}px`,
    transform: 'translateX(-50%)',
  }
  const treeBox1Style = {
    ...treeBoxStyle,
    width: `${TREE_HEIGHT * 0.5}px`,
    height: `${TREE_HEIGHT * 0.17}px`,
  }
  const treeBox2Style = {
    ...treeBoxStyle,
    width: `${TREE_HEIGHT * 0.65}px`,
    height: `${TREE_HEIGHT * 0.15}px`,
  }
  const treeBox3Style = {
    ...treeBoxStyle,
    width: `${TREE_HEIGHT * 0.8}px`,
    height: `${TREE_HEIGHT * 0.25}px`,
  }

  const render = (bezier: Bezier3, repeat = true) => {
    const p = bezier.next()
    setPos(p)
    if (!bezier.hasNext()) {
      if (repeat) {
        const newBezier = Bezier3.getFixedEnds(
          p,
          { x: 0, y: 0 },
          -50,
          50,
          0,
          100,
        )
        requestAnimationFrame(() => render(newBezier, false))
      }
    } else {
      requestAnimationFrame(() => render(bezier, repeat))
    }
  }

  const blossom = (left: number, bottom: number) => {
    if (flowers.length > 3) return
    const id = flowerIdCounter++
    setFlowers((prev) => [
      ...prev,
      {
        id,
        src: getRandomInt(1, FLOWER_COUNT + 1),
        height: getRandom(FLOWER_HEIGHT_STD * 0.9, FLOWER_HEIGHT_STD * 1.1),
        left,
        bottom,
        falling: false,
      },
    ])
    setTimeout(() => {
      setFlowers((prev) =>
        prev.map((p) => {
          if (p.id === id) return { ...p, falling: true }
          else return p
        }),
      )
      setTimeout(() => {
        setFlowers((prev) => prev.filter((p) => p.id !== id))
      }, 900)
    }, 3000)
  }

  const randomInTreeBox = () => {
    const world = document.querySelector(`.${WORLD_CLASS}`)!
    const box = document.querySelectorAll(`.${TREE_BOX_CLASS}`)[
      getRandomInt(0, 3)
    ]
    const rect = box.getBoundingClientRect()
    const left = getRandom(-rect.width / 2, rect.width / 2)
    const bottom =
      world.getBoundingClientRect().height +
      getRandom(0, rect.height) -
      rect.bottom
    return { left, bottom }
  }

  const worldClickHandler = (e: React.MouseEvent) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    if (
      elements.filter((e) => e.classList.contains(BIRD_CLASS)).length > 0 ||
      elements.filter((e) => e.classList.contains(TREE_CLASS)).length === 0
    ) {
      const bezier = Bezier3.getFixedEnds(pos, undefined, -50, 50, 0, 100)
      requestAnimationFrame(() => render(bezier))
    } else if (
      elements.filter((e) => e.classList.contains(TREE_BOX_CLASS)).length > 0
    ) {
      const world = document.querySelector(`.${WORLD_CLASS}`)!
      const left = e.clientX - world.getBoundingClientRect().width / 2
      const bottom = world.getBoundingClientRect().height - e.clientY
      blossom(left, bottom)
    } else if (
      elements.filter((e) => e.classList.contains(TREE_CLASS)).length > 0
    ) {
      const { left, bottom } = randomInTreeBox()
      blossom(left, bottom)
    }
  }

  useEffect(() => {
    for (let i = 1; i <= FLOWER_COUNT; i++) {
      const img = new Image()
      img.src = `${process.env.PUBLIC_URL}/img/flower${i}.png`
    }
  })

  return (
    <div
      className={WORLD_CLASS}
      onClick={worldClickHandler}>
      <img
        className={TREE_CLASS}
        src={`${process.env.PUBLIC_URL}/img/tree.png`}
        alt='tree'
        style={treeStyle}
      />
      <img
        className={BIRD_CLASS}
        src={`${process.env.PUBLIC_URL}/img/bird.png`}
        alt='bird'
        style={birdStyle}
      />
      <div className='flower-container'>
        {flowers.map((f) => (
          <img
            className={`${FLOWER_CLASS} ${f.falling ? FLOWER_FALLING_CLASS : ''}`}
            src={`${process.env.PUBLIC_URL}/img/flower${f.src}.png`}
            alt={`flower ${f.src}`}
            style={{
              height: `${f.height}px`,
              left: `calc(${f.left}px + 50%)`,
              bottom: `${f.bottom}px`,
            }}
            key={f.id}
          />
        ))}
      </div>
      <div className='tree-box-container'>
        <div
          className={`${TREE_BOX_CLASS} tree-box-1`}
          style={treeBox1Style}
        />
        <div
          className={`${TREE_BOX_CLASS} tree-box-2`}
          style={treeBox2Style}
        />
        <div
          className={`${TREE_BOX_CLASS} tree-box-3`}
          style={treeBox3Style}
        />
      </div>
    </div>
  )
}

export default World
