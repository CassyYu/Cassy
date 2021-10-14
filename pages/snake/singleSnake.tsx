import styles from '../../styles/Snake.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const initSnake = [
  {
    left: 0,
    top: 30
  },
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

  const [dir, setDir] = useState<String>(DOWN);
  const [snake, setSnake] = useState<any>(initSnake);
  const [food, setFood] = useState<any>({ left: 40, top: 110 });
  const [eated, setEated] = useState<boolean>(false);

  const score = snake.length - initSnake.length;
  const level = Math.floor((snake.length - initSnake.length) / 10) + 1;
  const TIME = Math.max(200 - 20 * level, 30);

  useEffect(() => {
    setTimeout(() => {
      let newSnake: any = [];
      snake.forEach((e: any, idx: number) => {
        let top = e.top, left = e.left;
        if (idx === 0) {
          if (dir === DOWN) {
            if (top !== snake[1].top - Edge) top = snake[0].top + Edge;
            else top = snake[0].top - Edge;
          } else if (dir === UP) {
            if (top !== snake[1].top + 10) top = snake[0].top - Edge;
            else top = snake[0].top + Edge;
          } else if (dir === RIGHT) {
            if (left !== snake[1].left - Edge) left = snake[0].left + Edge;
            else left = snake[0].left - Edge;
          } else if (dir === LEFT) {
            if (left !== snake[1].left + Edge) left = snake[0].left - Edge;
            else left = snake[0].left + Edge;
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
      if (!reachBorder() && !reachSelf(newSnake)) setSnake(newSnake);
    }, TIME);
  }, [snake])

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === DOWN) setDir(DOWN);
      if (e.key === UP) setDir(UP);
      if (e.key === LEFT) setDir(LEFT);
      if (e.key === RIGHT) setDir(RIGHT);
    })
  }, [])

  const changeFood = () => {
    const newLeft = Math.ceil(Math.random() * (MapWidth - Edge) / 10) * 10;
    const newTop = Math.ceil(Math.random() * (MapHeight - Edge) / 10) * 10;
    setEated(true);
    setFood({ left: newLeft, top: newTop });
  }

  const reachBorder = () => {
    if (dir === DOWN && snake[0].top === MapHeight - Edge) return true;
    else if (dir === UP && snake[0].top === 0) return true;
    else if (dir === RIGHT && snake[0].left === MapWidth - Edge) return true;
    else if (dir === LEFT && snake[0].left === 0) return true;
    return false;
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