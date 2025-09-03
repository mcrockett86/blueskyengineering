
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";


function ParticlesComponent(props: any) {

  const [init, setInit] = useState(false);  

  console.log(`ParticlesComponent state: ${props.particles_state}`);

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
              value: 0.5,
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
    options = getOptions("#0d1117", "#fff200")
  } else if (props.particles_state === 'active') {
    options = getOptions("#0d1117", "#00ff22")
  } else {
    console.log("unsupported props.particles_state!")
  }

  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("particles.js loaded", container);
  };

  if (init) {
    console.log("inside init conditional ...")
    //console.log(options?.particles?.color?.value);  // use optional chaining to not throw error
    return (
      <Particles
        id={props.id}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent
