import { NUM_STARS } from '../utils/constants.js';
import Star from './Star.js';
import CometTrail from './CometTrail.js';

/**
 * @class SkyRenderer
 * @description Clase principal que maneja la renderización del cielo estrellado y el cometa
 */
class SkyRenderer {
    /**
     * @constructor
     * @param {string} canvasId - ID del elemento canvas en el DOM
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = NUM_STARS; // Número de estrellas a renderizar
        this.cometTrail = new CometTrail(this.canvas);
        this.lastRender = 0;
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.init();
    }

    /**
     * @description Inicializa el canvas y comienza el ciclo de animación
     * @private
     */
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createStars();
        requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * @description Genera un nuevo conjunto de estrellas con posiciones aleatorias
     * @private
     */
    createStars() {
        this.stars = []; // Limpiar array antes de crear nuevas estrellas
        for (let i = 0; i < this.numStars; i++) {
            const star = new Star(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                Math.random() * 0.6 + 0.2 // Tamaño entre 0.2 y 0.8
            );
            this.stars.push(star);
        }
        // Asegurarnos de que el array de estrellas no sea null
        if (this.stars.length > 0) {
            this.cometTrail.setStars(this.stars);
        }
    }

    /**
     * @description Ciclo principal de animación que actualiza y renderiza todos los elementos
     * @param {number} timestamp - Marca de tiempo actual proporcionada por requestAnimationFrame
     * @private
     */
    animate(timestamp) {
        requestAnimationFrame(this.animate.bind(this));

        if (!this.lastRender) this.lastRender = timestamp;
        const elapsed = timestamp - this.lastRender;

        if (elapsed > this.fpsInterval) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.context.globalCompositeOperation = 'lighter';
            this.stars.forEach(star => {
                if (star.isVisible(this.canvas)) {
                    star.update();
                    star.draw(this.context);
                }
            });

            // Pasar el timestamp al método draw del cometa
            this.cometTrail.draw(timestamp);
            
            this.context.globalCompositeOperation = 'source-over';
            this.lastRender = timestamp - (elapsed % this.fpsInterval);
        }
    }
}

export default SkyRenderer;