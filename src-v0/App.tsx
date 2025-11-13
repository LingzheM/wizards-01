import Wizard from './wizard/Wizard'

function App() {

  return (
    <>
     <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui, -apple-system Segoe UI, Roboto, Helvetica Arial' }}>
        <h2>分步注册Wizard</h2>
        <Wizard />
     </div>
    </>
  )
}

export default App
