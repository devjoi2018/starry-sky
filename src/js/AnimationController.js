/**
 * @class AnimationController
 * @description Controlador principal de animaciones que gestiona múltiples animaciones simultáneas
 * @author [Tu Nombre]
 * @version 1.0.0
 */
class AnimationController {
    /**
     * @constructor
     * @description Inicializa el controlador de animaciones
     */
    constructor() {
        /**
         * @type {Array<Object>}
         * @private
         */
        this.animations = [];

        /**
         * @type {boolean}
         * @private
         */
        this.isAnimating = false;
    }

    /**
     * @method start
     * @description Inicia el ciclo de animación
     * @public
     */
    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    /**
     * @method stop
     * @description Detiene todas las animaciones y limpia el array
     * @public
     */
    stop() {
        this.isAnimating = false;
        this.animations = [];
    }

    /**
     * @method addAnimation
     * @description Agrega una nueva animación al controlador
     * @param {Object} animation - Objeto de animación que debe contener un método update()
     * @public
     */
    addAnimation(animation) {
        if (typeof animation.update !== 'function') {
            throw new Error('La animación debe contener un método update()');
        }
        this.animations.push(animation);
    }

    /**
     * @method animate
     * @description Método principal del ciclo de animación
     * @private
     */
    animate() {
        if (!this.isAnimating) return;

        this.animations.forEach(animation => {
            animation.update();
        });

        requestAnimationFrame(this.animate.bind(this));
    }
}

export default AnimationController;