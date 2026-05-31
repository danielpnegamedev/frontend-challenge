import './App.css';
import { Layout } from './components/index.tsx';

function App() {
  
  return <Layout />
  return (
    <>
     
      <div id="loading-screen" style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: '#2c3e50', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', color: 'white', zIndex: 999
      }}>
        <h2>Carregando Peão...</h2>
        <progress id="progress-bar" value="0" max="100"></progress>
      </div>

    </>
  );
}

export default App;