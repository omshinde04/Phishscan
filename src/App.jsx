import Navbar from "./components/Navbar";
import Header from "./components/Header";
import EmailForm from "./components/EmailForm";
import ResultCard from "./components/ResultCard";
import Footer from "./components/Footer";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import HowItWorks from "./pages/HowItWorks";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Header />
              <EmailForm />
              <ResultCard />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
