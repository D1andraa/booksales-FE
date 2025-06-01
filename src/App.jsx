import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/admin"
import PublicLayout from "./layouts/public"
import Dashboard from "./pages/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import Home from "./pages/public"
import Books from "./pages/public/books"

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
             {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />}/>
            <Route path="books" element={<Books />}/>
          </Route>
      {/* Auth */}
          <Route>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
      {/* Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />}/>

            <Route path="books">
              <Route index element={<AdminBooks />}/>
              <Route path="create" element={<BookCreate />}/>
            </Route>
         </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
