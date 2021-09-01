import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Landing } from './components/landing/Landing';
import { Countries } from './components/countries/Countries';

function App() {
	return (
		<Router>
			<Switch>
				{/* <div className="App"> */}
				<Switch>
					<Route exact path="/">
						<Landing />
					</Route>
					<Route exact path="/countries">
						<Countries />
					</Route>
				</Switch>
				{/* </div> */}
			</Switch>
		</Router>
	);
}

export default App;
