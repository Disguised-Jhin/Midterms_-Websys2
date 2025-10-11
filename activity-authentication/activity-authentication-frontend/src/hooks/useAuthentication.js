export function UseAuthentication() {
  async function login(username, password) {
    // complete function here
      const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });    
  }

  
  async function logout() {
    // complete function here
  }

  return {
    login,
    logout,
  };
}