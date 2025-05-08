import './App.css'
import LogoutButton from './components/LogoutButton'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'

function App() {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      <header>
        <h1>Restaurante</h1>
        {accessToken && <LogoutButton />}
      </header>
      <main>
        {accessToken ? <UserList /> : <LoginForm />}
      </main>
    </div>
  )
}

export default App
