import './game'
import './App.css'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
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
