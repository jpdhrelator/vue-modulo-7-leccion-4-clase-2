# 🧪 Actividad Práctica: Testing de Galería de Productos (Mocks y Stubs)

En esta actividad, pondrás en práctica lo aprendido sobre **Mocks** y **Stubs** en Vue 3. Deberás desarrollar un componente que consume un servicio de productos y renderiza tarjetas individuales para cada uno.

## 📋 Servicio a Utilizar
Crea un archivo llamado `src/services/productService.js` y copia el siguiente código:

```javascript
import axios from 'axios'

export const productService = {
  /**
   * Obtiene la lista de productos desde la API
   */
  async getProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products?limit=5')
      return response.data.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      }))
    } catch (error) {
      throw new Error('No se pudieron cargar los productos')
    }
  }
}
```

---

## 🎯 El Desafío

Tu objetivo es crear el componente `ProductGallery.vue` y asegurar su correcto funcionamiento mediante tests unitarios, aislando las dependencias externas.

### 1. Implementación del Componente (`ProductGallery.vue`)
El componente debe seguir estas reglas:
1. **Carga de Datos:** Al montarse, debe llamar a `productService.getProducts()`.
2. **Estado de Carga:** Mientras espera la respuesta, debe mostrar un elemento con el texto `"Obteniendo catálogo..."`.
3. **Renderizado:** Una vez recibidos los productos, debe iterar sobre ellos y utilizar un componente llamado **`ProductCard`** (debes crearlo o simular su existencia) pasándole las props necesarias (`title`, `price`, `image`).
4. **Manejo de Errores:** Si el servicio falla, debe mostrar el mensaje: `"Error: Catálogo no disponible"`.

### 2. Implementación de los Tests (`ProductGallery.spec.js`)
Debes escribir los siguientes casos de prueba en `src/components/productGallery/ProductGallery.spec.js`:

#### **Escenario 1: Éxito en la Carga (Uso de Mocks)**
- **Meta:** Verificar que los productos se muestran correctamente sin llamar a la API real.
- **Pistas:**
    - Usa `vi.mock()` para el path del servicio.
    - Define un set de productos ficticios (mínimo 3).
    - Asegúrate de usar `flushPromises()` para esperar a que se resuelva la promesa del servicio.
    - Verifica que los títulos de los productos mockeados existan en el DOM.

#### **Escenario 2: Aislamiento de Componentes (Uso de Stubs)**
- **Meta:** Testear la galería sin renderizar la lógica interna de `ProductCard`.
- **Pistas:**
    - Configura un **Stub** para `ProductCard` dentro de las opciones de `mount`.
    - Comprueba que el componente stubbed se repita tantas veces como productos haya en tu mock.

#### **Escenario 3: Fallo del Servicio**
- **Meta:** Confirmar que el componente informa al usuario cuando hay un error.
- **Pistas:**
    - Fuerza al mock de `getProducts` a rechazar la promesa (`mockRejectedValue`).
    - Valida que el mensaje de error específico aparezca en la pantalla.

---

## ✅ Criterios de Aceptación
1. **Cero Peticiones Reales:** El test debe pasar satisfactoriamente sin conexión a internet (comprobado por el mock).
2. **Independencia de UI:** El test de la galería no debe fallar si el componente `ProductCard` tiene errores internos (gracias al stub).
3. **Cobertura de Estados:** Se deben validar los tres estados: Carga (Loading), Éxito (Success) y Error.
4. **Sintaxis Moderna:** Uso de `script setup` y `vitest`.

¡A darle átomos! 🚀
