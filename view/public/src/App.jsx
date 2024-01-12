import * as React from 'react';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from './pages/Home';
import { Vortex } from 'react-loader-spinner';

import { auth } from './fire';
import { onAuthStateChanged } from 'firebase/auth'//paquete que instalamos, nos regresa el usuario y el estado del usuario dependiendo que haga

function App() {
  const [user, setUser] = React.useState(null);//Estado del usuario
  const [authState, setAuthState] = React.useState(null);//Estado de autenticación

/*La función useEffect se ejecuta después de que el componente es renderizado en el DOM y también después de cada actualización subsiguiente. */

  React.useEffect(() => {//Aqui checamos el estado del usuario
    const unSubscribeAuth = onAuthStateChanged(auth, //toma la configuración de autenticación importada de fire.js
      async authenticatedUser => { 
        if(authenticatedUser) {//Si el usuario esta autenticado
          setUser(authenticatedUser.email)//y nos regrese el email
          setAuthState('home');//que nos lleve a home
        } else { //Si no esta autenticado
          setUser(null);
          setAuthState('login');//que nos lleve a login
        }
      })

      return unSubscribeAuth;
  }, [user])//como dependencia y cada ves que cambiemos la infomracion del usuario se va a ejecutar

  if(authState === null) 
  return 
  <div className='hidden relative lg:flex h-full items-center justify-center bg-gray-200'>
    render(<Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />)
  <p>Loading</p>
  </div>// Si el estado de autenticación es nulo, nos regresa un spinner
  if(authState === 'login') return <Login setAuthState={setAuthState} setUser={setUser}/>//Si el estado de autenticación es login, nos regresa el componente Login
  if(authState === 'register') return <Register setAuthState={setAuthState} setUser={setUser}/> //Si el estado de autenticación es register, nos regresa el componente Register
  if(user) return <Home user={user} setAuthState={setAuthState} setUser={setUser}/> //Si el usuario esta autenticado (diferente de nulo), nos regresa el componente Home

  /*EN LOS 3 IF QUE SON LOS CAMBIOS DE ESTADO SE MANDAN PARAMETROS ES DECIR EL ESTADO DEL USUARIO Y EL ESTADO DE AUTENTICACION */
}

export default App;