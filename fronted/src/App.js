import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard.js';
import LoginPage from './components/LoginPage.js';
import SignupPage from './components/SignupPage.js';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/sign-up' element={<SignupPage />} />
			</Routes>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</BrowserRouter>
	);
}

export default App;
