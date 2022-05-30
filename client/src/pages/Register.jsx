import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = formData;

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
					<FaUser /> Register user
				</h1>
				<p>Please, create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleFormSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							name='name'
							id='name'
							value={name}
							placeholder='Please, enter your name'
							onChange={handleInput}
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							name='confirmPassword'
							id='confirmPassword'
							value={confirmPassword}
							placeholder='Please, confrim your password'
							onChange={handleInput}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Register user</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
