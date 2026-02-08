import StarBorder from '../../components/star-border/StarBorder'
import zcoerLogo from '../../assets/logos/ZCOER-Logo-White.png'
import zealconTitle from '../../assets/logos/Logo-2-white.png'
import './home.css'

function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero__content">
          <button className="hero__logo-btn" onClick={() => window.open('https://zcoer.in/', '_blank')}>
            <img
              src={zcoerLogo}
              alt="ZCOER"
              className="hero__zcoer-logo"
            />
          </button>
          <img
            src={zealconTitle}
            alt="ZEALCON '26"
            className="hero__title"
          />
          <p className="hero__tagline">Where Curiosity Becomes Creation</p>
          <div className="hero__cta">
            <a href="/login" className="hero__cta-link">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about__content">
          <h2 className="about__title">
            <span className="about__title-text">What is</span>
            <img
              src={zealconTitle}
              alt="ZEALCON '26"
              className="about__title-logo"
            />
          </h2>
          <p className="about__description">
            ZEALCON '26 is the annual technical festival of Zeal College of Engineering and Research, Pune.
            It brings together brilliant minds from across the nation to compete, innovate, and celebrate
            the spirit of technology and creativity. From intense coding battles to innovative robotics
            challenges, ZEALCON offers a platform for students to showcase their talents and push the
            boundaries of what's possible.
          </p>
        </div>
        <div className="about__image-wrapper">
          <StarBorder
            as="div"
            color="magenta"
            speed="6s"
            thickness={2}
            borderRadius={32}
            className="about__star-border"
          >
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
              alt="Technical fest event"
              className="about__image"
            />
          </StarBorder>
        </div>
      </section>
    </>
  )
}

export default Home
