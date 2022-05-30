import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const handleInput = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		console.log(formData);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
	};

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
