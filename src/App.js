
import { useState} from "react";
import { ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { Route, Routes} from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
import SidebarMine from "./scenes/global/Sitebar";
import  Dashboard  from "./scenes/dashboard";
import  Invoices  from "./scenes/invoices";
import  Contacts  from "./scenes/contacts";
import  Bar  from "./scenes/bar";
import  Form  from "./scenes/form";
import  Line  from "./scenes/line";
import  Pie  from "./scenes/pie";
// import  FAQ  from "./scenes/faq";
import  Geography  from "./scenes/geography";
import  Calendar  from "./scenes/calendar";
import  Customer  from "./scenes/customer";
import { AuthProvider } from "./components/auth";
import { Login } from "./components/Login";
import { RequireAuth } from "./components/RequireAuth";
import { ProtecteRoute } from "./routes/ProtectedRoute";
import Register from "./components/Register";
import CreateRule from "./scenes/create_rule";
import ViewRules from "./scenes/view-rules";
import EditRule from "./scenes/edit_rule";
import Logout from "./components/Logout";




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className="app">
            <SidebarMine isSidebar={isSidebar}/>
            <main className="content">
              {/* <Topbar setIsSidebar={setIsSidebar}/> */}
              <Routes>
                  <Route path="/" element={<ProtecteRoute><Dashboard /></ProtecteRoute>} />
                  <Route path="/contacts" element={<ProtecteRoute><Contacts/></ProtecteRoute>}/>
                  <Route path="/invoices" element={<ProtecteRoute><Invoices/></ProtecteRoute>} />
                  <Route path="/form" element={<ProtecteRoute><Form/></ProtecteRoute>} />
                  <Route path="/bar" element={<ProtecteRoute><Bar/></ProtecteRoute>} />
                  <Route path="/pie" element={<ProtecteRoute><Pie/></ProtecteRoute>} />
                  <Route path="/line" element={<ProtecteRoute><Line/></ProtecteRoute>} />
                  {/* <Route path="/faq" element={<ProtecteRoute><FAQ/></ProtecteRoute>} /> */}
                  <Route path="/geography" element={<ProtecteRoute><Geography/></ProtecteRoute>} />
                  <Route path="/logout" element={<ProtecteRoute><Logout/></ProtecteRoute>} />
                  <Route path="/calendar" element={<ProtecteRoute><Calendar/></ProtecteRoute>} />
                  <Route path="/customer" element={<ProtecteRoute><Customer/></ProtecteRoute>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/create-rule" element={<ProtecteRoute><CreateRule/></ProtecteRoute>} />
                  <Route path="/view-rules" element={<ProtecteRoute><ViewRules/></ProtecteRoute>} />
                  <Route path="/edit-rule" element={<ProtecteRoute><EditRule/></ProtecteRoute>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}


export default App;
