export default async function handler(request, response) {
    
    const envVar = "AIzaSyDnyKn1VeI3lzEIOUdGzSwEPCQolnKJjn0";
    try {
      // Send a OK status code and JSON-formatted response body
      response.status(200).json({envVar});
      
    } catch (error) {
      response.status(500).json({error: 'Environment variable not defined'});

    }
  }