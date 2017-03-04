import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';
import App from "./components/App.js";
import Page from "./static/Page.js";
import How from "./static/How";
import AboutUs from "./static/AboutUs";

ReactDOM.render(
   <Router history={ hashHistory  } onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={ App }>
        <IndexRoute component={ Page } />
        <Route path="/how-it-works" component={ How } />
        <Route path="/about-us" component={ AboutUs } />
      </Route>
    </Router>,
  document.getElementById('content')
)
