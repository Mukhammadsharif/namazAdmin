import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Promotion from "./pages/Promotion";
import Family from "./components/Family";
import FamilyDetail from "./pages/FamilyDetail";
import BaseContextWrapper from "./components/BaseContext";

function App() {
  return (
    <>
        <BaseContextWrapper>
            <Routes>
              <Route path="/" element={<SignIn />} exact/>
              <Route path="users" element={<Users />} />
              <Route path="user/:id" element={<UserDetail />} />
              <Route path="family-tree" element={<Family />} />
              <Route path="family-member/:id" element={<FamilyDetail />}/>
              <Route path="chat" element={<Promotion />} />
            </Routes>
        </BaseContextWrapper>
    </>
  );
}

export default App;
