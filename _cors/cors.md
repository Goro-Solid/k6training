## CORS (Cross-origin resource sharing)

- Domy�lnie ��dania, o za�adowanie w przegl�darce zasob�w pochodz�cych z innej strony ni� ta, z kt�rej pobrali�my �r�d�o strony s� blokowane (same origin policy). 
- Zapobiega to pewnym rodzajom ataku, w kt�rych strona kt�rej nie kontrolujemy mo�e zawiera� "niebezpieczny kod javscript", kt�ry za�adujemy do przegl�darki i w ten spos�b atakuj�cy b�dzie mia� dost�p do danych poprzez DOM w przegl�darce.
- W prawdziwym zyciu cz�sto jednak chcemy komunikowa� si� do innych domen np. API/backend mo�e by� na zupe�nie innym serwerze ni� frontend.
 - Cross-origin resource sharing (CORS) jest mechanizem, kt�ry pozwala na wysy�anie ��da� i �adawanie zasob�w z/do domen innych ni� ta, z kt�rej pochodzi �r�d�o strony.


Wi�kosz�� ��da� "cross-origin" jest blokowanych w przegl�darkach ze wzgl�du na same-origin security policy. 

>In computing, the same-origin policy (sometimes abbreviated as SOP) is an important concept in the web application security model. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same origin. An origin is defined as a combination of URI scheme, host name, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.
>
https://en.wikipedia.org/wiki/Same-origin_policy

CORS definiuje spos�b dla przegl�darki i serwera, kt�ry pozwala podj�� decyzj� czy ��danie cross-origin jest bezpieczne.
Do realizacji tego procesu komunikacja zostaje wzbogacona o odpowiednie headery (Origin i Access-Control-Allow-Origin).

### Przyk�ad ��dania Cross-origin

1. Otwieramy stron� HTML z http://www.example.com , kt�ra zawiera kod javascript:

```
GET http://www.example.com ->
    -> GET /index.html
    -> GET /script.js
```
Naszym 'Origin' jest w tym przypadku http://www.example.com


2. Nast�pnie skrypt **script.js** wysy�a ��danie z naszej przegl�darki do **service.example.com**, jest ono Cross-Origin bo  http://www.example.com != service.example.com
```powershell
    GET  / HTTP/1.1
    Host: service.example.com
    Origin: http://www.example.com

```


3. Serwer **service.example.com** mo�e zezwoli� lub nie na tak� komunikacj�:

    - Je�li serwer **service.example.com** pozwala na po��czenie ze wszystkich domen (Origin�w), wysy�a odpowied� i dodaje nag��wek   
        ```powershell
        HTTTP/1.1 200 OK 
        Access-Control-Allow-Origin: *
      
        (..body..)
      ```

   - Je�li serwer **service.example.com** pozwala na po��czenie z tego Originu, wysy�a odpowied� i dodaje nag��wek
   
   ```powershell
       HTTTP/1.1 200 OK 
       Access-Control-Allow-Origin: http://www.example.com
     
       (..body..)
        
    ```
        
    - Je�li serwer **service.example.com** nie pozwala na po��czenie z tego Originu, wysy�a kod b��du

    
> Access-Control-Allow-Origin: * - jest to ustawienie odpowiednie dla publicznych API, og�lnie dost�pmnych obrazk�w czy font�w

Jak wida� to serwer decyduje o tym na co zezwala klientom (originom) a rol� przegl�darki jest respektowanie tych zasad i np. nie wysy�anie danych tam gdzie nie zostan� one zaaakceptowane. Mimo to jak wida� ��danie zosta�o wys�ane ...  

### preflight

.., �eby by�o odrobin� bezpieczniej w nowoczesnych przegl�darkach dla pewnych typ�w ��da� Cross-Origin gdzie potencjalnie modyfikowane/przesy�ane mog� by� dane u�ytkownika, przegl�darka sprawdzi czy ma uprawnienia do wys�ania takiego ��dania, zanim wy�le dane:

   ```powershell
         OPTIONS / HTTP/1.1.
         Host: service.example.com
         Origin: http://www.example.com
         Access-Control-Request-Method: PUT
```
Je�li serwer **service.example.com** akceptuje metod� PUT z Originu **http://www.example.com** odpowie

```powershell
        HTTTP/1.1 204 No Content 
        Access-Control-Allow-Origin: http://www.example.com
        Access-Control-Allow-Methods: PUT, DELETE

```