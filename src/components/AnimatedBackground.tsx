
import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = [
      [62, 135, 246],  // Blue
      [120, 155, 248], // Light Blue
      [66, 123, 195],  // Medium Blue
      [28, 82, 167]    // Dark Blue
    ];

    const bubbles: {
      x: number;
      y: number;
      radius: number;
      color: number[];
      speed: number;
      alpha: number;
      direction: number;
    }[] = [];

    // Create initial bubbles
    for (let i = 0; i < 15; i++) {
      createBubble();
    }

    function createBubble() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 80 + 40,
        color,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random() * 0.3 + 0.1,
        direction: Math.random() * 2 * Math.PI
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(240, 249, 255, 1)");
      gradient.addColorStop(1, "rgba(210, 228, 245, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and update bubbles
      bubbles.forEach((bubble, index) => {
        // Update position
        bubble.x += Math.cos(bubble.direction) * bubble.speed;
        bubble.y += Math.sin(bubble.direction) * bubble.speed;

        // Change direction slightly for wandering effect
        bubble.direction += (Math.random() - 0.5) * 0.05;

        // Bounce off edges
        if (bubble.x < 0 || bubble.x > width) {
          bubble.direction = Math.PI - bubble.direction;
        }
        if (bubble.y < 0 || bubble.y > height) {
          bubble.direction = -bubble.direction;
        }

        // Draw bubble
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.radius
        );
        gradient.addColorStop(0, `rgba(${bubble.color[0]}, ${bubble.color[1]}, ${bubble.color[2]}, ${bubble.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${bubble.color[0]}, ${bubble.color[1]}, ${bubble.color[2]}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Remove bubbles that are too far off screen
        if (
          bubble.x < -bubble.radius * 2 ||
          bubble.x > width + bubble.radius * 2 ||
          bubble.y < -bubble.radius * 2 ||
          bubble.y > height + bubble.radius * 2
        ) {
          bubbles.splice(index, 1);
          createBubble();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
