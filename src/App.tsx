import './game'
import './App.css'
import { LoadingScreen } from './components/LoadingScreen'
import { Layout } from './components/Layout'

function App() {
  
  return <Layout />;

  return (
    <>
    <LoadingScreen/>
      <div id="game-container">
        <div id="gameView"></div>
      </div>
    </>
  )
}

export default App
