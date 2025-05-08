import './App.css'
import LogoutButton from './components/LogoutButton'
import UserList from './components/UserList'

function App() {
  return (
    <div>
      <header>
        <h1>Restaurante</h1>
        <LogoutButton />
      </header>
      <main>
        <UserList />
      </main>
    </div>
  )
}

export default App
