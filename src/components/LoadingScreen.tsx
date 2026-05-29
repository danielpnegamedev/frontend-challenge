export function LoadingScreen() {
  return (
        <div id="loading-screen" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#51417F',
        }}>
            <img src="./assets/logo.png" alt="A logo with a spinning top" />
            <progress id="progress-bar" max="100" value="0"></progress>
        </div>
    )
}