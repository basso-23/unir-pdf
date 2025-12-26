# Instrucciones de Desarrollo - Natpty Website

## Comandos Prohibidos

**NUNCA ejecutar los siguientes comandos:**
- `npm run build`
- `npm run dev`

## Estilos CSS - Metodología Obligatoria

### Principio Fundamental
Utilizar **clases CSS personalizadas semánticas** en lugar de utilidades de Tailwind.

### Unidades de Medida

Usar siempre las siguientes unidades según el contexto:

- **rem**: Para todas las medidas generales (padding, margin, font-size, width, height, gap, etc.)
- **dvh**: Para alturas de viewport (dynamic viewport height)
- **vw**: Para anchos de viewport
- **px**: ÚNICAMENTE para las dimensiones de los media queries

### Requisitos de Implementación

1. **Ubicación de Clases**
   - Todas las clases CSS personalizadas deben crearse en `src/app/globals.css`

2. **Nomenclatura Semántica**
   - Patrón obligatorio: `[componente]-[elemento]-[modificador]`
   - Los nombres deben describir la función o posición del componente
   - Ejemplos válidos:
     - `.editor-header`
     - `.settings-card`
     - `.btn-primary`
     - `.nav-menu-item`
     - `.hero-title-large`

3. **Organización del CSS**
   - Agrupar por secciones con comentarios descriptivos
   - Estructura recomendada:
     ```css
     /* ==================== */
     /* Variables Globales   */
     /* ==================== */

     /* ==================== */
     /* Layout Principal     */
     /* ==================== */

     /* ==================== */
     /* Header               */
     /* ==================== */

     /* ==================== */
     /* Sidebar              */
     /* ==================== */

     /* ==================== */
     /* Buttons              */
     /* ==================== */

     /* ==================== */
     /* Cards                */
     /* ==================== */

     /* ==================== */
     /* Media Queries        */
     /* ==================== */
     ```

4. **Variables CSS**
   - Usar CSS custom properties (variables) para colores y valores reutilizables
   - Definir en `:root` para acceso global
   - Ejemplo:
     ```css
     :root {
       --color-primary: #3b82f6;
       --color-secondary: #10b981;
       --spacing-sm: 0.5rem;
       --spacing-md: 1rem;
       --spacing-lg: 1.5rem;
       --radius-sm: 0.25rem;
       --radius-md: 0.5rem;
     }
     ```

### Ejemplo de Conversión

#### Antes (Tailwind - NO USAR)
```jsx
<div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Guardar
  </button>
</div>
```

#### Después (CSS Semántico - USAR)
```jsx
<div className="settings-card">
  <button className="btn-primary">
    Guardar
  </button>
</div>
```

**globals.css:**
```css
/* ==================== */
/* Cards                */
/* ==================== */

.settings-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-background);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.settings-card:hover {
  box-shadow: 0 0.625rem 0.9375rem rgba(0, 0, 0, 0.15);
}

/* ==================== */
/* Buttons              */
/* ==================== */

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}
```

## Media Queries - Reglas de Consolidación

### Principio de No Redundancia

**NUNCA crear media queries duplicados con las mismas dimensiones.**

### Formato Estándar

```css
@media (max-width: 768px) {
  /* Todos los estilos para este breakpoint van aquí */
}
```

### Implementación Correcta

#### Incorrecto (NO HACER)
```css
@media (max-width: 768px) {
  .header-nav {
    flex-direction: column;
  }
}

/* ... más código ... */

@media (max-width: 768px) {
  .settings-card {
    padding: 1rem;
  }
}
```

#### Correcto (HACER)
```css
/* ==================== */
/* Media Queries        */
/* ==================== */

@media (max-width: 768px) {
  .header-nav {
    flex-direction: column;
  }

  .settings-card {
    padding: 1rem;
  }

  /* Todos los demás estilos para tablet */
}

@media (max-width: 480px) {
  /* Todos los estilos para móvil */
}
```

### Breakpoints Recomendados

```css
/* Tablet */
@media (max-width: 768px) { }

/* Móvil */
@media (max-width: 480px) { }

/* Desktop grande */
@media (min-width: 1200px) { }
```

## Iconos - Biblioteca Estándar

### Principio Fundamental
**Todos los iconos del proyecto DEBEN usar la biblioteca `react-icons`.**

### Paquete Específico
- Usar exclusivamente: **`react-icons/hi`** (Heroicons)
- Instalación: `npm install react-icons`

### Implementación

#### Importación
```jsx
import { IconName } from "react-icons/hi";
```

#### Ejemplos de Iconos Comunes
```jsx
// Menú
import { HiMenu } from "react-icons/hi";

// Cerrar
import { HiX } from "react-icons/hi";

// Búsqueda
import { HiSearch } from "react-icons/hi";

// Usuario
import { HiUser } from "react-icons/hi";

// Configuración
import { HiCog } from "react-icons/hi";
```

#### Uso en Componentes
```jsx
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  return (
    <button className="navbar_menu_icon">
      <HiMenu />
    </button>
  );
}
```

### Estilización de Iconos
- Aplicar estilos mediante clases CSS semánticas
- El tamaño se controla con `font-size` en la clase CSS
- El color se controla con `color` en la clase CSS

### Recursos
- Documentación oficial: https://react-icons.github.io/react-icons/
- Catálogo de iconos Heroicons: https://react-icons.github.io/react-icons/icons/hi/

## Documentación

Mantener este archivo actualizado con:
- Nuevas convenciones de nomenclatura específicas del proyecto
- Variables CSS globales añadidas
- Breakpoints personalizados utilizados
- Patrones de componentes recurrentes
