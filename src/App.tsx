import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import * as Pages from "./Pages";
import { LoginForm } from "./components/login-form";
import Layout from "./components/Layout";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        //! Normal User Layout
        <Route path="/" element={<Layout/>} >
          <Route path="" element={<Pages.Viewer.Home />} />
          <Route path="login" element={<LoginForm />} />
        </Route>


        //! Loginned User Layout
        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
          
          //! Hero Section
          <Route path="/hero" element={<Pages.Admin.Hero.List/>} />
          <Route path="/hero/edit" element={<Pages.Admin.Hero.Edit />} />
          <Route path="/hero/create" element={<Pages.Admin.Hero.Create />} />

              //! Contact
          <Route path="/contact" element={<Pages.Admin.Contact.List/>} />
          <Route path="/contact/edit" element={<Pages.Admin.Contact.Edit />} />
          <Route path="/contact/create" element={<Pages.Admin.Contact.Create />} />

             //! About
            <Route path="/about" element={<Pages.Admin.About.List/>} />
            <Route path="/about/edit" element={<Pages.Admin.About.Edit />} />
            <Route path="/about/create" element={<Pages.Admin.About.Create />} />
          


            //! Project
            <Route path="/projects" element={<Pages.Admin.Projects.List />} />
            <Route path="/projects/edit" element={<Pages.Admin.Projects.Edit />} />
           <Route path="/projects/create" element={<Pages.Admin.Projects.Create />} />
          
              //! Skills
            <Route path="/skills" element={<Pages.Admin.Skill.List />} />
            <Route path="/skills/edit" element={<Pages.Admin.Skill.Edit />} />
            <Route path="/skills/create" element={<Pages.Admin.Skill.Create />} />


        //! Experience
        <Route path="/experience" element={<Pages.Admin.Experience.List/>} />
        <Route path="/experience/edit" element={<Pages.Admin.Experience.Edit />} />
          <Route path="/experience/create" element={<Pages.Admin.Experience.Create />} />
          

                  //! Education
        <Route path="/education" element={<Pages.Admin.Education.List/>} />
        <Route path="/education/edit" element={<Pages.Admin.Education.Edit />} />
        <Route path="/education/create" element={<Pages.Admin.Education.Create />} />

        </Route>




    





        


  
 

{/* 
        <Route path="/projects" element={<Projects />} />

        <Route path="/honestalk" element={<HonesTalk />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
