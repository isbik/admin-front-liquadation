import React, { useEffect, useState } from 'react';

function App() {
  const [a, setCount] = useState(0);

  useEffect(() => {
    setCount(10);
  }, []);

  return (
    <>
      <header>Header</header>
      <main className="p-3">Main</main>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        {a}
      </button>
      <a href="asdf">asdf</a>
    </>
  );
}

export default App;
