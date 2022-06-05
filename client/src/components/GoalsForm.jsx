import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal, getGoals } from '../redux/goals/goalsSlice';

function GoalsForm() {
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createGoal({ text }));
		setText('');
	};

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='text-input'>Enter your next goal</label>
					<input
						type='text'
						id='text-input'
						name='text-input'
						value={text}
						placeholder='Set text here'
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block'>Set goal!</button>
				</div>
			</form>
		</section>
	);
}

export default GoalsForm;
