import { GoogleAuth } from 'google-auth-library';
 // Or the equivalent for your environment


const targetAudience = 'https://zero-kare5-837262597425.us-central1.run.app'; // Your Cloud Run service URL


async function makeAuthenticatedRequest() {
  try {
    const googleAuth = new GoogleAuth();
    const client = await googleAuth.getIdTokenClient(targetAudience);
    const idToken = await client.idTokenProvider.fetchIdToken(targetAudience);

    console.log('Generated ID token:', idToken);

    const response = await fetch(
      `${targetAudience}/record/health`, // The API endpoint you want to call
      {
        method: 'GET', // Or 'POST', 'PUT', etc. as needed
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json', // Set as needed for your API
        },
        // body: JSON.stringify(requestBody),  // Include if making a POST, PUT, etc. with a body
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorBody}`); // Handle HTTP errors
    }

    const data = await response; // Parse the response (adjust based on your API's response type)
    console.log('Response data:', data);


  } catch (error) {
    console.error('Error making authenticated request:', error);
  }
}


makeAuthenticatedRequest();

