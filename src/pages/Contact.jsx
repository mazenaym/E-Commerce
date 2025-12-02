import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      id: 1,
      name: 'Jhon Doe',
      img: '/imgs/people/1.png',
      title: 'Senior Marketing Manager',
      phone: '+ 000 123 000 77 88',
      email: 'contact@example.com'
    },
    {
      id: 2,
      name: 'William Smith',
      img: '/imgs/people/2.png',
      title: 'Senior Marketing Manager',
      phone: '+ 000 123 000 77 88',
      email: 'contact@example.com'
    },
    {
      id: 3,
      name: 'Ema Stone',
      img: '/imgs/people/3.png',
      title: 'Senior Marketing Manager',
      phone: '+ 000 123 000 77 88',
      email: 'contact@example.com'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تحط الكود اللي بتبعت البيانات للـ backend
    console.log('Form Data:', formData);
    setSubmitted(true);
    
    // إعادة تعيين الفورم بعد ثانيتين
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      {/* Landing Section */}
      <section id="page-header" className="about-header">
        <h2>#Let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-p1">
        <div className="contact-details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMapLocationDot} />
              <p>56 Glassford Street Glasgow G1 1UL New York</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>contact@example.com</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <p>+012222365/(+91)0123456789</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} />
              <p>10:00 - 18:00, Mon - Sat</p>
            </li>
          </ul>
        </div>
        <div className="map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8089830230138!2d-1.2543668000000001!3d51.754816399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9ef8c485b%3A0xd2ff1883a001afed!2sUniversity%20of%20Oxford!5e0!3m2!1sen!2seg!4v1662352238136!5m2!1sen!2seg" 
            width="600" 
            height="450" 
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Oxford University Map"
          />
        </div>
      </section>

      {/* Form Section */}
      <section id="form-details">
        <form onSubmit={handleSubmit}>
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          
          <button type="submit" className="normal">
            {submitted ? '✓ Sent Successfully!' : 'Submit'}
          </button>
        </form>

        {/* Team Section */}
        <div className="people">
          {team.map((person) => (
            <div key={person.id}>
              <img src={person.img} alt={person.name} />
              <p>
                <span>{person.name}</span>
                <br />
                {person.title}
                <br />
                Phone: {person.phone}
                <br />
                Email: {person.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}