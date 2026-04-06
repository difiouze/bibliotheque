import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "./config/supabaseClient"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Auth from "./components/Auth"

function App() {
  const [session, setSession] = useState(null)

useEffect(() => {
  const { error, data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    
    if (error) {
      console.log(error)
    }

    if ({subscription}) {
      setSession(session)
    }
  })

  return () => subscription.unsubscribe()
})


const logout = async () => {
  await supabase.auth.signOut();
}

  return (
    <BrowserRouter>
      {session ? <>
          <nav>
            <h1 className="logo-title">Bibliothèque</h1>
            <Link to="/">Home</Link>
            <Link to="/create">Ajouter un livre</Link>
            <Link onClick={logout}>Log out</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Update />} />
          </Routes>
        </>
        : 
        <Auth />
      }
    </BrowserRouter>
  )
}

export default App