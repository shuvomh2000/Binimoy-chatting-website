
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from "react-router-dom";
import Message from "./components/message";
import Notification from "./components/notification";
import Setting from "./components/setting";
import ForgetPassword from "./pages/forgetPassword";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import RootLayout from "./route/RootLayout";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/registration' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
      <Route path='/message' element={<Message/>}></Route>
      <Route path='/notification' element={<Notification/>}></Route>
      <Route path='/setting' element={<Setting/>}></Route>
    </Route>
  ))

function App() {
  return <RouterProvider router={router}/>
}

export default App;
