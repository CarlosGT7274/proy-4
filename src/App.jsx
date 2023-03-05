import { useState, useEffect } from 'react'
import { 
  onSnapshot,
	collection,
	addDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase.js'
import './App.css'
import { Elhtml, Min, Nodal, Foot } from "./elhtml.jsx"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneInput from 'react-phone-number-input';




function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
 
   return (
    <div className="App">
      <Elhtml onClick1={openModal} />
      <Min />
      <Nodal isOpen={isOpen} onClose={closeModal} /> 
      <Foot />
    </div>
  )
}

export default App
