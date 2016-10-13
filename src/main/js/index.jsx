/* React, browser and server rendering functions. We need the
 * first import, even though it isn't explicitly referenced
 * in this file, in order to avoid runtime errors. */
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

/* State management with redux */
import { Provider } from 'react-redux';

/* Routing with react-router */
import { Router, RouterContext, match, browserHistory } from 'react-router';

import createStore from './store';

/* Our routing rules (actually a function that takes an auth and returns the rules) */
import buildRoutes from './routes';

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const app = (
    <Provider store={store}>
      <Router history={browserHistory}>
        {buildRoutes(store)}
      </Router>
    </Provider>
  );

  console.log("index");
  
  console.log(document.getElementById('mount'));
  
  render(app, document.getElementById('mount'));
}

// eslint-disable-next-line import/prefer-default-export
export function renderApp(path, state) {

  console.log('Render App');	
	
  console.log(state.toString());	
	
  const store = createStore(state);
  let renderResult = '';
  
  

  match({ routes: buildRoutes(store), location: path }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
    	
      console.log('renderProps');	
      console.log(renderProps);	
    	
      renderResult = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
    }
    else {
      console.error(`Failed to render app for path [${path}], error: [${error}]`);
    }
  });

  console.log('Render Path');
  
  console.log(state.toString());
  
  console.log(store.toString());
  
  console.log(path);
  console.log(renderResult.toString());
  
  return renderResult;
}
