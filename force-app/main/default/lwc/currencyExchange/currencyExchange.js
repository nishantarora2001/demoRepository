import { LightningElement , track  , api} from 'lwc';
import currencyExchangeAmountClass1 from '@salesforce/apex/currencyExchangeAmountClass.currencyExchangeAmountClass1';
import httpRequest from '@salesforce/apex/currencyExchangeAmountClass.httpRequest';
export default class CurrencyExchange extends LightningElement {
    @track value = 'inProgress';
    @track amount;
    @api recordId;
    @track currencyConverted;

    get options() {
        return [
            { label: 'Belarusian Ruble', value: 'BYN' },
            { label: 'Afghan Afghani', value: 'AFN' },
            { label: 'Albanian Lek', value: 'ALL' },
            { label: 'Armenian Dram', value: 'AMD' },
            { label: 'Netherlands Antillian Guilder', value: 'ANG' },
            { label: 'Angolan Kwanza', value: 'AOA' },
            { label: 'Indian Rupee', value: 'INR' }
        ];
    }
    connectedCallback(){
    currencyExchangeAmountClass1({recordId:this.recordId})
    .then(data=>{ 
        this.amount=data;
        console.log("AMOUNT OPP::::", this.amount);
    })
}

    handleChange(event){ 
        this.selectedCurrency = event.detail.value;
        console.log("SELECTEDCURRENCY:::::", this.selectedCurrency);
        // currencyExchangeAmountClass1({recordId:this.recordId})
        //  .then(data=>{ 
        //      this.amount=data;
        //      console.log("AMOUNT OPP::::", this.amount);
        //  })
         httpRequest({amount: this.amount , currencyselected: this.selectedCurrency})
         .then(data=>{ 
             this.currencyConverted = data;
             console.log("CONVERTEDCURRENCY::::", this.currencyConverted);
         })


    }
}