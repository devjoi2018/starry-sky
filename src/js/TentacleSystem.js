/**
 * Sistema que maneja la generación y renderizado de tentáculos luminosos entre puntos.
 * Crea efectos visuales que conectan un punto central con estrellas cercanas.
 */
export default class TentacleSystem {
    /**
     * Inicializa un nuevo sistema de tentáculos.
     * @param {number} numTentacles - Número máximo de tentáculos a renderizar.
     * @param {number} detectionRadius - Radio de detección para encontrar estrellas cercanas.
     */
    constructor(numTentacles = 10, detectionRadius = 300) {
        this.numTentacles = numTentacles;
        this.detectionRadius = detectionRadius;
        this.stars = [];
        this.waveSpeed = 0.5; // Aumentado para mejor visibilidad
        this.waveAmplitude = 30; // Aumentado para mejor visibilidad
        this.baseWaveOffset = Math.random() * Math.PI * 2;
    }

    /**
     * Establece el array de estrellas que el sistema utilizará.
     * @param {Array<{x: number, y: number}>} stars - Array de objetos estrella con coordenadas x,y.
     */
    setStars(stars) {
        this.stars = stars;
    }

    /**
     * Encuentra las estrellas más cercanas a un punto central.
     * @param {{x: number, y: number}} head - Punto central desde donde se mide la distancia.
     * @returns {Array<{x: number, y: number}>} Array de estrellas más cercanas, limitado por numTentacles.
     */
    findNearestStars(head) {
        if (!head) return [];
        return this.stars
            .map(star => ({
                star,
                distance: Math.hypot(star.x - head.x, star.y - head.y)
            }))
            .filter(item => item.distance <= this.detectionRadius)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, this.numTentacles)
            .map(item => item.star);
    }

    /**
     * Dibuja los tentáculos luminosos entre el punto central y las estrellas cercanas.
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas donde dibujar.
     * @param {{x: number, y: number}} head - Punto central desde donde se originan los tentáculos.
     * @param {Array<{x: number, y: number}>} nearestStars - Array de estrellas destino.
     */
    drawTentacles(ctx, head, nearestStars) {
        if (!head || !nearestStars.length) return;
        
        ctx.save();
        // Modo de composición para efecto luminoso
        ctx.globalCompositeOperation = 'lighter';

        nearestStars.forEach((star, index) => {
            // Cálculo de punto medio con efecto ondulante
            const time = Date.now() * 0.001 + index;
            const midX = (head.x + star.x) / 2 + Math.sin(time * this.waveSpeed) * this.waveAmplitude;
            const midY = (head.y + star.y) / 2 + Math.cos(time * this.waveSpeed) * this.waveAmplitude;

            // Dibujado de curva
            ctx.beginPath();
            ctx.moveTo(head.x, head.y);
            ctx.quadraticCurveTo(midX, midY, star.x, star.y);

            // Configuración del gradiente
            const gradient = ctx.createLinearGradient(head.x, head.y, star.x, star.y);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(135, 206, 235, 0.5)'); // Aumentada la opacidad
            gradient.addColorStop(1, 'rgba(135, 206, 235, 0.1)'); // Añadido algo de opacidad al final

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        ctx.restore();
    }
}
