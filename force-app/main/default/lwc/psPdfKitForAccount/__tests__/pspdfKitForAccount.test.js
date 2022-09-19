import { createElement } from 'lwc';
import PsPdfKitForAccount from 'c/pspdfKitForAccount';
import getAttacmentDetails from '@salesforce/apex/PspdfController.getAttacmentDetails';
//import getVisualforceOrigin from '@salesforce/apex/PspdfController.getVisualforceOrigin';


const mockData = require('./data/getAttachmentsData.json');
console.log('MOCKDATA::', mockData);
jest.mock('@salesforce/apex/PspdfController.getAttacmentDetails', () => ({ default: jest.fn() }), { virtual: true });
describe('c-ps-pdf-kit-for-account suite',()=>{ 
    async function flushPromises() {
        await Promise.resolve();
        return Promise.resolve();
    }
    it('data Getting from apex',async ()=>{ 
        const element = createElement('c-ps-pdf-kit-for-account',{ 
            is : PsPdfKitForAccount
        })
        document.body.appendChild(element);
        element.recordId = '0015j00000ZGkCTAA1';
        getAttacmentDetails.mockResolvedValue(mockData);
        console.log("DOCUMENT");
       
        const elementData= element.shadowRoot.querySelectorAll('td')
        await flushPromises();
        expect(elementData.length).toBe(mockData.length);

    })
})