document.addEventListener('DOMContentLoaded', function() {
  const headerUser = document.getElementById('header-user');
  // Create popup div if not present
  let userPopup = document.getElementById('user-popup');
  if (!userPopup) {
    userPopup = document.createElement('div');
    userPopup.id = 'user-popup';
    userPopup.className = 'user-popup';
    document.body.appendChild(userPopup);
  }
  function showUserPopup() {
    userPopup.style.display = 'block';
    userPopup.innerHTML = `<p style="color:rgb(0,139,204);font-weight:bold;font-family:'Montserrat',sans-serif;font-size:16px;margin-bottom:16px;">${localStorage.getItem('loggedInName') || ''}</p><button id="signout-btn" style="padding:8px 16px;font-family:'Montserrat',sans-serif;font-size:16px;border-radius:999px;border:none;background-color:rgb(0,139,204);color:rgb(243,251,255);cursor:pointer;">Sign Out</button>`;
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInName');
        window.location.reload();
      });
    }
  }
  function hideUserPopup() {
    userPopup.style.display = 'none';
  }
  if (localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('loggedInName')) {
    headerUser.innerHTML = `<p style="color:rgb(0,139,204);font-weight:bold;font-family:'Montserrat',sans-serif;font-size:16px;margin:0;cursor:pointer;" id="header-name">Welcome, ${localStorage.getItem('loggedInName')}</p>`;
    const headerName = document.getElementById('header-name');
    if (headerName) {
      headerName.addEventListener('click', function(e) {
        e.stopPropagation();
        if (userPopup.style.display === 'block') {
          hideUserPopup();
        } else {
          showUserPopup();
        }
      });
    }
    document.body.addEventListener('click', function(e) {
      if (userPopup.style.display === 'block' && !userPopup.contains(e.target) && e.target.id !== 'header-name') {
        hideUserPopup();
      }
    });
  } else {
    headerUser.innerHTML = `
      <button class="header-btn" id="header-login-btn">Login</button>
      <button class="header-btn" id="header-register-btn">Register</button>
    `;
    userPopup.style.display = 'none';
    const regBtn = document.getElementById('header-register-btn');
    if (regBtn) {
      regBtn.addEventListener('click', function() {
        window.location.href = 'register.html';
      });
    }
    const loginBtn = document.getElementById('header-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', function() {
        window.location.href = 'login.html';
      });
    }
  }
});
