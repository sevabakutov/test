declare global {
  interface Window {
      Telegram: any; 
  }
}

const tg = window.Telegram.WebApp;

export function useTelegram() {
    return {
        tg,
    }
}


// export const login = async (initData) => {
//     console.log('login function beginign')
//     console.log(tg.initData)
//     const response = await fetch(back_end_url + 'api/v1/login/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ initData }),
//     });
  
//     const data = await response.json();
  
//     if (response.ok) {
//       console.log('User logged in successfully');
//     } else {
//       console.error('Login failed', data);
//       throw Error('Login failed');
//     }
//     console.log('login function ending')
// };
  
  // Получение защищенных данных
// export const fetchProtectedData = async () => {
//     console.log('fetchProtectedData function beginign')
//     const token = localStorage.getItem('access_token');
  
//     const response = await fetch(back_end_url + 'api/protected/', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
  
//     const data = await response.json();
  
//     if (response.ok) {
//       console.log('Protected data:', data);
//     } else {
//       console.error('Failed to fetch protected data', data);
//       if (response.status === 401) {
//         console.log('Attempting to refresh token');
//         await refreshToken();
//         await fetchProtectedData();
//       }
//     }
// };

// export const refreshToken = async () => {
//     const refresh_token = localStorage.getItem('refresh_token');
  
//     const response = await fetch(back_end_url + 'api/token/refresh/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refresh: refresh_token }),
//     });
  
//     const data = await response.json();
  
//     if (response.ok) {
//       localStorage.setItem('access_token', data.access);
//       console.log('Token refreshed successfully');
//     } else {
//       console.error('Failed to refresh token', data);
//       logout();
//     }
// };
  
//   // Проверка наличия токена перед отправкой запроса
// export const checkTokenAndFetchData = async () => {
//     const token = localStorage.getItem('access_token');
    
//     if (token) {
//       await fetchProtectedData();
//     } else {
//       throw Error('Что-то пошло не так')
//     }
// };
  
  // Логаут пользователя
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('User logged out');
};