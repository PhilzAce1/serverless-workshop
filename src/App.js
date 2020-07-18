import React, { useState, useEffect } from 'react';

import { listTalks as ListTalks } from './graphql/queries';

import { API, graphqlOperation } from 'aws-amplify';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>Backend Community</header>
        <article></article>
        <aside>
          <form>
            <input type="text" name="" id="" />
            <button type="submit">Send</button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default App;
