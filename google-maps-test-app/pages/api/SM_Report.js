export default async function handler(request, response) {
    const url = `https://us04b.sheltermanager.com/service?method=json_report
                &username=REDACTED
                &password=REDACTED
                &account=oscatr
                &title=test6`
    
    try {
      // await until Promise obj (from fetch) is resolved to Response obj
      const res = await fetch(url, { cache: 'no-store' });
      
      // if HTTP status 200,...,299
      if (res.ok) {
        // Promise converted to Promise of parsed json object literals
        const data = await res.json();
        
        // Send a OK status code and JSON-formatted response body
        response.status(200).json(data);
        
      } else {
        response.status(500).json({error: 'fetch status != [200-299]'});
        
      }
      
    } catch (error) {
      response.status(500).json({error: 'Internal Server Error'});

    }
  }