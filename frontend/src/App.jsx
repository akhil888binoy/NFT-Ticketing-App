import {Route , BrowserRouter as Router ,  Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import TicketMint from './pages/TicketMint';

const App = () => {
  return (
    <main>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/ticket' element={<TicketMint></TicketMint>}></Route>       
        </Routes>
      </Router>
    </main>
  )
}

export default App