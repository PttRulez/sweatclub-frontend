import { useCallback, useEffect, useState } from 'react';
import blueCandy from './images/100x100/blue-candy.png';
import greenCandy from './images/100x100/green-candy.png';
import orangeCandy from './images/100x100/orange-candy.png';
import purpleCandy from './images/100x100/purple-candy.png';
import redCandy from './images/100x100/red-candy.png';
import yellowCandy from './images/100x100/yellow-candy.png';
import blank from './images/100x100/blank.png';
import cssClasses from './css/candy.module.css';
import BlueButton from '../../../components/UI/BlueButton';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import { useSelector } from 'react-redux';

const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];
let timerIntervalId;
let levelIntervalId;
const CandyCrush = () => {
  const user = useSelector(state => state.auth.user);
  const [width, setWidth] = useState(8);
  const [candyDragged, setCandyDragged] = useState(null);
  // const [candyReplaced, setCandyReplaced] = useState(null);
  const [candies, setCandies] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(10);
  const [timeToGo, setTimeToGo] = useState(10);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push(randomColor);
    }
    setCandies(randomCandies);
    setScore(0);
  };

  const checkRows = useCallback(() => {
    const dontCheckThree = [];
    const dontCheckFour = [];
    const toDestroyRows = [];
    let points = 0;
    for (let j = 1; j <= width; j++) {
      dontCheckThree.push(...[j * width - 2, j * width - 1]);
      dontCheckFour.push(...[j * width - 3, j * width - 2, j * width - 1]);
    }

    let i = 0;
    while (i < width ** 2 - 2) {
      if (dontCheckThree.includes(i) || candies[i] === blank) {
        i += 1;
        continue;
      }

      const chosenCandy = candies[i];

      if (!dontCheckFour.includes(i)) {
        const rowFour = [i, i + 1, i + 2, i + 3];

        if (rowFour.every(index => candies[index] === chosenCandy)) {
          points += 6;
          rowFour.forEach(index => toDestroyRows.push(index));
          i += 4;
          continue;
        }
      }

      const rowThree = [i, i + 1, i + 2];
      if (rowThree.every(index => candies[index] === chosenCandy)) {
        points += 3;
        rowThree.forEach(index => toDestroyRows.push(index));
        i += 3;
        continue;
      }

      i += 1;
    }
    return { toDestroyRows, points };
  }, [candies, width]);

  const checkCols = useCallback(() => {
    const toDestroyCols = [];
    let points = 0;
    const lastThree = width ** 2 - width * 2;
    const lastFour = width ** 2 - width * 3;

    for (let i = 0; i < lastThree; i++) {
      if (toDestroyCols.includes(i) || candies[i] === blank) continue;

      const chosenCandy = candies[i];

      if (i < lastFour) {
        const colFour = [i, i + width, i + width * 2, i + width * 3];
        if (colFour.every(index => candies[index] === chosenCandy)) {
          points += 6;
          colFour.forEach(index => toDestroyCols.push(index));
          continue;
        }
      }

      const colThree = [i, i + width, i + width * 2];
      if (colThree.every(index => candies[index] === chosenCandy)) {
        points += 3;
        colThree.forEach(index => toDestroyCols.push(index));
      }
    }
    return { toDestroyCols, points };
  }, [candies, width]);

  const fillBlanks = () => {
    while (candies.filter(candy => candy === blank).length > 0) {
      for (let i = 0; i <= width ** 2 - width - 1; i++) {
        const firstRow = [...Array(width).keys()];
        const isFirstRow = firstRow.includes(i);

        if (isFirstRow && candies[i] === blank) {
          let randomNumber = Math.floor(Math.random() * candyColors.length);
          candies[i] = candyColors[randomNumber];
        }

        if (candies[i + width] === blank) {
          candies[i + width] = candies[i];
          candies[i] = blank;
        }
      }
    }
    setCandies([...candies]);
  };

  const checkAll = useCallback(() => {
    const { toDestroyRows, points: pointsRows } = checkRows();
    const { toDestroyCols, points: pointsCols } = checkCols();

    return { toDestroy: [...toDestroyRows, ...toDestroyCols], points: pointsRows + pointsCols };
  }, [checkRows, checkCols]);

  const dragStart = async e => {
    setCandyDragged(e.target);
  };

  const dragDrop = async e => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    // Стартует отсчет времени, если это первое движение
    if (!gameStarted) {
      setGameStarted(true);
      levelIntervalId = setInterval(() => {
        if (level > 1) {
          setLevel(level => level - 1);
        } else {
          clearInterval(levelIntervalId);
        }
      }, 30000);
    }

    dragEnd(e.target);
  };

  const handleClick = async e => {
    if (candyDragged === null) {
      setCandyDragged(e.target);
    } else {
      dragDrop(e);
    }
  };

  const dragEnd = async candyReplaced => {
    const candyDraggedId = Number(candyDragged.dataset.id);
    const candyReplacedId = Number(candyReplaced.dataset.id);

    candies[candyReplacedId] = candyDragged.getAttribute('src');
    candies[candyDraggedId] = candyReplaced.getAttribute('src');

    const validMoves = [
      candyDraggedId - 1,
      candyDraggedId - width,
      candyDraggedId + 1,
      candyDraggedId + width,
    ];
    const validMove = validMoves.includes(candyReplacedId);
    const { toDestroy, _ } = checkAll();

    if (candyReplacedId && validMove && toDestroy.length > 0) {
      candies[candyReplacedId] = candyDragged.getAttribute('src');
      candies[candyDraggedId] = candyReplaced.getAttribute('src');
      setCandies([...candies]);

      setTimeToGo(level);
      clearInterval(timerIntervalId);

      timerIntervalId = (function(closuredTimeToGo) {

        return setInterval(function() {
          closuredTimeToGo -=0.2;
          console.log('closuredTimeToGo', closuredTimeToGo);
          setTimeToGo(time => Number((time - 0.2)).toFixed(1));
          if(closuredTimeToGo <= 0) {
            console.log('called stopGame from Interval')
            stopGame();
          }
        }, 200);
      
      })(Number(timeToGo).toFixed(1));

    } else {
      candies[candyDraggedId] = candyDragged.getAttribute('src');
      candies[candyReplacedId] = candyReplaced.getAttribute('src');
    }

    setCandyDragged(null);
  };

  const resetGame = () => {
    clearInterval(timerIntervalId);
    clearInterval(levelIntervalId);
    setCandyDragged(null);
    setLevel(10);
    setTimeToGo(10);
    setGameStarted(false);
    setGameFinished(false);
    setScore(0);
    createBoard();
  };

  const sendPointsToServer = () => {
    api
      .post('/candy-crush', {
        user_id: user.id,
        points: score,
      })
      .then(res => console.log(res))
      .catch(err => alert(err));
  };

  const stopGame = () => {
      clearInterval(timerIntervalId);
      clearInterval(levelIntervalId);
      setTimeToGo(0);
      setGameFinished(true);
      sendPointsToServer();
  }

  // useEffect(() => {
  //   if (timeToGo <= 0.00001) {
  //     console.log('timeToGo')
  //     clearInterval(timerIntervalId);
  //     clearInterval(levelIntervalId);
  //     setGameFinished(true);
  //     sendPointsToServer();
  //   }
  // }, [timeToGo]);


  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (candies.length > 0) {
      const { toDestroy, points } = checkAll();

      if (toDestroy.length > 0) {
        toDestroy.forEach(i => (candies[i] = blank));
        setCandies([...candies]);
        if (gameStarted) {
          setScore(prev => prev + points);
        }
        fillBlanks();
      }
    }
  }, [candies]);

  return (
    <div className={cssClasses.wrapper}>
      <div className={cssClasses['main-grid']}>
        {/* --------------------RATINGS LINK ----------------------- */}
        <div className={cssClasses['ratings']}>
          <Link
            to='/candy-crush-ratings'
            className='inline-block font-bold hover:text-blue-400 outline-dashed p-3'
          >
            ratings
          </Link>
        </div>

        {/* ----------------- SECONDS for MOVE ------------------------ */}
        <div className={cssClasses.seconds}>
          <p className='text-red-600 font-bold text-5xl lg:text-9xl'>{timeToGo}</p>
          <p className='text-blue-600 font-bold text-base md:text-lg'>
            <span className='text-sm text-gray-500 font-normal'>на ход:</span> {level}
          </p>
        </div>

        {/* ----------------- GAME-FIELD ------------------------ */}
        <div className={cssClasses.game}>
          {candies.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={!gameFinished}
              onDragStart={dragStart}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => e.preventDefault()}
              onDragLeave={e => e.preventDefault()}
              onDrop={dragDrop}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* ----------------- SCORE ------------------------ */}
        <div className={cssClasses.score}>
          <p className='text-purple-800 font-bold text-8xl lg:text-9xl'>{score}</p>
        </div>

        {/* -----------------RESTART BUTTON ------------------------ */}
        <div className={cssClasses.restart}>
          <BlueButton className='mt-10' onClick={resetGame}>
            restart
          </BlueButton>
        </div>
      </div>
    </div>
  );
};

export default CandyCrush;
