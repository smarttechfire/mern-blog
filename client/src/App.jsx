import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Dashboard, Home, Projects, SignIn, SignUp } from './pages';
import Header from './components/Header';
import FooterComp from './components/FooterComp';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';




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
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path="/projects" element={<Projects/>} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
