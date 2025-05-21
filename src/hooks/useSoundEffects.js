import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle sound effects for animations
 * @param {Object} options - Configuration options for sound effects
 * @param {boolean} options.enabled - Whether sound is enabled (defaults to true)
 * @returns {Object} Sound utility functions and state
 */
export const useSoundEffects = (options = { enabled: true }) => {
  const soundEnabled = useRef(options.enabled);
  const audioRefs = useRef({});

  // Preload sounds
  useEffect(() => {
    if (soundEnabled.current) {
      const sounds = {
        drop: '/sounds/ingredient-drop.mp3',
        bounce: '/sounds/ingredient-bounce.mp3',
        ready: '/sounds/pizza-ready.mp3',
        click: '/sounds/button-click.mp3'
      };      // Create and preload audio elements with error handling
      Object.entries(sounds).forEach(([key, src]) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.volume = key === 'ready' ? 0.7 : 0.5; // Different volume for different sound types
        
        // Add error handling to prevent 416 errors
        audio.onerror = (e) => {
          console.warn(`Sound file ${src} could not be loaded, disabling sound: ${e.message}`);
          soundEnabled.current = false;
        };
        
        // Only set src after adding error handler
        audio.src = src;
        audioRefs.current[key] = audio;
      });
    }

    // Cleanup function to release audio resources
    return () => {
      if (soundEnabled.current) {
        Object.values(audioRefs.current).forEach(audio => {
          audio.pause();
          audio.src = '';
        });
        audioRefs.current = {};
      }
    };
  }, []);

  /**
   * Play a specific sound effect
   * @param {string} soundType - Type of sound to play ('drop', 'bounce', 'ready', 'click')
   * @param {number} delay - Optional delay in ms before playing the sound
   */  const playSound = (soundType, delay = 0) => {
    if (!soundEnabled.current) return;
    
    const audioElement = audioRefs.current[soundType];
    if (!audioElement) return;
    
    // Function to play with error handling
    const attemptToPlay = () => {
      try {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => {
          console.warn(`Error playing sound ${soundType}:`, e);
          soundEnabled.current = false; // Disable sound on error
        });
      } catch (err) {
        console.warn(`Exception playing sound ${soundType}:`, err);
        soundEnabled.current = false; // Disable sound on error
      }
    };
    
    // If delay specified, schedule sound to play later
    if (delay > 0) {
      setTimeout(attemptToPlay, delay);
    } else {
      attemptToPlay();
    }
  };

  /**
   * Toggle sound effects on/off
   */
  const toggleSound = () => {
    soundEnabled.current = !soundEnabled.current;
    return soundEnabled.current;
  };

  /**
   * Set sound enabled state
   * @param {boolean} enabled - Whether sound should be enabled
   */
  const setSoundEnabled = (enabled) => {
    soundEnabled.current = enabled;
  };

  return {
    playSound,
    toggleSound,
    setSoundEnabled,
    isEnabled: () => soundEnabled.current
  };
};
