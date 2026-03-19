import {mount,flushPromises} from '@vue/test-utils'
import {vi,describe,it, expect} from 'vitest';
import {userService} from '../../services/userService'
import UserProfile from './UserProfile.vue';

vi.mock('../../services/userService',()=>({
    userService:{
        getUser: vi.fn()
    }
}));

describe('UserProfile.vue',()=>{

    it('debe mostrar el nombre del usuario cargado desde la API',async ()=>{

        const fakeUser = { name: 'Juan Pérez', avatarUrl: 'img.jpg' };
        // configuro su comportamiento
        userService.getUser.mockResolvedValue(fakeUser);
       
       
        const wrapper= mount(UserProfile,{
            global:{
                stubs:{
                    UserAvatar: true 
                }
            }
        });      
       

        await flushPromises();

       const elementH1= wrapper.find('[data-test="user-name"]');
       const textoH1=elementH1.text();
       expect(textoH1).toBe("Juan Pérez");        
       expect(userService.getUser).toHaveBeenCalledWith(1);
        
    })

    it('debe mostrar un mensaje de carga inicialmente', () => {
    const wrapper = mount(UserProfile, {
      global: {
        stubs: { UserAvatar: true }
      }
    })
    
    expect(wrapper.find('[data-test="div-loading"]').text()).toContain('Cargando...')
  })
});