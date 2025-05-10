const Contact = () => {
  return (
    <div className="page contact-page" style={{ backgroundColor: '#fce4ec' }}>
      <h1>Contact Us</h1>
      <div className="contact-container">
        <form className="contact-form">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" placeholder="What's your full name?" />
          
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" />
          
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Write your message for the team here"></textarea>
          
          <button type="submit">Submit</button>
        </form>
        <div className="contact-illustration">
          <img src="/pensil.png" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
