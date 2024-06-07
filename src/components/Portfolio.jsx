import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FaGithub, FaLink } from 'react-icons/fa'
import { projects } from '../utils/constants'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Portfolio = () => {
  const projectRefs = useRef([])

  useEffect(() => {
    projectRefs.current.forEach((project, index) => {
      if (project) {
        const animationDirection = index % 2 === 0 ? -100 : 100
        gsap.fromTo(
          project,
          { x: animationDirection, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })
  }, [])

  return (
    <Wrapper id='portfolio'>
      <h1>Portfolio</h1>
      <div className='section'>
        <div className='projects'>
          {projects.map((project, index) => {
            const { id, image, title, github, web } = project
            return (
              <div
                className='project'
                key={id}
                ref={(el) => (projectRefs.current[index] = el)}
              >
                <img src={image} alt={title} />
                <div className='info'>
                  <h4>{title}</h4>
                  <div className='links'>
                    <a href={github} target='_blank'>
                      <FaGithub />
                    </a>
                    <a href={web} target='_blank'>
                      <FaLink />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}
export default Portfolio

const Wrapper = styled.section`
  background-color: var(--grey-800);

  h1 {
    text-align: center;
    padding-bottom: 2rem;
    text-transform: uppercase;
    background: linear-gradient(to right, #ff0000, #fff);
    background-clip: text;
    color: transparent;
  }

  .projects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }

  .project {
    background-color: var(--grey-900);
    color: var(--textColor);
    border: var(--border);
    padding: 1.5rem;
    border-radius: 3px;
    height: auto;
    box-shadow: var(--shadow-4);
    transition: var(--transition);
    opacity: 0;
    &:hover {
      box-shadow: none;
    }

    img {
      max-width: 100%;
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
    }
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .project .info a {
    font-size: 1.5rem;
    color: var(--textColor);
  }

  @media (max-width: 768px) {
    .projects {
      grid-template-columns: repeat(1, 1fr);
      max-width: 90vw;
      margin: 0 auto;
      gap: 2rem;
    }

    .project {
      max-width: var(--fixed-width);
      padding: 1rem;
    }
  }

  @media (max-width: 460px) {
    .projects {
      width: 100%;
    }

    .project .info a {
      font-size: 1.2rem;
    }
  }
`
