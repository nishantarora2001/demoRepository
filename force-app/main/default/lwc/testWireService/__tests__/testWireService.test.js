import { createElement } from 'lwc';
import TestWireService from 'c/testWireService';
import contactList from '@salesforce/apex/getContactForWire.contactList';
//import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';


const mockData  = require('./data/getContactList.json')
// console.log('MOCKDATA:::', mockData);
// const wiredFunc = registerApexTestWireAdapter(contactList)
jest.mock(
    "@salesforce/apex/getContactForWire.contactList",
    () => {
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
        return {
            default: createApexTestWireAdapter(jest.fn()),
        };
    },
    { virtual: true }
);




describe('c-test-wire-service suite',()=>{ 
    // beforeEach(()=>{ 
    //     const element = createElement('c-test-wire-service',{
    //         is : TestWireService
    //     })
    //     document.body.appendChild(element);
    // })
    test("render Data",()=>{ 
        const element = createElement('c-test-wire-service',{
            is : TestWireService
        })
        document.body.appendChild(element);

        contactList.emit(mockData)
        return Promise.resolve().then(()=>{ 
            const elem = element.shadowRoot.querySelectorAll('p');
            console.log('LENGHT ELMENT:::', elem.length)
            console.log('LENGTH MOCKDATA:::', mockData.length)
            expect(elem.length).toBe(mockData.length);
            expect(elem[0].Name).toBe(mockData[0].Name);
      })
    })
})