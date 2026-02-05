import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/recipe/:id' element={<RecipeScreen />} />
            </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
