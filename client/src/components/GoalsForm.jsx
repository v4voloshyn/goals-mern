import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createGoal, updateGoal } from '../redux/goals/goalsSlice';

const GoalsForm = React.memo(function ({ updateText, setUpdate, textId }) {
	const [text, setText] = useState(updateText || '');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text) {
			toast.error('Input field is required');
			return;
		}

		if (text === updateText) {
			setText('');
			setUpdate('', null);
			return;
		}

		if (updateText) {
			dispatch(updateGoal({ text: text, id: textId }));
		} else {
			dispatch(createGoal({ text }));
		}

		setText('');
		setUpdate('', null);
	};

	useEffect(() => {
		setText(updateText);
	}, [updateText]);

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
				{updateText ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div className='form-group'>
							<button className='btn btn-block'>Update goal!</button>
						</div>
						<div className='form-group'>
							<button
								type='button'
								className='btn btn-block'
								onClick={() => setUpdate('', null)}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div className='form-group'>
						<button className='btn btn-block'>Set goal!</button>
					</div>
				)}
			</form>
		</section>
	);
});

export default GoalsForm;
