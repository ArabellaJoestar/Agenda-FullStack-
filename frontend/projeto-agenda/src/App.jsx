import './App.css'
import Home from './pages/Home'
import Header from './templates/Header'
import {Routes, Route, Link} from 'react-router-dom'
import WrNotes from './pages/WrNotes'

function App() {


  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/wrNotes' element={<WrNotes/>}></Route>
    </Routes>
    </>
  )
}

export default App
