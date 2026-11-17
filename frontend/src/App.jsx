import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { RecipesProvider } from './context/RecipesContext';

import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import NewRecipeScreen from './screens/NewRecipeScreen';
import CollectionsScreen from './screens/CollectionsScreen';
import MenusScreen from './screens/MenusScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import './App.css';

function App() {
  return (
    <RecipesProvider>
      <Router>
        <Header />
        <main>
          <div className="page-container">
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/recipes/new' element={<NewRecipeScreen />} />
              <Route path='/recipe/:id' element={<RecipeScreen />} />
              <Route path='/collections' element={<CollectionsScreen />} />
              <Route path='/menus' element={<MenusScreen />} />
              <Route path='/shopping-list' element={<ShoppingListScreen />} />
            </Routes>
          </div>
        </main>
        <Footer/>
      </Router>
    </RecipesProvider>
  );
}

export default App;
