import _ from 'lodash';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './utils/router/routes';

class App extends React.Component {

  getRoutes = (_routes) => {
    return _routes.map((o, i) => {
      // If has children, loop through children as well
      let childrenComponents = [];
      if (_.has(o, 'children')) {
        childrenComponents = this.getRoutes(o.children);
      };
      return (
        <React.Fragment key={i}>
          <Route path={o.path} element={<o.element routes={routes} />} />
          {childrenComponents}
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          {this.getRoutes(routes)}
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;
