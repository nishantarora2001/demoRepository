public class UploadFileClass {
    public static void createContent(){ 
        Contact con = [SELECT Id FROM Contact limit:1];
        System.debug('CON::'+con.Id);
        String sText = 'This is file'+'https//www.priyadarshni.com'+'Nishant Arora';
        System.debug('STEXT::'+sText);
        
    }

}