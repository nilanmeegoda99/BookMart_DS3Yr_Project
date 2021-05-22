import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProductView from './screens/ProductView'
import CartView from './screens/CartView'
import  SignInView from './screens/SignInView'
import AddUserView from './screens/AddUserView'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-2'>
        <Container>
         

          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/login' component={SignInView} />
          <Route path='/register' component={AddUserView} />
           {/* Here we have used route to go to homepage if path is exactly / using exact keyword */}
           <Route path='/' component={Home} exact />

           

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
