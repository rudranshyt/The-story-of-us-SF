public with sharing class getGeminiResponse {
    
    public static string getResponse(string userInput){
        
        Map<String, Object> part = new Map<String, Object>{'text'=>userInput};
        Map<String, Object> content = new Map<String, Object>{'parts' => new List<Object>{part}};
        Map<String, Object> requestBody = new Map<String, Object>{'contents' => new List<Object>{content}};
        
        
        HttpRequest request = new HttpRequest();
        
        request.setEndpoint('callout:Gemini_API/v1beta/models/gemini-2.0-flash:generateContent');
        request.setMethod('POST');
        request.setHeader('Content-type','application/json');
        request.setBody(JSON.serialize(requestBody));


        HttpResponse response = new HttpResponse();
        Http http = new Http();

        
        response = http.send(request);
        
        if(response.getStatusCode()!=200){
            System.debug('API Eror------->');
            throw new AuraHandledException('API Error---->'+Response.getBody());
        }
        else{
            System.debug('Response---->'+response.getBody());
            return response.getBody();
        }
        
        
    }
}