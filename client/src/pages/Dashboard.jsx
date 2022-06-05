import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalsForm from '../components/GoalsForm';
import { clearErrors, getGoals, reset } from '../redux/goals/goalsSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

function Dashboard() {
	const [updateText, setUpdateText] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { goals, isError, isLoading, message } = useSelector(
		(state) => state.goals
	);

	useEffect(() => {
		if (isError) {
			if (!user) {
				toast.error('You should login first to see your goals');
			} else {
				toast.error(message);
			}
		}

		if (!user) {
			navigate('/login');
		}
		return () => {
			// dispatch(reset());
			// console.log('cleaned error');
			dispatch(clearErrors());
		};
	}, [user, navigate, isError, message, dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(getGoals());
		}
	}, [user, dispatch]);

	const textIdRef = useRef(null);

	const setUpdate = (text, textId) => {
		setUpdateText(text);
		if (textId) {
			textIdRef.current = textId;
		}
	};

	return (
		<>
			<section className='heading'>
				<h1>Welcome {user?.name}</h1>
				<h3>This is you'r goals dashboard</h3>
			</section>
			{isLoading && <Spinner />}
			<GoalsForm
				updateText={updateText}
				textId={textIdRef.current}
				setUpdate={setUpdate}
			/>

			<div className='goals'>
				{!goals?.length && <h3>You have no goals :(</h3>}
				{goals.map((goal) => (
					<GoalItem key={goal._id} {...goal} setUpdate={setUpdate} />
				))}
			</div>
		</>
	);
}

export default Dashboard;
