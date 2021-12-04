import RouterComponent from './components/router/RouterComponent';
import { Provider } from 'react-redux';
import store from './redux/Store';

function App() {
	return (
		<div>
			<Provider store={store}>
				<RouterComponent />
			</Provider>
		</div>
	);
}

export default App;
