import { useEffect } from 'react';
import Features from '../components/Features';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Landing Section */}
      <section id="page-header" className="about-header">
        <h2>#KnowUs</h2>
        <p>Lorem, ipsum dolor sit amet consectetur</p>
      </section>

      {/* About Section */}
      <section id="about-head" className="section-p1">
        <img src="/imgs/about/a6.jpg" alt="About us" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, at asperiores. 
            Saepe, ut. Aspernatur eaque illum repellat nihil nisi pariatur blanditiis, neque 
            veritatis illo architecto soluta officia voluptatibus explicabo impedit! Lorem ipsum 
            dolor sit amet consectetur adipisicing elit. Est laborum inventore numquam assumenda 
            deleniti alias asperiores mollitia voluptatum reprehenderit, quasi ex perferendis 
            similique labore blanditiis ab iste veniam ut odit.
          </p>
          <abbr title="Create stunning images with as much or as little control as you like">
            Create stunning images with as much or as little control as you like thanks to a 
            choice of basics and creative modes.
          </abbr>
          <br /><br />
          <div className="marquee-text">
            Create stunning images with as much or as little control as you like thanks to a 
            choice of basics and creative modes.
          </div>
        </div>
      </section>

      {/* App Section */}
      <section id="about-app" className="section-p1">
        <h1>Download Our <a href="#">App</a></h1>
        <div className="video">
          <video autoPlay muted loop>
            <source src="/imgs/about/1.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Features */}
      <Features />
    </>
  );
}