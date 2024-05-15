import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Dashboard, Home, Projects, SignIn, SignUp } from './pages';
import Header from './components/Header';
import FooterComp from './components/FooterComp';
import PrivateRoute from './components/PrivateRoute';




const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route element={<PrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="/projects" element={<Projects/>} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
