import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import Example from './views/Example/Example';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/example' element={<Example />} />
        </Routes>
      </BrowserRouter>
    );
  };
};

export default App;
