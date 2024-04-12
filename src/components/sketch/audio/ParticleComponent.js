import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import audio from "../../../assets/llanto.wav";

let sound;

const ParticleComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const numParticles = 700;

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const playAudio = () => {
    if (!audioPlaying) {
      sound.play();
      setAudioPlaying(true);
    }
  };

  const stopAudio = () => {
    sound.pause();
    sound.currentTime = 0;
    setAudioPlaying(false);
  };

  const requestAudioPermission = () => {
    if (sound && !audioPermission) {
      sound.play().then(() => {
        setAudioPermission(true);
        stopAudio();
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(850, 650).parent(canvasParentRef);
    p5.frameRate(60);

    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(2, 4),
      });
    }
    setParticles(newParticles);
  };

  const draw = (p5) => {
    p5.background(0);
  
    // Si el audio está reproduciéndose, dibujar las líneas
    if (audioPlaying) {
      // Calcular el centro del canvas
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
  
      // Definir el número de líneas y el ángulo entre cada una
      const numLines = 300;
      const angleIncrement = p5.TWO_PI / numLines;
  
      // Definir el máximo tamaño de las líneas
      const maxLength = p5.dist(0, 0, centerX, centerY);
  
      // Calcular la longitud actual de las líneas
      let lineLength = (sound.currentTime / sound.duration) * maxLength;
  
      // Dibujar líneas rojas desde todos los lados hacia el centro
      p5.stroke(255, 0, 0);
      p5.strokeWeight(2);
      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement;
        const x = centerX + lineLength * p5.cos(angle);
        const y = centerY + lineLength * p5.sin(angle);
        p5.line(centerX, centerY, x, y);
      }
    }
  
    for (const particle of particles) {
      // Calcular la dirección hacia la que se moverá la partícula
      const dx = p5.mouseX - particle.x;
      const dy = p5.mouseY - particle.y;
      const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
      const directionX = dx / distance;
      const directionY = dy / distance;
  
      // Mover la partícula hacia el cursor
      particle.x += directionX * particle.speed;
      particle.y += directionY * particle.speed;
  
      // Dibujar la partícula
      p5.stroke(255, 0, 0, particle.opacity);
      p5.fill(255, 0, 0, particle.opacity);
      p5.ellipse(particle.x, particle.y, particle.size, particle.size);
    }
  
    // Reproducir audio cuando todas las partículas estén cerca del cursor
    const allParticlesClose = particles.every((particle) => {
      const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
      return distance < 50; // Ajusta el valor de 50 según la proximidad deseada
    });
    if (allParticlesClose) {
      playAudio();
    } else {
      stopAudio();
    }
  };

  const openFullscreen = () => {
    const canvas = document.querySelector(".p5Canvas");
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
      canvas.msRequestFullscreen();
    }
  };

  return (
    <div className="sketch">
      <div className="sketch-content">
      {audioPermission ? (
        <>
        <div>
        <button className="button-full-screan" onClick={openFullscreen}>FULLSCREEN</button>
        </div>
        
          <Sketch
            setup={setup}
            draw={draw}
          />
        </>
      ) : (
        <button className="button-permission" onClick={requestAudioPermission}>ALLOW AUDIO</button>
      )}
    </div>
    </div>
  );
};

export default ParticleComponent;
