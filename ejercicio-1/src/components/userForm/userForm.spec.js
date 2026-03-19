import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserForm from './UserForm.vue'

describe('UserForm.vue - Pruebas de Formulario', () => {
    it('debe mostrar errores cuando se envía el formulario vacío', async () => {
    const wrapper = mount(UserForm)
    
    // Disparamos el submit sin rellenar nada
    await wrapper.find('form').trigger('submit.prevent')

    // Verificamos que los mensajes de error aparezcan
    expect(wrapper.find('[data-test="name-error"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="email-error"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="name-error"]').text()).toBe('El nombre es obligatorio')
    
    // Verificamos que NO se haya emitido el evento
    expect(wrapper.emitted()).not.toHaveProperty('submit-form')
  })
    it('debe actualizar los valores cuando el usuario escribe', async () => {
    const wrapper = mount(UserForm)
    const nameInput = wrapper.find('[data-test="name-input"]')
    
    // Simulamos que el usuario escribe "Juan"
    await nameInput.setValue('Juan')
    
    // Verificamos que el valor interno del input se actualizó
    expect(nameInput.element.value).toBe('Juan')
  })
    it('debe mostrar un error si el email no es válido', async () => {
    const wrapper = mount(UserForm)
    
    await wrapper.find('[data-test="name-input"]').setValue('Juan')
    await wrapper.find('[data-test="email-input"]').setValue('correo-invalido') // Email sin @ ni .
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('[data-test="email-error"]').text()).toBe('Email inválido')
    expect(wrapper.emitted()).not.toHaveProperty('submit-form')
  })
  it('debe emitir los datos del formulario cuando es válido', async () => {
    const wrapper = mount(UserForm)
    
    // 1. Rellenamos datos válidos
    await wrapper.find('[data-test="name-input"]').setValue('Juan')
    await wrapper.find('[data-test="email-input"]').setValue('juan@test.com')
    
    // 2. Enviamos
    await wrapper.find('form').trigger('submit.prevent')

    // 3. Verificamos la emisión y el contenido de los datos
    expect(wrapper.emitted()).toHaveProperty('submit-form')
    
    // Verificamos que el primer argumento del primer evento emitido sea el objeto esperado
    const emittedData = wrapper.emitted('submit-form')[0][0]
    expect(emittedData).toEqual({
      name: 'Juan',
      email: 'juan@test.com'
    })
    
    // Verificamos que los errores NO existan ahora
    expect(wrapper.find('[data-test="name-error"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="email-error"]').exists()).toBe(false)
  })
})