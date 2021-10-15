import styles from '../../styles/Snake.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const initSnake = [
  {
    left: 0,
    top: 20
  },
  {
    left: 0,
    top: 10
  },
  {
    left: 0,
    top: 0
  }
];

export default function SingleSnake() {

  const DOWN = "ArrowDown", UP = "ArrowUp", LEFT = "ArrowLeft", RIGHT = "ArrowRight";
  const MapHeight = 400, MapWidth = 600;
  const Edge = 10;

  const [key, setKey] = useState<String>(DOWN);
  const [snake, setSnake] = useState<any>(initSnake);
  const [food, setFood] = useState<any>({ left: 40, top: 110 });
  const [eated, setEated] = useState<boolean>(false);

  const score = snake.length - initSnake.length;
  const level = Math.floor((snake.length - initSnake.length) / 10) + 1;
  const TIME = Math.max(200 - 20 * level, 30);

  useEffect(() => {
    setTimeout(() => {
      let newSnake = [], reachBorder = false;
      snake.forEach((e: any, idx: number) => {
        let top = e.top, left = e.left;
        if (idx === 0) {
          let dir;
          if (top + Edge === snake[1].top) dir = UP;
          else if (top - Edge === snake[1].top) dir = DOWN;
          else if (left + Edge === snake[1].left) dir = LEFT;
          else dir = RIGHT;
          if (key === DOWN) {
            if (top === MapHeight) reachBorder = true;
            if (dir === UP) {
              setKey(UP);
              top = snake[0].top - Edge;
            } else top = snake[0].top + Edge;
          } else if (key === UP) {
            if (top === 0) reachBorder = true;
            if (dir === DOWN) {
              setKey(DOWN);
              top = snake[0].top + Edge;
            } else top = snake[0].top - Edge;
          } else if (key === RIGHT) {
            if (left === MapWidth) reachBorder = true;
            if (dir === LEFT) {
              setKey(LEFT);
              left = snake[0].left - Edge;
            } else left = snake[0].left + Edge;
          } else if (key === LEFT) {
            if (left === 0) reachBorder = true;
            if (dir === RIGHT) {
              setKey(RIGHT);
              left = snake[0].left + Edge;
            } else left = snake[0].left - Edge;
          }
          newSnake.push({ left: left, top: top });
        } else {
          top = snake[idx - 1].top;
          left = snake[idx - 1].left;
          newSnake.push({ left: left, top: top });
        };
      })
      if (eated) {
        newSnake.push({ left: snake[snake.length - 1].left, top: snake[snake.length - 1].top });
        setEated(false);
      }
      if (!reachBorder && !reachSelf(newSnake)) setSnake(newSnake);
    }, TIME);
  }, [snake])

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      setKey(e.key);
    })
  }, [])

  const changeFood = () => {
    const newLeft = Math.ceil(Math.random() * (MapWidth - Edge) / 10) * 10;
    const newTop = Math.ceil(Math.random() * (MapHeight - Edge) / 10) * 10;
    setEated(true);
    setFood({ left: newLeft, top: newTop });
  }

  const reachSelf = (snake: any) => {
    let ret = false;
    snake.forEach((s: any, i: number) => {
      snake.forEach((s1: any, j: number) => {
        if (j !== i && s1.top === s.top && s1.left === s.left) ret = true;
      })
    })
    return ret;
  }

  const renderSnake = () => {
    return snake.map((e: any, idx: number) => {
      return <div key={idx} className={styles.snake} style={{ left: e.left + 'px', top: e.top + 'px' }}></div>
    })
  }

  const renderFood = () => {
    if (snake[0].left === food.left && snake[0].top === food.top) changeFood();
    return (
      <div className={styles.food} style={{ left: food.left + 'px', top: food.top + 'px' }}></div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Snake Demo</div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <div className={styles.snakeContainer}>
              {renderSnake()}
            </div>
            {renderFood()}
          </div>
          <div className={styles.infoContainer}>
            <span>Score: {score}</span>
            <span>Level: {level}</span>
          </div>
        </div>
        <Link href="/"><a>Back To Homepage</a></Link>
      </div>
    </>
  )
}