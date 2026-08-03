import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, VirtualAssistant, VirtualAssistantPage } from "./components";
import Footer from "./components/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const FloatingAssistant = () => {
  const location = useLocation();
  
  // Hide the floating widget on the dedicated page so we don't have duplicates
  if (location.pathname === "/projects/rag-profile-system") {
    return null;
  }
  
  return <VirtualAssistant />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='relative z-0 bg-primary min-h-screen flex flex-col justify-between'>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                    <Hero />
                  </div>
                  <About />
                  <Experience />
                  <Tech />
                  <Works isHome={true} />
                  <Feedbacks />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <div className="pt-24">
                  <Works isHome={false} />
                </div>
              }
            />
            <Route
              path="/projects/rag-profile-system"
              element={
                <VirtualAssistantPage />
              }
            />
            <Route
              path="/contact"
              element={
                <div className="pt-24">
                  {/* Contact form is rendered as a footer below */}
                </div>
              }
            />
          </Routes>
        </div>
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
          <Footer />
        </div>
        <FloatingAssistant />
      </div>
    </BrowserRouter>
  );
}

export default App;
