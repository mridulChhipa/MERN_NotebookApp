import { Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './App.css';

import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
	return (
		<NoteState>
			<Navbar />
			<div className='container'>
				<Outlet />
			</div>
		</NoteState>
	);
}

export default App;
