import { useDispatch } from 'react-redux';
import { deleteGoal } from '../redux/goals/goalsSlice';

function GoalItem({ _id, createdAt, text, setUpdate }) {
	const dispatch = useDispatch();

	return (
		<div className='goal'>
			<div>{new Date(createdAt).toLocaleString('en-US')}</div>
			<h2>{text}</h2>
			<button className='close' onClick={() => dispatch(deleteGoal(_id))}>
				X
			</button>
			<button
				className='btn btn-center btn-edit'
				onClick={() => setUpdate(text, _id)}
			>
				Edit
			</button>
		</div>
	);
}

export default GoalItem;
