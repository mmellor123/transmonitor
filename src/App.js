
import { useState } from "react";
import { ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { Route, Routes} from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
import SidebarMine from "./scenes/global/Sitebar";
import  Dashboard  from "./scenes/dashboard";
import Team from "./scenes/team";
import  Invoices  from "./scenes/invoices";
import  Contacts  from "./scenes/contacts";
import  Bar  from "./scenes/bar";
import  Form  from "./scenes/form";
import  Line  from "./scenes/line";
import  Pie  from "./scenes/pie";
import  FAQ  from "./scenes/faq";
import  Geography  from "./scenes/geography";
import  Calendar  from "./scenes/calendar";
import  Customer  from "./scenes/customer";
import { AuthProvider } from "./components/auth";
import { Login } from "./components/Login";
import { RequireAuth } from "./components/RequireAuth";
import Register from "./components/Register";


function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
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
                  <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                  <Route path="/team" element={<RequireAuth><Team/></RequireAuth>}/>
                  <Route path="/contacts" element={<RequireAuth><Contacts/></RequireAuth>}/>
                  <Route path="/invoices" element={<RequireAuth><Invoices/></RequireAuth>} />
                  <Route path="/form" element={<RequireAuth><Form/></RequireAuth>} />
                  <Route path="/bar" element={<RequireAuth><Bar/></RequireAuth>} />
                  <Route path="/pie" element={<RequireAuth><Pie/></RequireAuth>} />
                  <Route path="/line" element={<RequireAuth><Line/></RequireAuth>} />
                  {/* <Route path="/faq" element={<RequireAuth><FAQ/></RequireAuth>} /> */}
                  <Route path="/geography" element={<RequireAuth><Geography/></RequireAuth>} />
                  <Route path="/calendar" element={<RequireAuth><Calendar/></RequireAuth>} />
                  <Route path="/customer" element={<RequireAuth><Customer/></RequireAuth>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
