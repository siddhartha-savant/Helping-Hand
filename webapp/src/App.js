import { React, useState } from 'react';
import './App.scss';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Terms from './components/Termsnconditions/Terms';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import TermsOfUse from './components/TermsOfUse/TermsOfUse';
import UpdateAccountDetails from './components/UpdateAccountDetails/UpdateAccountDetails';
import Ngo from './components/NgoLogin/Ngo';
import About from './components/About/About';
import Contact from './components/Contact/Contact'
import Profile from './components/Profile/Profile';
import SearchPage from './components/SearchPage/SearchPage';
import VisitSchedule from './components/VisitSchedule/VisitSchedule';
import AboutNgo from './components/AboutNgo/AboutNgo';
import VisitorRequests from './components/VisitorRequests/VisitorRequests';

const Appwrapper = () => {
  const [id, setId] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [ngoEmail, setNgoEmail] = useState("");

  let routes = useRoutes([
    { path: "/", element: <MainPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <Register /> },
    { path: "/privacyPolicy", element: <PrivacyPolicy /> },
    { path: "/termsOfUse", element: <TermsOfUse /> },
    { path: "register", element: <Register /> },
    { path: "privacyPolicy", element: <PrivacyPolicy /> },
    { path: "termsOfUse", element: <TermsOfUse /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/ngo", element: <Ngo /> },
    { path: "Donor", element: <SearchPage setId={setId} setNgoName={setNgoName} setNgoEmail={setNgoEmail} /> },
    { path: "/Profile", element: <Profile /> },
    { path: "/UpdateAccountDetails", element: <UpdateAccountDetails /> },
    { path: "/visitSchedule", element: <VisitSchedule ngoName={ngoName} ngoEmail={ngoEmail} /> },
    { path: "/aboutNgo", element: <AboutNgo id={id} /> },
    { path: "/visitRequests", element: <VisitorRequests id={id} /> }
  ]);
  return routes;
};

function App() {

  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = useState({});

  const fetchDonors = () => {
    fetch("http://localhost:3001/users").then(res => res.json()).then((result) => {
      setDonors(result)
    })
  }

  function listUpdate(id, newUpdateJson) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUpdateJson)
    };
    fetch("http://localhost:3001/users/" + id, requestOptions).then(fetchDonors);
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Appwrapper />
        <Footer />
        <Terms />
      </Router>
    </div>
  );
}

export default App;
