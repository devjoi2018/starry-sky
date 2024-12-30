/**
 * @fileoverview Punto de entrada principal de la aplicación Starry Sky
 * @version 1.0.0
 */

import SkyRenderer from './SkyRenderer.js';
import AnimationController from './AnimationController.js';

/**
 * @class Main
 * @description Clase principal que inicializa y coordina los componentes de la aplicación
 */
class Main {
    /**
     * @constructor
     * @description Inicializa las instancias necesarias para la aplicación
     */
    constructor() {
        /**
         * @type {SkyRenderer}
         * @description Instancia del renderizador del cielo estrellado
         */
        this.skyRenderer = new SkyRenderer('skyCanvas');

        /**
         * @type {AnimationController}
         * @description Controlador de animaciones
         */
        this.animationController = new AnimationController();
    }

    /**
     * @method init
     * @description Inicializa la aplicación y comienza la animación
     * @public
     */
    init() {
        this.skyRenderer.init();
        this.animationController.start();
    }
}

// Inicialización de la aplicación
const app = new Main();
app.init();

export default Main;