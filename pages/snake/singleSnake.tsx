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

  const [dir, setDir] = useState<String>("down");
  const [snake, setSnake] = useState<any>(initSnake);
  const [food, setFood] = useState<any>({ left: 40, top: 110 });
  const [add, setAdd] = useState<boolean>(false);

  const score = snake.length - initSnake.length;
  const level = Math.floor((snake.length - initSnake.length) / 10) + 1;
  const TIME = Math.max(200 - 20 * level, 10);

  useEffect(() => {
    setTimeout(() => {
      let newSnake: any = [];
      let overBorder = false;
      snake.forEach((e: any, idx: number) => {
        let top = e.top, left = e.left;
        if (idx === 0) {
          // 墙壁和自身碰撞检测
          if (dir === "down" && snake[0].top === 390) overBorder = true;
          else if (dir === "up" && snake[0].top === 0) overBorder = true;
          else if (dir === "right" && snake[0].left === 590) overBorder = true;
          else if (dir === "left" && snake[0].left === 0) overBorder = true;
          if (dir === "down") {
            if (top !== snake[1].top - 10) top = snake[0].top + 10;
            else top = snake[0].top - 10;
          } else if (dir === "up") {
            if (top !== snake[1].top + 10) top = snake[0].top - 10;
            else top = snake[0].top + 10;
          } else if (dir === "right") {
            if (left !== snake[1].left - 10) left = snake[0].left + 10;
            else left = snake[0].left - 10;
          } else if (dir === "left") {
            if (left !== snake[1].left + 10) left = snake[0].left - 10;
            else left = snake[0].left + 10;
          }
          newSnake.push({ left: left, top: top });
        } else {
          top = snake[idx - 1].top;
          left = snake[idx - 1].left;
          newSnake.push({ left: left, top: top });
        };
      })
      if (add) {
        newSnake.push({ left: snake[snake.length - 1].left, top: snake[snake.length - 1].top });
        setAdd(false);
      }
      // 身体碰撞检测
      newSnake.forEach((s: any, i: number) => {
        newSnake.forEach((s1: any, j: number) => {
          if (j !== i && s1.top === s.top && s1.left === s.left) overBorder = true;
        })
      })
      if (!overBorder) setSnake(newSnake);
    }, TIME);
  }, [snake])

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") setDir("down");
      if (e.key === "ArrowUp") setDir("up");
      if (e.key === "ArrowLeft") setDir("left");
      if (e.key === "ArrowRight") setDir("right");
    })
  }, [])



  const renderSnake = () => {
    return snake.map((e: any, idx: number) => {
      return <div key={idx} className={styles.snake} style={{ left: e.left + 'px', top: e.top + 'px' }}></div>
    })
  }

  const renderFood = () => {
    // 食物碰撞检测
    if (snake[0].left === food.left && snake[0].top === food.top) {
      const left = Math.ceil(Math.random() * 59) * 10;
      const top = Math.ceil(Math.random() * 39) * 10;
      let newSnake = [{ left: left, top: top }];
      snake.forEach((e: any) => newSnake.push({ left: e.left, top: e.top }));
      setAdd(true);
      setFood({ left: left, top: top });
    }
    return (
      <div className={styles.food} style={{ left: food.left + 'px', top: food.top + 'px' }}></div>
    )
  }

  return (
    <>
      {/* <button style={{ position: 'absolute', left: '200px', top: '200px' }}>Start</button> */}
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