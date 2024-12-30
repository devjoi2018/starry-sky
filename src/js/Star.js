/**
 * @class Star
 * @description Representa una estrella en el cielo nocturno con animación de brillo y color
 * @author [Tu Nombre]
 * @version 1.0.0
 */
class Star {
    /**
     * Crea una nueva instancia de estrella
     * @param {number} x - Posición horizontal de la estrella
     * @param {number} y - Posición vertical de la estrella
     * @param {number} size - Tamaño base de la estrella
     */
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseSize = size;
        this.brightness = Math.random();
        this.maxBrightness = 1.0; // Aumentado al máximo
        this.speed = 0.015 + Math.random() * 0.025; // Velocidad ajustada
        this.angle = Math.random() * Math.PI * 2;
        this.color = this.getRandomStarColor();
    }

    /**
     * Genera un color aleatorio para la estrella
     * @returns {string} Color en formato hexadecimal
     * @private
     */
    getRandomStarColor() {
        const colors = [
            '#ffffff', // Blanco puro
            '#fffaf0', // Blanco cálido
            '#f0f8ff', // Blanco azulado
            '#fdf5e6'  // Blanco cremoso
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Dibuja la estrella en el contexto del canvas
     * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
     */
    draw(ctx) {
        // Capa exterior (glow más intenso)
        ctx.shadowBlur = this.size * 25; // Aumentado de 15 a 25
        ctx.shadowColor = `rgba(255, 255, 255, ${this.brightness * 0.5})`; // Aumentado de 0.3 a 0.5
        
        // Capa media (glow principal más brillante)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2); // Aumentado el radio
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3 // Aumentado el radio del gradiente
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`); // Aumentado de 0.8 a 1
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.brightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Núcleo de la estrella más brillante
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness * 1.5})`; // Más brillante
        ctx.fill();
        
        ctx.shadowBlur = 0;
    }

    /**
     * Actualiza el estado de animación de la estrella
     * @description Actualiza el ángulo de animación que controla el brillo
     */
    update() {
        this.angle += this.speed;
        // Rango de brillo más amplio
        this.brightness = 0.3 + (Math.sin(this.angle) + 1) * 0.7;
        this.size = this.baseSize * (0.7 + (Math.sin(this.angle) + 1) * 0.3);
    }

    isVisible(canvas) {
        return this.x >= -this.size && 
               this.x <= canvas.width + this.size &&
               this.y >= -this.size && 
               this.y <= canvas.height + this.size;
    }
}

export default Star;