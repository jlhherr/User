# Aplicación de Música

Este proyecto es una aplicación de música construida con React y utiliza la API proporcionada para manejar canciones, perfiles de usuario y funcionalidades relacionadas. A continuación se detalla cómo configurar, ejecutar y comprender el proyecto.

## Índice

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
- [Cómo Probar la Aplicación](#cómo-probar-la-aplicación)
- [Contribuciones](#contribuciones)

## Características

- **Inicio de Sesión**: Permite a los usuarios iniciar sesión en la aplicación.
- **Perfil de Usuario**: Los usuarios pueden ver y actualizar su perfil.
- **Listas de Canciones**: Los usuarios pueden ver una lista de canciones con opciones para agregar, actualizar y eliminar canciones.
- **Reproductor de Música**: Incluye un reproductor de música integrado.
- **Modales**: Uso de modales para agregar, actualizar y eliminar canciones.

## Tecnologías Utilizadas

- **React**: Librería para construir la interfaz de usuario.
- **Bulma**: Framework de CSS para el diseño y la estilización.
- **Vite**: Herramienta de construcción y desarrollo rápido.
- **React Router DOM**: Enrutamiento para navegación dentro de la aplicación.
- **Context API**: Gestión del estado global (tema y autenticación).
- **Fetch API**: Comunicación con la API externa.

## Configuración del Proyecto

1. **Clonar el Repositorio**

    ```bash
    git clone https://github.com/tu_usuario/nombre_del_repositorio.git
    cd nombre_del_repositorio
    ```

2. **Instalar Dependencias**

    Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, instala las dependencias del proyecto.

    ```bash
    npm install
    ```

3. **Configurar Variables de Entorno**

    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```env
    VITE_API_BASE_URL=https://sandbox.academiadevelopers.com
    ```

4. **Ejecutar el Proyecto**

    Para iniciar el servidor de desarrollo:

    
    npm run dev
   

## Estructura del Proyecto

- **`src/`**: Contiene todo el código fuente de la aplicación.
  - **`components/`**: Componentes reutilizables de la aplicación.
    - **`Navbar.js`**: Barra de navegación superior.
    - **`FooterBar.js`**: Barra de pie de página.
    - **`HomePage.js`**: Página principal.
    - **`SongCard.js`**: Componente para mostrar cada canción.
    - **`UpdateSongModal.js`**: Modal para actualizar canciones.
    - **`AddSongModal.js`**: Modal para agregar nuevas canciones.
    - **`DeleteSongModal.js`**: Modal para eliminar canciones.
    - **`Profile.js`**: Componente para mostrar y actualizar el perfil del usuario.
  - **`contexts/`**: Contiene los contextos de la aplicación.
    - **`AuthContext.js`**: Contexto para la autenticación del usuario.
    - **`ThemeContext.js`**: Contexto para el tema de la aplicación.
  - **`hooks/`**: Hooks personalizados.
    - **`useFetch.js`**: Hook para realizar solicitudes HTTP.
  - **`App.js`**: Componente principal que configura el enrutamiento.
  - **`index.js`**: Punto de entrada para la aplicación React.

## Componentes Principales

- **`HomePage`**: Página de bienvenida que presenta la aplicación y permite la navegación.
- **`SongCard`**: Muestra la información de una canción y proporciona botones para agregar, actualizar o eliminar la canción.
- **`Profile`**: Muestra y permite actualizar la información del perfil del usuario.
- **`DeleteSongModal`, `UpdateSongModal`, `AddSongModal`**: Modales para manejar la adición, actualización y eliminación de canciones.

## Cómo Ejecutar el Proyecto

1. **Instalar Dependencias**: Sigue los pasos en la sección de configuración del proyecto.
2. **Ejecutar la Aplicación**: Usa `npm run dev` para iniciar el servidor de desarrollo y accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Cómo Probar la Aplicación

1. **Pruebas Manuales**:
   - Inicia sesión con un usuario válido.
   - Navega a las páginas principales y prueba las funcionalidades de agregar, actualizar y eliminar canciones.
   - Verifica que el perfil del usuario se muestre correctamente y que los cambios se guarden.

2. **Pruebas Unitarias y de Integración**:
  
## Contribuciones

Si deseas contribuir al proyecto, sigue estos pasos:

1. **Fork el Repositorio**.
2. **Crea una Rama para tu Funcionalidad**: `git checkout -b mi-nueva-funcionalidad`.
3. **Haz tus Cambios y Pruebas**.
4. **Envía un Pull Request** con una descripción detallada de los cambios.

¡Gracias por tu interés en contribuir!

