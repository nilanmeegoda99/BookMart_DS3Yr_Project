import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProductView from './screens/ProductView'
import CartView from './screens/CartView'
import  SignInView from './screens/SignInView'
import AddUserView from './screens/AddUserView'
import UserProfileView from './screens/userProfileView'
import shippingprocessView from './screens/shippingprocessView'
import paymentmethodView from './screens/paymentmethodView'
import ConfirmOrder from './screens/confirmOrder'
import OrderView from './screens/orderView'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-2'>
        <Container>
         

          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/account' component={UserProfileView} />
          <Route path='/login' component={SignInView} />
          <Route path='/order' component={OrderView} />
          <Route path='/paymentprocess' component={paymentmethodView} />
          <Route path='/confirmOrder' component={ConfirmOrder} />
          <Route path='/shippingprocess' component={shippingprocessView} />
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
