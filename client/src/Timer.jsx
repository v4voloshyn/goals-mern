import React, { useEffect, useRef, useState } from 'react';
import { getDefaultValue } from './App';

export const Timer = () => {
	const [time, setTime] = useState(getDefaultValue('timer'));
	const [isPause, setPause] = useState(true);

	const [count, setCount] = useState(getDefaultValue('counter'));

	const inc = () => {
		setCount(count + 1);
	};
	const dec = () => {
		setCount((count) => count - 1);
	};
	const timeRef = useRef(null);

	const start = () => {
		if (timeRef.current && !isPause) return;

		setPause(false);
		timeRef.current = setInterval(() => {
			setTime((prevCount) => prevCount + 1);
		}, 1000);
	};

	const stop = () => {
		if (isPause) {
			setTime(0);
		}

		clearInterval(timeRef.current);
		setPause(true);
	};

	useEffect(() => {
		localStorage.setItem('timer', time);
		localStorage.setItem('counter', count);
	}, [time, count]);

	useEffect(() => {
		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	return (
		<>
			<div className='center'>
				<div>
					<code>{count}</code>
				</div>
				<button onClick={dec}>Minus</button>
				<button onClick={inc}>Plus</button>
			</div>

			<div className='center'>
				<h3>Timer</h3>
				<div>
					<code>{time}</code>
				</div>
				<button onClick={start}>Start</button>
				<button onClick={stop}>Stop</button>
			</div>
		</>
	);
};
