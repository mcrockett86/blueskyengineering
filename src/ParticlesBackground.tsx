
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import './ParticlesBackground.css'

function ParticlesComponent(props: any) {

  const [init, setInit] = useState(false);  

  //console.log(`ParticlesComponent state: ${props.particles_state}`);

  function getOptions(particle_background:string = "#0d1117", particle_color:string = "#ffffff") {
    let state_options: ISourceOptions = {
          background: {
            color: {
              value: particle_background,
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: particle_color,
            },
            links: {
              color: particle_color,
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 100,
            },
            opacity: {
              value: { min: 0, max: 0.5},  // start with 0 opacity, end with 0.5 opacity
              animation: {
                  enable: true,
                  speed: 0.1,    // Adjust speed for animation
                  sync: true,
                  startValue: 'min'
              }
            },
            shape: {
              type: "triangle"
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
      };
    return state_options
  };

  let options: ISourceOptions = getOptions()

  // state management for the particles design
  if (props.particles_state === 'inactive') {
    options = getOptions("#0d1117", "#ffffff")
  } else if (props.particles_state === 'listening') {
    options = getOptions("#0d1117", "#ff9900")
  } else if (props.particles_state === 'active') {
    options = getOptions("#0d1117", "#0cc926")
  } else {
    console.log("unsupported props.particles_state!")
  }

  if (!init) {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);  // or loadFull(engine)
    }).then(() => {
      setInit(true);
    });
  }
  
  if (init) {
    //console.log("inside init conditional ...")
    //console.log(options?.particles?.color?.value);  // use optional chaining to not throw error
    return (
      <Particles
        id={props.id}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent
