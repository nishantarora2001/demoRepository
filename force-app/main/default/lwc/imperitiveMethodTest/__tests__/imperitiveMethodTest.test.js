import { createElement } from 'lwc';
import ImperitiveMethodTest from 'c/imperitiveMethodTest';
import accountList1 from '@salesforce/apex/getContactForWire.accountList'; 

const mockData = require('./data/getAccountData.json')
console.log('MockData:::', mockData)
jest.mock('@salesforce/apex/getContactForWire.accountList', () => ({ default: jest.fn() }), { virtual: true });

describe('c-imperitive-method-test', () => {
    async function flushPromises() {
        await Promise.resolve();
        return Promise.resolve();
    }
    it('Data To Render',async ()=>{ 
        accountList1.mockResolvedValue(mockData);
        const element = createElement('c-imperitive-method-test',{ 
            is : ImperitiveMethodTest
        })
        console.log('ELEMT::', element);
        document.body.appendChild(element);
        console.log('BODY:::', document.body); 
            const buttonElement = element.shadowRoot.querySelector('.buttonClass');
            buttonElement.click();
            console.log("BUTTONCLISKED")
            console.log('BUTTONELEMENT::', buttonElement);
            await flushPromises();
            const dataGot = element.shadowRoot.querySelectorAll('.nishant');
            console.log("DATAGOT:::", dataGot.length);
            expect(dataGot.length).toBe(mockData.length)

    })
    it('what data show',async ()=>{ 
        accountList1.mockResolvedValue(mockData);
        const element = createElement('c-imperitive-method-test',{ 
            is : ImperitiveMethodTest
        })
        document.body.appendChild(element)
            const buttonElement = element.shadowRoot.querySelector('.buttonClass');
            buttonElement.click();
            console.log("BUTTONCLISKED")
            console.log('BUTTONELEMENT::', buttonElement);
            await flushPromises();
            const dataGot = element.shadowRoot.querySelectorAll('.nishant');
            console.log("DATAGOT:::", dataGot.length);
            console.log("DATANAME::", mockData[0].Name)
            expect(dataGot[0].textContent).toBe(mockData[0].Name)
            
    

    })
});
