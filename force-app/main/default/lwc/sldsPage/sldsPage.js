import { LightningElement, api } from 'lwc';

export default class ScopedNotification extends LightningElement {
  @api message = 'It looks as if duplicates exist ...';
}