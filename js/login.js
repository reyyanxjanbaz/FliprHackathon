document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const loginBtn = document.getElementById('login-btn');
  let errorMsg = document.createElement('div');
  errorMsg.className = 'error-msg';
  errorMsg.style.display = 'none';
  errorMsg.style.color = 'red';
  errorMsg.style.fontWeight = 'bold';
  errorMsg.style.textAlign = 'center';
  errorMsg.style.margin = '10px 0';
  form.parentNode.insertBefore(errorMsg, form.nextSibling);

  const logText = document.querySelector('.log-text');
  const defaultLogText = `Don't have an account? <a class="reg" href="register.html">Register</a>`;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorMsg.style.display = 'none';
    logText.innerHTML = defaultLogText;
    const roleSelect = document.querySelector('.role');
    const roleValue = roleSelect.value === 'Admin' ? 0 : 1;
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    let userArr = null;
    try {
      userArr = JSON.parse(localStorage.getItem(id));   
    } catch {}
    if (!userArr || !Array.isArray(userArr)) {
      logText.innerHTML = '<span style="color:red;font-weight:bold;">User not found.</span> <a class="reg" href="register.html">Register</a>';
      form.reset();
      return;
    }
    if (userArr[0] !== roleValue) {
      errorMsg.innerHTML = 'Role does not match.';
      errorMsg.style.display = 'block';
      form.reset();
      return;
    }
    if (userArr[1] !== password) {
      errorMsg.innerHTML = '<span style="color:red;font-weight:bold;">Incorrect password.</span>';
      errorMsg.style.display = 'block';
      form.reset();
      logText.innerHTML = defaultLogText;
      // Re-apply the class to the anchor if needed
      const regAnchor = logText.querySelector('a');
      if (regAnchor) {
        regAnchor.className = 'reg';
      }
      return;
    }
    // Successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInName', userArr[2]);
    window.location.href = 'index.html';
  });
});
