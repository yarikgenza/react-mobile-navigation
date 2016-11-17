import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SettingsContainer from './stack/container/SettingsContainer';
import configureStore from './stack/store/configure-store';

const store = configureStore();
const style = {
	position: 'absolute',
	height: '500px',
	width: '400px',
};

ReactDOM.render(
	<Provider store={ store }>
		<div style={ style }>
			<SettingsContainer />
		</div>
	</Provider>,
	document.getElementById('CardsApp')
);
