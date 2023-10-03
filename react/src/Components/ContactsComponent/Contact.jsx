import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <main>
      <div id="developers" className="container-fluid">
        <div className="card" style={{ width: '20rem' }}>
          <img src="/img/natalie.png" className="card-img-top" alt="Natalie profile" />
          <div className="card-body">
            <h5 className="card-title">Natalie Hernandez</h5>
            <p className="card-text">I'm a dedicated learner diving into front-end and back-end development. Mastered HTML, CSS, JavaScript; now delving into back-end. Excited for the journey ahead!</p>
          </div>
          <ul className="list-group list-group-light list-group-small">
            <li className="list-group-item px-4">Full Stack Web Developer</li>
            <li className="list-group-item px-4">Get in touch with me here <a href="https://www.linkedin.com/in/natalie-hernandez-hvb/" className="card-link"><img id="linkedin" src="/img/linkedin.png" alt="LinkedIn" /></a></li>
          </ul>
        </div>

        <div className="card" style={{ width: '20rem' }}>
          <img src="/img/Burhan.jpg" className="card-img-top" alt="Chicago Skyscrapers" />
          <div className="card-body">
            <h5 className="card-title">Ahmet Burhan Solmaz</h5>
            <p className="card-text">Full-stack web developer and graphic designer, transitioned from refugee to coding enthusiast in the Netherlands. Proficient in HTML, CSS, JavaScript, and eager to tackle new challenges in web development.</p>
          </div>
          <ul className="list-group list-group-light list-group-small">
            <li className="list-group-item px-4">Full Stack Developer and Graphic Designer</li>
            <li className="list-group-item px-4">Get in touch with me here <a href="https://www.linkedin.com/in/ahmet-burhan-solmaz/" className="card-link"><img id="linkedin" src="/img/linkedin.png" alt="LinkedIn" /></a></li>
          </ul>
        </div>
      </div>

      <section className="pb-5 pt-0">
        <div className="container">
          <div className="row text-center justify-content-center pt-5">
            <div className="col-12 col-md-7">
              <h1>Contact Us</h1>
            </div>
          </div>

          <div className="row justify-content-center pt-4">
            <div className="col-12 col-md-7">
              <form>
                <div className="row">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Email" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <input type="email" className="form-control" placeholder="Subject" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <textarea className="form-control" name="message" rows="3" placeholder="How can we help?" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-outline-light mb-4">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row-100"></div>
        </div>
        <div className="container-fluid p-0 pb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2233.125794425867!2d4.314865660059238!3d52.076466376897905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7224b6b57b7%3A0xba7d3b4948520d87!2sSpui%2C%20Den%20Haag!5e0!3m2!1sru!2snl!4v1694988506501!5m2!1sru!2snl" width="100%" height="300" frameBorder="0" style={{ border: '0' }} allowFullScreen="" title="Google Maps"></iframe>
        </div>
      </section>
    </main>
  );
}

export default Contact;
