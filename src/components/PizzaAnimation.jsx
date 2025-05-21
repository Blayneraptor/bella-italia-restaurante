import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

/**
 * Pizza Animation Component
 * A 3D interactive pizza animation with falling ingredients
 * @param {Object} props - Component properties
 * @param {boolean} props.soundEnabled - Whether sound is enabled by default
 */
export const PizzaAnimation = ({ soundEnabled = true }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(soundEnabled);
  const controls = useAnimation();
  const { playSound, toggleSound, isEnabled } = useSoundEffects({ enabled: soundEnabled });
  
  // Reset animation
  const resetAnimation = () => {
    setAnimationKey(prev => prev + 1);
    playSound('click');
    
    // Play ready sound after animation completes
    setTimeout(() => {
      playSound('ready');
    }, 5000);
  };
  
  // Toggle sound
  const handleToggleSound = () => {
    const newState = toggleSound();
    setIsSoundOn(newState);
  };
  
  // Play completion sound when animation cycle ends
  useEffect(() => {
    if (animationKey > 0) {
      setTimeout(() => {
        playSound('ready');
      }, 5000); // Play after all ingredients have fallen
    }
  }, [animationKey]);
  
  return (
    <motion.div
      key={`pizza-container-${animationKey}`}
      initial={{ borderRadius: "0.5rem" }}
      whileInView={{ 
        boxShadow: [
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          "0 0 0 4px rgba(220, 38, 38, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          "0 0 0 0px rgba(220, 38, 38, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        ]
      }}
      transition={{
        boxShadow: {
          duration: 1.5,
          times: [0, 0.5, 1],
          repeat: 1,
          repeatDelay: 4
        }
      }}
      viewport={{ once: false, margin: "-100px" }}
      className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-[#F9F1E1] to-[#F4E9D7]"
    >      {/* Botón de reproducción para reiniciar la animación */}      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 5.5, duration: 1 }
        }}
        className="absolute top-3 right-3 z-40 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetAnimation}
        title="Reproducir animación nuevamente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </motion.div>
      
      {/* Botón para activar/desactivar sonido */}
      {!soundEnabled ? null : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 5.5, duration: 1 }
          }}
          className="absolute top-3 right-16 z-40 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleSound}
          title={isSoundOn ? "Desactivar sonido" : "Activar sonido"}
        >
          {isSoundOn ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </motion.div>
      )}
      
      {/* Efecto de ambiente italiano con partículas*/}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[10%] right-[10%] w-16 h-16 text-primary opacity-30">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>
        <div className="absolute bottom-[15%] left-[8%] w-20 h-20 text-accent opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
        <div className="absolute top-[30%] left-[15%] w-12 h-12 text-primary opacity-25">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <rect x="10" y="10" width="80" height="80" />
          </svg>
        </div>
      </div>
      
      {/* Base de la pizza con efecto 3D mejorado y reacción a los ingredientes */}
      <motion.div 
        key={`pizza-base-${animationKey}`}
        initial={{ scale: 0, rotateX: 45 }}
        animate={{ 
          scale: 1, 
          rotateX: 0,
          rotateZ: [0, -2, 2, -1, 0], // Pequeña oscilación cuando los ingredientes caen
        }}        whileHover={{ 
          scale: 1.05, 
          rotateZ: 5,
          filter: "drop-shadow(0px 25px 20px rgba(0,0,0,0.25))",
          transition: { duration: 0.3 } 
        }}
        whileTap={{
          scale: 0.98,
          rotateZ: -2,
          transition: { type: "spring", stiffness: 300, damping: 10 }
        }}
        transition={{ 
          scale: {
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            delay: 0.3
          },
          rotateX: {
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            delay: 0.3
          },
          rotateZ: {
            times: [0, 0.3, 0.5, 0.7, 1],
            duration: 1.5,
            ease: "easeInOut",
            delay: 2.8, // Comienza la oscilación cuando caen los ingredientes
            repeat: 3,
            repeatDelay: 1.5
          }
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[80%] sm:w-[350px] md:w-[400px] h-auto aspect-square drop-shadow-2xl cursor-pointer"
        style={{ 
          perspective: "1000px", 
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0px 20px 15px rgba(0,0,0,0.15))",
          maxWidth: "400px"
        }}
      >
        {/* Resplandor sutil debajo de la pizza */}
        <motion.div
          className="absolute w-[90%] h-[90%] rounded-full opacity-0 bg-primary/10 blur-xl"
          style={{ 
            bottom: "-5%",
            left: "5%",
            zIndex: -1
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.5] }}
          transition={{
            times: [0, 0.5, 1],
            delay: 0.3,
            duration: 2
          }}
        />

        <img 
          src="/pizza-base.svg" 
          alt="Pizza base" 
          className="w-full h-full object-contain"
        />
        
        {/* Efecto de brillo/sombreado en la pizza para dar sensación de profundidad */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 rounded-full"
          animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
        {/* Ingredientes animados con caída realista - Ahora con más ingredientes */}
      {[
        { 
          name: "Pepperoni 1", 
          src: "/images/ingredients/pepperoni.svg", 
          alt: "Pepperoni",
          size: "w-16 h-16",
          initialX: "10%",
          initialDelay: 0.2,
          duration: 2.5,
          targetY: "40%",
          targetX: "-5%",
          rotationStart: 0,
          rotationEnd: 360,
          scale: 0.7,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))",
          zIndex: 25
        },
        { 
          name: "Queso 1", 
          src: "/images/ingredients/cheese.svg", 
          alt: "Queso",
          size: "w-20 h-20",
          initialX: "35%",
          initialDelay: 0.8, 
          duration: 2.8,
          targetY: "30%",
          targetX: "5%",
          rotationStart: 45,
          rotationEnd: 240,
          scale: 0.8,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.25))",
          zIndex: 22
        },
        { 
          name: "Albahaca 1", 
          src: "/images/ingredients/basil.svg", 
          alt: "Albahaca",
          size: "w-14 h-14",
          initialX: "55%",
          initialDelay: 1.4,
          duration: 3.2,
          targetY: "35%",
          targetX: "15%",
          rotationStart: 90,
          rotationEnd: 180,
          scale: 0.65,
          shadow: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))",
          zIndex: 26
        },
        { 
          name: "Tomate 1", 
          src: "/images/ingredients/tomato.svg", 
          alt: "Tomate",
          size: "w-16 h-16",
          initialX: "20%", 
          initialDelay: 0.5,
          duration: 2.7,
          targetY: "25%",
          targetX: "-8%",
          rotationStart: 120,
          rotationEnd: 300,
          scale: 0.7,
          shadow: "drop-shadow(0px 8px 8px rgba(0,0,0,0.3))",
          zIndex: 24
        },
        { 
          name: "Champiñón 1", 
          src: "/images/ingredients/mushroom.svg", 
          alt: "Champiñón",
          size: "w-14 h-14",
          initialX: "60%",
          initialDelay: 1.1,
          duration: 3.0,
          targetY: "45%",
          targetX: "10%",
          rotationStart: 30,
          rotationEnd: 390,
          scale: 0.6,
          shadow: "drop-shadow(0px 6px 6px rgba(0,0,0,0.25))",
          zIndex: 21
        },
        { 
          name: "Aceituna 1", 
          src: "/images/ingredients/olive.svg", 
          alt: "Aceituna",
          size: "w-10 h-10",
          initialX: "75%",
          initialDelay: 0.9,
          duration: 2.6,
          targetY: "35%",
          targetX: "18%",
          rotationStart: 60,
          rotationEnd: 420,
          scale: 0.5,
          shadow: "drop-shadow(0px 7px 7px rgba(0,0,0,0.35))",
          zIndex: 23
        },
        { 
          name: "Pepperoni 2", 
          src: "/images/ingredients/pepperoni.svg", 
          alt: "Pepperoni",
          size: "w-16 h-16",
          initialX: "45%",
          initialDelay: 1.7,
          duration: 2.9,
          targetY: "38%",
          targetX: "-10%",
          rotationStart: 180,
          rotationEnd: 540,
          scale: 0.7,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))",
          zIndex: 20
        },
        // Nuevos ingredientes añadidos
        { 
          name: "Albahaca 2", 
          src: "/images/ingredients/basil.svg", 
          alt: "Albahaca",
          size: "w-12 h-12",
          initialX: "30%",
          initialDelay: 1.2,
          duration: 2.4,
          targetY: "15%",
          targetX: "20%",
          rotationStart: 45,
          rotationEnd: 210,
          scale: 0.6,
          shadow: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))",
          zIndex: 27
        },
        { 
          name: "Pepperoni 3", 
          src: "/images/ingredients/pepperoni.svg", 
          alt: "Pepperoni",
          size: "w-14 h-14",
          initialX: "65%",
          initialDelay: 0.4,
          duration: 2.6,
          targetY: "28%",
          targetX: "-22%",
          rotationStart: 90,
          rotationEnd: 270,
          scale: 0.65,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))",
          zIndex: 19
        },
        { 
          name: "Queso 2", 
          src: "/images/ingredients/cheese.svg", 
          alt: "Queso",
          size: "w-18 h-18",
          initialX: "15%",
          initialDelay: 1.9,
          duration: 2.7,
          targetY: "22%",
          targetX: "15%",
          rotationStart: 20,
          rotationEnd: 160,
          scale: 0.7,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.25))",
          zIndex: 18
        },
        { 
          name: "Tomate 2", 
          src: "/images/ingredients/tomato.svg", 
          alt: "Tomate",
          size: "w-14 h-14",
          initialX: "80%", 
          initialDelay: 0.6,
          duration: 2.8,
          targetY: "42%",
          targetX: "-15%",
          rotationStart: 150,
          rotationEnd: 330,
          scale: 0.6,
          shadow: "drop-shadow(0px 8px 8px rgba(0,0,0,0.3))",
          zIndex: 17
        },
        { 
          name: "Champiñón 2", 
          src: "/images/ingredients/mushroom.svg", 
          alt: "Champiñón",
          size: "w-12 h-12",
          initialX: "5%",
          initialDelay: 1.3,
          duration: 2.5,
          targetY: "33%",
          targetX: "25%",
          rotationStart: 60,
          rotationEnd: 420,
          scale: 0.55,
          shadow: "drop-shadow(0px 6px 6px rgba(0,0,0,0.25))",
          zIndex: 16
        },
        { 
          name: "Aceituna 2", 
          src: "/images/ingredients/olive.svg", 
          alt: "Aceituna",
          size: "w-9 h-9",
          initialX: "25%",
          initialDelay: 2.0,
          duration: 2.3,
          targetY: "18%",
          targetX: "-18%",
          rotationStart: 30,
          rotationEnd: 390,
          scale: 0.45,
          shadow: "drop-shadow(0px 7px 7px rgba(0,0,0,0.35))",
          zIndex: 15
        },
        { 
          name: "Pepperoni 4", 
          src: "/images/ingredients/pepperoni.svg", 
          alt: "Pepperoni",
          size: "w-15 h-15",
          initialX: "50%",
          initialDelay: 1.5,
          duration: 2.9,
          targetY: "10%",
          targetX: "0",
          rotationStart: 120,
          rotationEnd: 480,
          scale: 0.6,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.3))",
          zIndex: 14
        },
        // Nuevos ingredientes adicionales para una animación más impresionante
        { 
          name: "Albahaca 3", 
          src: "/images/ingredients/basil.svg", 
          alt: "Albahaca",
          size: "w-13 h-13",
          initialX: "40%",
          initialDelay: 2.2,
          duration: 2.5,
          targetY: "32%",
          targetX: "-28%",
          rotationStart: 75,
          rotationEnd: 255,
          scale: 0.58,
          shadow: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))",
          zIndex: 13
        },
        { 
          name: "Champiñón 3", 
          src: "/images/ingredients/mushroom.svg", 
          alt: "Champiñón",
          size: "w-15 h-15",
          initialX: "70%",
          initialDelay: 2.4,
          duration: 2.7,
          targetY: "20%",
          targetX: "30%",
          rotationStart: 180,
          rotationEnd: 540,
          scale: 0.62,
          shadow: "drop-shadow(0px 6px 6px rgba(0,0,0,0.25))",
          zIndex: 12
        },
        { 
          name: "Tomate 3", 
          src: "/images/ingredients/tomato.svg", 
          alt: "Tomate",
          size: "w-13 h-13",
          initialX: "85%", 
          initialDelay: 1.8,
          duration: 2.6,
          targetY: "15%",
          targetX: "-30%",
          rotationStart: 210,
          rotationEnd: 390,
          scale: 0.65,
          shadow: "drop-shadow(0px 8px 8px rgba(0,0,0,0.3))",
          zIndex: 11
        },
        { 
          name: "Queso 3", 
          src: "/images/ingredients/cheese.svg", 
          alt: "Queso",
          size: "w-17 h-17",
          initialX: "25%",
          initialDelay: 2.6,
          duration: 3.0,
          targetY: "50%",
          targetX: "28%",
          rotationStart: 135,
          rotationEnd: 315,
          scale: 0.75,
          shadow: "drop-shadow(0px 5px 5px rgba(0,0,0,0.25))",
          zIndex: 10
        },
        { 
          name: "Aceituna 3", 
          src: "/images/ingredients/olive.svg", 
          alt: "Aceituna",
          size: "w-11 h-11",
          initialX: "60%",
          initialDelay: 2.8,
          duration: 2.4,
          targetY: "45%",
          targetX: "-20%",
          rotationStart: 90,
          rotationEnd: 450,
          scale: 0.5,
          shadow: "drop-shadow(0px 7px 7px rgba(0,0,0,0.35))",
          zIndex: 9
        }
      ].map((ingredient, index) => (
        <motion.div 
          key={`${ingredient.name}-${animationKey}`}
          className={`absolute ${ingredient.size} sm:${ingredient.size.replace('w-', 'w-[calc(').replace('h-', 'h-[calc(') + '_*_1.1)]'} md:${ingredient.size.replace('w-', 'w-[calc(').replace('h-', 'h-[calc(') + '_*_1.2)]'} z-20`}
          style={{ 
            filter: ingredient.shadow,
            left: ingredient.initialX,
            top: "-10%",
            zIndex: ingredient.zIndex
          }}
          initial={{ 
            y: "-100%", 
            x: 0,
            scale: 0.5, 
            rotate: ingredient.rotationStart,
            opacity: 0
          }}
          animate={[
            // Animación de entrada - ingrediente cayendo
            { 
              y: "120%",
              x: ingredient.targetX, 
              rotate: ingredient.rotationEnd,
              scale: ingredient.scale,
              opacity: 1,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 1.2, 
                delay: ingredient.initialDelay,
                duration: ingredient.duration,
                ease: [0.215, 0.61, 0.355, 1], // Curva de bezier para movimiento natural
                onStart: () => {
                  // Play drop sound when ingredient starts falling
                  if (isEnabled()) {
                    playSound('drop', 100);
                  }
                }
              }
            },
            // Animación de "rebote" al aterrizar en la pizza
            { 
              y: ingredient.targetY,
              scale: ingredient.scale * 1.15,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: ingredient.initialDelay + ingredient.duration,
                duration: 0.5,
                onStart: () => {
                  // Play bounce sound when ingredient hits the pizza
                  if (isEnabled()) {
                    playSound('bounce');
                  }
                }
              }
            },
            // Asentamiento final del ingrediente
            { 
              y: ingredient.targetY,
              scale: ingredient.scale,
              transition: { 
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: ingredient.initialDelay + ingredient.duration + 0.5,
                duration: 0.3
              }
            }
          ]}
        >
          {/* Pequeña sombra que aparece cuando el ingrediente aterriza */}
          <motion.div
            className="absolute w-full h-full rounded-full opacity-0"
            style={{ 
              background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)",
              bottom: "-10%",
              left: 0
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.7, 0.3],
              scale: [0.5, 1.2, 1],
              transition: {
                times: [0, 0.2, 1],
                delay: ingredient.initialDelay + ingredient.duration,
                duration: 0.8
              }
            }}
          />

          <img 
            src={ingredient.src}
            alt={ingredient.alt}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
      
      {/* Efectos de texto mejorados con animación 3D y secuencia */}
      <motion.div
        key={`text-bottom-left-${animationKey}`}
        className="absolute bottom-[12%] left-[5%] z-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: 1,
          x: 0,
          transition: { delay: 3.5, duration: 0.8 } // La aparición del texto ocurre después de la caída de ingredientes
        }}
      >
        <div className="text-3xl font-cursive text-primary font-bold drop-shadow-md" style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.2)" }}>
          Ingredientes frescos
        </div>
      </motion.div>
      
      <motion.div
        key={`text-bottom-right-${animationKey}`}
        className="absolute bottom-[5%] right-[5%] z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: 1,
          x: 0,
          transition: { delay: 4, duration: 0.8 }
        }}
      >
        <div className="text-3xl font-cursive text-primary font-bold drop-shadow-md" style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.2)" }}>
          Tradición italiana
        </div>
      </motion.div>
      
      {/* Título principal de la animación */}
      <motion.div
        key={`title-animation-${animationKey}`}
        className="absolute top-[8%] left-[5%] z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          transition: { delay: 4.5, duration: 0.8 }
        }}
      >
        <div className="text-3xl font-serif text-dark font-bold">
          El Arte de la Pizza
        </div>
        <div className="h-1 w-20 bg-primary mt-2"></div>
      </motion.div>
      
      {/* Descripción adicional */}
      <motion.div
        key={`description-animation-${animationKey}`}
        className="absolute top-[50%] right-[50%] z-30 max-w-[180px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          transition: { delay: 4.8, duration: 0.8 }
        }}
      >
        <div className="text-sm text-gray-700 italic">
          "La perfección está en cada detalle, desde la masa hasta el último ingrediente"
        </div>
      </motion.div>
    </motion.div>
  );
};
