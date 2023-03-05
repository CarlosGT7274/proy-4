import React, { useState } from "react";
import { onSnapshot,
	collection,
	addDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase.js'
import logo from './img/a.png'
import Button from 'react-bootstrap/Button';
import v1 from './img/1v.mp4'
import v2 from './img/2v.mp4'
import v3 from './img/3v.mp4'
import Modal from 'react-bootstrap/Modal';
import IntlTelInput from "react-intl-tel-input";
import PhoneInput from 'react-intl-tel-input';
//import PhoneInput from 'react-phone-number-input'
import "react-intl-tel-input/dist/main.css";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Nav, Navbar, NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import es from 'date-fns/locale/es';


function Elhtml(props){
 return (
    <header className='comphed'>
      <img src={logo} alt="logo" width='175px' height='125px' />
      <ul className="hed">
        <li className='elementos'> 
          <Button variant="outline-danger" className="disparador" onClick={props.onClick1}>Reservas</Button>{' '}
        </li>
        <li className='elementos'>Sucursales</li>
        <li className='elementos'>Menù</li>
        <li className='elementos'>Ordena Ahora</li>
      </ul>
    </header>
  );
}

function Min(props) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [v1, v2, v3];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((currentVideoIndex + 1) % videos.length);
  };


  return(
    <main>
      <video
        src={videos[currentVideoIndex]}
        autoPlay
        muted
        controls={false}
        onEnded={handleVideoEnd}
      />
    </main>
  )
}

const Nodal = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState();
const [numPeople, setNumPeople] = useState('');
const [reservationDate, setReservationDate] = useState('');
const [reservationTime, setReservationTime] = useState('');
const [reservations, setReservations] = useState('');

  const getData = () => {
  const arrData = []
  onSnapshot(collection(db, 'reservations'), (snapshot) => {
    snapshot.docs.forEach((item) => {
      arrData.push({
        ...item.data(),
        id: item.id
      })
    })
    setReservations(arrData)
  })
}

  const createReservation = () => {
 

  const newReservation = {
    firstName,
    lastName,
    email,
    phone: Number(phone),
    
    numPeople,
    reservationDate,
    reservationTime
  }
  addDoc(collection(db, 'reservations'), newReservation)
  getData() // actualiza la lista de reservas después de agregar una nueva
}

  return (
    <Modal show={props.isOpen} onHide={props.onClose} 
    {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Reservacion en onichan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Modal content here</p>
        <form className="formulario-base">

       <input 
        type="text"
        required
        id="first-name"
        placeholder="Primer Nombre"
        className="f-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />

        <input 
        type="text"
        required
        id="last-name"
        placeholder="Apellido"
        className="l-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />

       <div className="tel-mail"> 
       <PhoneInput
        defaultCountry="mx"
        //fieldName={props.name}
        value={phone}
        onChange={setPhone}
        //containerClassName="intl-tel-input"
         
        inputClassName="form-control"
        placeholder="Numero celular"
       />

   
      
        <input
        required pattern="\S+@\S+\.\S+"
        type="email" // establece el tipo de input como teléfono
        id="e-mail"
        name="email"
        placeholder="Email"
        className="e-mail" // agrega una clase al input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
  </div>

<div className="fecha-reserva">
    <select className="num-p"
     value={numPeople}
     onChange={(e) => setNumPeople(e.target.value)}
    >
      <option value="op1">1 persona</option>
      <option value="op2">2 personas</option>
      <option value="op3">3 personas</option>
      <option value="op4">4 personas</option>
      <option value="op5">5 personas</option>
    </select>
    
    
  <> 
      <button className="dia-mes" onClick={handleClick}>
        {format(startDate, "dd MMMM", {locale: es})}
      </button>
      {isOpen && (
        <DatePicker 
        selected={reservationDate} 
        onChange={handleChange} 
        inline
        locale={es}
        />
      )}
    </>
  

  <select 
    value={reservationTime}
    onChange={(e) => setReservationTime(e.target.value)}
    >
    <option>1:00 pm</option>
    <option>1:30 pm</option>
    <option>2:00 pm</option>
    <option>2:30 pm</option>
    <option>3:00 pm</option>
    <option>3:30 pm</option>
  </select> 
  

  <Button variant="outline-danger">Danger</Button>{' '}
    
</div>

   <div className="check" >
    <label htmlFor="terms">Acepto los términos y condiciones</label>
    <input type="checkbox" id="terms" />
  </div>
    
</form>

    </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => createReservation()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


function Foot(props) {
  return(
    <footer>
      Bienvenido a nuestro sitio web. Los siguientes términos y condiciones (en adelante, los "Términos") rigen su acceso y uso de nuestro sitio web, incluidos todos los servicios ofrecidos en o a través del sitio (en adelante, los "Servicios"). Al acceder o utilizar el sitio web y los servicios, usted acepta estar sujeto a estos Términos.

    </footer>
  );
}

export { Elhtml, Min, Nodal, Foot };
