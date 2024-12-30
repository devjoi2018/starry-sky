import TentacleSystem from './TentacleSystem.js';

/**
 * @class CometTrail
 * @description Maneja la representación y comportamiento de un cometa interactivo con
 * movimiento autónomo y respuesta a eventos del mouse
 */
class CometTrail {
    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - Canvas de renderización
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Asegurar posiciones iniciales válidas
        this.currentX = canvas.width / 2 || 0;
        this.currentY = canvas.height / 2 || 0;
        this.targetX = this.currentX;
        this.targetY = this.currentY;
        
        // Configuración de la luz
        this.lightSize = 20;
        this.glowSize = 40;
        this.smoothingFactor = 0.15;

        // Configuración del brillo
        this.colors = {
            core: 'rgba(255, 255, 255, 1)',
            glow: 'rgba(135, 206, 235, 0.8)',
            outer: 'rgba(135, 206, 235, 0)'
        };

        this.tentacleSystem = new TentacleSystem(10, 300);
        this.stars = []; // Añadir esta línea

        // Configuración del movimiento autónomo
        this.lastMouseMoveTime = Date.now();
        this.mouseIdleThreshold = 1000; // 1 segundo sin movimiento del mouse
        this.autonomousMode = false;
        this.autonomousTarget = this.generateNewTarget();
        this.pathProgress = 0;
        this.pathDuration = 3000; // 3 segundos por movimiento
        this.lastPathUpdate = Date.now();

        this.setupEventListeners();
    }

    /**
     * @param {Array<Star>} stars - Colección de estrellas para interacción
     */
    setStars(stars) {
        this.stars = stars;
        this.tentacleSystem.setStars(stars);
    }

    /**
     * @returns {{x: number, y: number, startTime: number}} Coordenadas del nuevo objetivo
     * @private
     */
    generateNewTarget() {
        const padding = 100;
        return {
            x: Math.max(padding, Math.min(this.canvas.width - padding, 
                padding + Math.random() * (this.canvas.width - padding * 2))),
            y: Math.max(padding, Math.min(this.canvas.height - padding, 
                padding + Math.random() * (this.canvas.height - padding * 2))),
            startTime: Date.now()
        };
    }

    /**
     * @description Configura los event listeners para la interacción del mouse
     * @private
     */
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            this.lastMouseMoveTime = Date.now();
            this.autonomousMode = false;
        });
    }

    /**
     * @description Actualiza la posición del cometa en modo autónomo
     * @private
     */
    updateAutonomousMovement() {
        const now = Date.now();
        
        // Verificar si debemos entrar en modo autónomo
        if (!this.autonomousMode && now - this.lastMouseMoveTime > this.mouseIdleThreshold) {
            this.autonomousMode = true;
            this.autonomousTarget = this.generateNewTarget();
            this.pathProgress = 0;
        }

        // Actualizar movimiento autónomo
        if (this.autonomousMode) {
            const deltaTime = now - this.lastPathUpdate;
            this.pathProgress += deltaTime / this.pathDuration;
            this.lastPathUpdate = now;

            // Generar nuevo objetivo cuando se completa el camino actual
            if (this.pathProgress >= 1) {
                const previousTarget = {
                    x: this.autonomousTarget.x,
                    y: this.autonomousTarget.y
                };
                this.autonomousTarget = this.generateNewTarget();
                
                // Suavizar la transición entre objetivos
                this.pathProgress = 0;
                this.autonomousTarget.startX = previousTarget.x;
                this.autonomousTarget.startY = previousTarget.y;
            }

            // Calcular posición actual con easing
            const ease = this.easeInOutCubic(this.pathProgress);
            this.targetX = this.autonomousTarget.startX + 
                (this.autonomousTarget.x - this.autonomousTarget.startX) * ease;
            this.targetY = this.autonomousTarget.startY + 
                (this.autonomousTarget.y - this.autonomousTarget.startY) * ease;
        }
    }

    /**
     * @param {number} t - Valor entre 0 y 1 que representa el progreso
     * @returns {number} Valor suavizado entre 0 y 1
     * @description Función de suavizado cúbico para animaciones
     * @private
     */
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /**
     * @description Actualiza la posición actual del cometa basándose en la posición objetivo
     * @private
     */
    updatePosition() {
        this.updateAutonomousMovement();
        
        // Validar que las posiciones sean números finitos
        if (isFinite(this.targetX) && isFinite(this.targetY)) {
            this.currentX += (this.targetX - this.currentX) * this.smoothingFactor;
            this.currentY += (this.targetY - this.currentY) * this.smoothingFactor;
        }

        // Asegurar que las posiciones estén dentro del canvas
        this.currentX = Math.max(0, Math.min(this.canvas.width, this.currentX));
        this.currentY = Math.max(0, Math.min(this.canvas.height, this.currentY));
    }

    /**
     * @description Dibuja el efecto de luz del cometa usando gradientes radiales
     * @private
     */
    drawLight() {
        // Validar posiciones antes de dibujar
        if (!isFinite(this.currentX) || !isFinite(this.currentY)) {
            return;
        }

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';

        try {
            // Capa exterior (glow suave)
            const outerGlow = this.ctx.createRadialGradient(
                this.currentX, this.currentY, 0,
                this.currentX, this.currentY, this.glowSize
            );
            outerGlow.addColorStop(0, this.colors.glow);
            outerGlow.addColorStop(1, this.colors.outer);

            this.ctx.beginPath();
            this.ctx.arc(this.currentX, this.currentY, this.glowSize, 0, Math.PI * 2);
            this.ctx.fillStyle = outerGlow;
            this.ctx.fill();

            // Núcleo brillante
            const coreGlow = this.ctx.createRadialGradient(
                this.currentX, this.currentY, 0,
                this.currentX, this.currentY, this.lightSize
            );
            coreGlow.addColorStop(0, this.colors.core);
            coreGlow.addColorStop(0.5, this.colors.glow);
            coreGlow.addColorStop(1, 'rgba(135, 206, 235, 0.1)');

            this.ctx.beginPath();
            this.ctx.arc(this.currentX, this.currentY, this.lightSize, 0, Math.PI * 2);
            this.ctx.fillStyle = coreGlow;
            this.ctx.fill();
        } catch (error) {
            console.error('Error al dibujar la luz:', error);
        }

        this.ctx.restore();
    }

    /**
     * @description Método principal de renderizado que actualiza y dibuja el cometa y sus efectos
     * @public
     */
    draw() {
        this.updatePosition();
        
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';

        // Dibujar la luz
        this.drawLight();

        // Actualizar y dibujar tentáculos
        const head = { x: this.currentX, y: this.currentY };
        const nearestStars = this.tentacleSystem.findNearestStars(head);
        this.tentacleSystem.drawTentacles(this.ctx, head, nearestStars);

        this.ctx.restore();
    }
}

export default CometTrail;
