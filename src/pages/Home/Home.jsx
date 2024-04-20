import React, { useEffect, useRef, useState } from 'react';
const Home = () => {

  const [newNumber, setNewNumber] = useState('');
  const [newNumbers, setNewNumbers] = useState('');
  const [contacts, setContacts] = useState([]);
  const textareaRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState('This is current test message, update it below with your message');

  const ContactBox = ({ contact }) => (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:"15px"}}>
      <h3>{contact.number}</h3>
      <a target='_blank' rel="noreferrer" href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(contact.number)}&text=${encodeURIComponent(message)}`}><svg style={{width:"2.5rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552"><defs><linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#57d163"/><stop offset="1" stop-color="#23b33a"/></linearGradient><filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3.531"/></filter></defs><path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#a)"/><path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/><path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"/><path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/><path fill="#fff" fill-rule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/></svg></a>
    </div>
  );

  const changeMessage = (e) => {
    e.preventDefault();
    setMessage(newMessage);
    setNewMessage('')
  }

  const handleAddSingleNumber = (e) => {
    e.preventDefault()
    if (newNumber.trim().length === 10) {
      setContacts([...contacts, { number: `+91${newNumber}` }]);
      setNewNumber('');
    } else {
      window.alert(`Number ${newNumber} is not a valid Indian mobile number`)
    }
  };

  const handleAddMultipleNumber = (e) => {
    e.preventDefault()
    const regex = /^[6-9]\d{9}$/
    let errorfulNumbers = [];
    const numbersArray = newNumbers
      .split(/[\n,]+/) // Split on line breaks and commas
      .map(num => num.trim()) // Remove leading/trailing whitespace
      .map((num, index) => {
        num = num.trim()
        if (!(num.length === 10 && regex.test(num))) {
          window.alert(`Number ${index + 1} is not a valid Indian mobile number: ${num}`)
          errorfulNumbers.push(num)
          return null;
        } else {
          return num;
        }
      }) // Show error for unformatted numbers 
      .filter(num => num != null && num.length === 10 && num.match(regex)); // Remove unformatted numbers
    
    const newContactsArray = numbersArray.map(num => ({ number: `+91${num}` }));
    setContacts([...contacts, ...newContactsArray]);
    
    if(errorfulNumbers.length > 0) {
      setNewNumbers(errorfulNumbers.join('\n'))
      window.alert("Correct the invalid numbers in input and add again")
    } else {
      setNewNumbers('');
    }

  };

  useEffect(() => {
    const textArea = textareaRef.current;
    if(textArea) {
      textArea.rows = Math.max(1, textArea.value.split('\n').length) > 5 ? 5 : Math.max(1, textArea.value.split('\n').length)
    }
  },[newNumbers])

  return (
    <>
    {/* CURRENT MESSAGE */}
    <div style={{padding:"0 0.75rem"}}>
    <h2>Current Message : </h2>
    <p style={{wordWrap:'break-word'}}>{message}</p>
    </div>
    <form className="d-flex" role="search" style={{padding:"0 0.75rem"}} onSubmit={(e) => changeMessage(e)}>
        <input className="form-control me-2" placeholder="New message here" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <button className="btn btn-outline-success" type="submit">Change</button>
      </form>
      <br></br>
      <br></br>

      {/* ADD NUMBERS */}
      <div style={{padding:"0 0.75rem 0.75rem 0.75rem"}}>
    <h2>Add Numbers (Indian only) : </h2>
    <div>Note :</div>
    <div>1. Add number without country code</div>
    <div>2. For multiple numbers separate with comma or enter</div>
    </div>
    <form className="d-flex" role="search" style={{padding:"0 0.75rem"}} onSubmit={(e) => handleAddSingleNumber(e)}>
        <input className="form-control me-2" type='number' maxLength={10} placeholder="Add single number here" value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        <button style={{padding:"0 1.55rem"}} className="btn btn-outline-success" type="submit">Add</button>
      </form>
      <p></p>
      <form className="d-flex" role="search" style={{padding:"0 0.75rem"}} onSubmit={(e) => handleAddMultipleNumber(e)}>
        <textarea ref={textareaRef} className="form-control me-2" rows={1} placeholder="Add multiple number here" value={newNumbers} onChange={(e) => setNewNumbers(e.target.value)}/>
        <button style={{padding:"0 1.55rem"}} className="btn btn-outline-success" type="submit">Add</button>
      </form>
      <br></br>
      <br></br>

      {/* NUMBERS LIST */}
      <h2 style={{padding:"0 0.75rem"}}>Numbers List :</h2>
      {contacts.length <= 0 ? <p style={{padding:"0 0.75rem"}}>Add numbers above to send message</p> : <p style={{padding:"0 0.75rem"}}>Refresh the page to remove newly added contacts</p>}
     {contacts.map(contact => (
      <ContactBox key={contact.number} contact={contact} />
    ))}
<br></br>
      <br></br>
    {/* ABOUT US */}
    <div className='about-us'>
        <h2 style={{padding:"0 0.75rem"}}>Made by AyraTech Solutions ❤️</h2>
        <ul>
          <li>Designed for users who do not want to add people to their contacts and send message directly</li>
          <li>Best for use in marketing and sales</li>
        </ul>
        <p style={{padding:"0 0.75rem"}}>For any suggestions or custom solutions contact at <a style={{textDecoration:"none", }} href="mailto:ayratech@gmail.com">ayratech@gmail.com</a>.</p>
    </div>
    </>
  );
};

export default Home;