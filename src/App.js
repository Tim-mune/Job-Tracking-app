import {Landing,Error,Register,ProtectedRoutes} from "./pages";
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
Profile,
AllJobs,
AddJob,
Stats,
SharedLayout} from './pages/dashboard'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <ProtectedRoutes>
      <SharedLayout/>
      </ProtectedRoutes>
      }>
        <Route index element={<Stats/>}/>
        <Route path="all-jobs" element={<AllJobs/>}/>
        <Route path="add-job" element={<AddJob/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Route>
      <Route path="landing" element={<Landing/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
<ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;