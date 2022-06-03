import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../redux/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const handleInput = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		console.log(formData);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	};

	if (user) {
		navigate('/');
	}

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login user
				</h1>
				<p>Login and start to do your goals</p>
			</section>
			<section className='form'>
				<form onSubmit={handleFormSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							name='email'
							id='email'
							value={email}
							placeholder='Please, enter your email'
							onChange={handleInput}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							name='password'
							id='password'
							value={password}
							placeholder='Please, enter your password'
							onChange={handleInput}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Log in</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
