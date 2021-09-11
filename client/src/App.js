import styles from './App.module.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Activity } from './pages/Activity';
import { Details } from './pages/Details';
import { About } from './pages/About';
import { Activities } from './pages/Activities';

export function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/activity" component={Activity} />
					<Route exact path="/home/:id" component={Details} />
					<Route exact path="/about" component={About} />
					<Route exact path="/activities" component={Activities} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

/* //import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { Landing } from './pages/landing/Landing';
import { Home } from './pages/home/Home';
import { Details } from './pages/details/Details';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/details">
					<Details />
				</Route>
				<Route path="/">
					<Landing />
				</Route>
			</Switch>
		</Router>
	);
} */

export default App;
