import { createElement } from 'lwc';
import PsPdfKitFile from 'c/psPdfKitFile';

describe('c-ps-pdf-kit-file', () => {
    async function flushPromises() {
        await Promise.resolve();
        return Promise.resolve();
    }
    
    window.open = jest.fn();
    const target = "/apex/PspdfWebViewer?id=0695j00000AZ6nNAAT";

    it('VF Page Randering',async()=>{ 
        const element = createElement('c-ps-pdf-kit-file',{ 
            is : PsPdfKitFile
        })
        document.body.appendChild(element)
       
        element.recordId = '0695j00000AZ6nNAAT';
        // window.location.href= target;

        const buttonElement = element.shadowRoot.querySelector('.buttonClass');
        buttonElement.click();

        await flushPromises();
        expect(window.open).toHaveBeenCalledWith(target, "_blank");
        
        

    })
});