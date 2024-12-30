# Documentación del Proyecto: Cielo Estrellado

## Introducción

Este proyecto es un experimento de aprendizaje diseñado para explorar las capacidades de HTML5 Canvas y animaciones en JavaScript. El objetivo principal fue crear una simulación visual que combina un cielo estrellado interactivo con una criatura espacial procedural, mientras se aprenden conceptos fundamentales como:

- Manipulación del Canvas API
- Programación orientada a objetos en JavaScript
- Sistemas de animación basados en requestAnimationFrame
- Gestión de estados y renderizado eficiente
- Patrones de diseño para aplicaciones web interactivas
- Generación procedural de movimiento
- Interacción basada en eventos del mouse

El resultado es una aplicación web que presenta dos elementos principales:

1. Un cielo nocturno animado con estrellas que parpadean de forma dinámica
2. Una criatura espacial única que se desplaza por el canvas con movimientos procedurales de sus extremidades, simulando una forma de vida alienígena. Esta entidad exhibe dos comportamientos distintos:
   - Movimiento autónomo cuando el cursor del mouse está inmóvil
   - Seguimiento suave del cursor cuando el usuario mueve el mouse

## Requisitos del Sistema

- Navegador web moderno con soporte para Canvas API
- JavaScript habilitado
- Resolución mínima recomendada: 1024x768

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/starry-sky.git
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd starry-sky
   ```
3. Abrir `src/index.html` en un navegador web

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas y archivos:

```
starry-sky
├── src
│   ├── index.html
│   ├── css
│   │   ├── styles.css
│   │   └── animations.css
│   ├── js
│   │   ├── main.js
│   │   ├── Star.js
│   │   ├── SkyRenderer.js
│   │   ├── AnimationController.js
│   │   ├── SpaceCreature.js
│   │   └── ParticleSystem.js
│   └── utils
│       └── constants.js
└── README.md
```

## Clases y Métodos

### 1. `Star.js`

- **Clase:** `Star`
  - **Constructor:**
    ```javascript
    constructor(x, y, size, brightness);
    ```
  - **Propiedades:**
    - `x`: Posición horizontal de la estrella.
    - `y`: Posición vertical de la estrella.
    - `size`: Tamaño de la estrella.
  - **Métodos:**
    - `draw()`: Dibuja la estrella en el lienzo.
    - `animate()`: Aplica la animación de brillo a la estrella.
  - **Métodos Nuevos:**
    - `setBrightness(value)`: Ajusta el brillo de la estrella
    - `update()`: Actualiza el estado de la estrella

### 2. `SkyRenderer.js`

- **Clase:** `SkyRenderer`
  - **Métodos:**
    - `initializeCanvas()`: Inicializa el lienzo para el renderizado.
    - `render(stars)`: Renderiza las estrellas en el cielo.

### 3. `AnimationController.js`

- **Clase:** `AnimationController`
  - **Métodos:**
    - `start()`: Inicia las animaciones de las estrellas.
    - `stop()`: Detiene las animaciones.
    - `update()`: Actualiza el estado de las animaciones.

### 4. `SpaceCreature.js`

- **Clase:** `SpaceCreature`
  - **Constructor:**
    ```javascript
    constructor(x, y, size);
    ```
  - **Métodos:**
    - `draw()`: Renderiza la criatura espacial
    - `update(mouseX, mouseY)`: Actualiza la posición y estado
    - `animateTentacles()`: Controla la animación de las extremidades
    - `followMouse(mouseX, mouseY)`: Gestiona el comportamiento de seguimiento

### 5. `ParticleSystem.js`

- **Clase:** `ParticleSystem`
  - **Constructor:**
    ```javascript
    constructor(maxParticles);
    ```
  - **Métodos:**
    - `emit(x, y)`: Emite partículas desde una posición
    - `update()`: Actualiza el estado de todas las partículas
    - `render()`: Dibuja las partículas en el canvas

### 6. `main.js`

- **Funciones Principales:**
  - `init()`: Inicializa la aplicación
  - `animate()`: Maneja el loop principal de animación
  - `handleResize()`: Gestiona el redimensionamiento del canvas
  - `setupEventListeners()`: Configura los listeners de eventos

## Interactividad y Comportamiento

### Criatura Espacial

- **Movimiento Autónomo:**

  - La criatura se desplaza libremente por el espacio cuando el mouse está quieto
  - Sus extremidades se mueven de forma procedural, simulando un nado espacial
  - El movimiento sigue patrones orgánicos y fluidos

- **Seguimiento del Cursor:**
  - Al mover el mouse, la criatura transiciona suavemente hacia la posición del cursor
  - Las extremidades mantienen su animación procedural durante el seguimiento
  - La velocidad de seguimiento está regulada para mantener un movimiento natural

## Configuración Avanzada

Puedes personalizar el comportamiento modificando las constantes en `utils/constants.js`:

```javascript
{
  MAX_STARS: 200,
  MIN_BRIGHTNESS: 0.3,
  MAX_BRIGHTNESS: 1.0,
  ANIMATION_SPEED: 0.05
}
```

## Ejemplo de Uso

Para utilizar el proyecto, simplemente abre el archivo `index.html` en un navegador. Las estrellas comenzarán a parpadear automáticamente.

## Contribuciones

1. Haz fork del repositorio
2. Crea una rama para tu función: `git checkout -b feature/nueva-funcion`
3. Realiza tus cambios y haz commit: `git commit -m 'Agrega nueva función'`
4. Envía un pull request

### Guía de Estilo

- Usa ESLint con la configuración proporcionada
- Mantén el código documentado usando JSDoc
- Sigue las convenciones de nombres existentes

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
