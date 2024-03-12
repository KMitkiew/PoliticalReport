import './components/css/App.css';
import Navbar from './components/js/SiteComponents/Navbar/Navbar';
import Main from './components/js/MainPage/Main';
import SearchEngine from './components/js/SearchEnginePage/SearchEngine';
import LogIn from './components/js/LogIn';
import Register from './components/js/Register';
import SetNewPassword from './components/js/SetNewPassword';
import EventPage from './components/js/EventsPage/EventPage';
import PoliticProfile from './components/js/PoliticPage/PoliticProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/js/ErrorPage';
import UserPage from './components/js/ProfilePage/UserPage';
import UserDetails from './components/js/ProfilePage/UserDetails';
import UserReactions from './components/js/ProfilePage/UserReactions';
import ObservedPolitics from './components/js/ProfilePage/ObservedPolitics';
import AddEvent from './components/js/AddEvent/AddEvent';
import AddPolitic from './components/js/AddPolitic/AddPolitic';
import AuthRequired from './components/js/Authorization';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/login'
					element={<LogIn />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
						path='/newpassword'
						element={<SetNewPassword />}
				/>
				<Route element={<AuthRequired />}>
					<Route element={<Navbar />}>
						<Route
							path='/'
							element={<Main />}
						/>
						<Route
							path='/add-event'
							element={<AddEvent />}
						/>
						<Route
							path='/add-politic'
							element={<AddPolitic />}
						/>
						<Route
							path='/event/:id'
							element={<EventPage />}
						/>
						<Route
							path='/politic/:id'
							element={<PoliticProfile />}
						/>
						<Route
							path='/searchengine'
							element={<SearchEngine />}
						/>
						<Route
							path='/user'
							element={<UserPage />}>
							<Route
								index
								element={<UserDetails />}
							/>
							<Route
								path='observed'
								element={<ObservedPolitics />}
							/>
							<Route
								path='reactions'
								element={<UserReactions />}
							/>
						</Route>
					</Route>
					<Route
						path='*'
						element={<ErrorPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
