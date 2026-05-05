   import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import Navbar from './Navbar';
   import Home from './Home';
   import BodyShapeForm from './BodyShapeForm';
   import OutfitIdeas from './OutfitIdeas';
   import DonationForm from './DonationForm';
   import './App.css';

   function App() {
       return (
           <Router>
               <div className="App">
                   <Navbar />
                   <Routes>
                       <Route path="/" element={<Home />} />
                       <Route path="/bodyshape" element={<BodyShapeForm />} />
                       <Route path="/suggestions" element={<OutfitIdeas />} />
                       <Route path="/donate" element={<DonationForm />} />
                   </Routes>
               </div>
           </Router>
       );
   }

   export default App;
