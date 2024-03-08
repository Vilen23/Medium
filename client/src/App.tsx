import { Routes,Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { Blogs } from "./pages/Blogs"
import { CreateBlog } from "./pages/CreateBlog"

function App() {

  return (
    <div className="font-roboto">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/write" element={<CreateBlog/>}/>
      </Routes>

    </div>
  )
}

export default App
