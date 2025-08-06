  const roleSelect = document.querySelector('.role');
  const idLabel = document.getElementById('id-label');

  roleSelect.addEventListener('change', function() {
    if (roleSelect.value === 'Admin') {
      idLabel.textContent = 'Admin ID:';
    } else if (roleSelect.value === 'Staff') {
      idLabel.textContent = 'Staff ID:';
    } else {
      idLabel.textContent = 'ID Number:';
    }
  });
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const regBtn = document.getElementById('reg-btn');
  let errorMsg = document.createElement('div');
  errorMsg.className = 'error-msg';
  errorMsg.style.display = 'none';
  errorMsg.style.color = 'red';
  errorMsg.style.fontWeight = 'bold';
  errorMsg.style.textAlign = 'center';
  errorMsg.style.margin = '10px 0';
  form.parentNode.insertBefore(errorMsg, form.nextSibling);

  const logText = document.querySelector('.log-text');
  const defaultLogText = 'User already registered <a class="login" href="">Log in</a>';

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorMsg.style.display = 'none';
    logText.innerHTML = defaultLogText;
    const roleSelect = document.querySelector('.role');
    const roleValue = roleSelect.value === 'Admin' ? 0 : 1;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const id = document.getElementById('id').value;
    if (localStorage.getItem(id)) {
      logText.innerHTML = '<span style="color:red;font-weight:bold;">ID or Email already registered.</span> <a class="login" href="login.html">Log in</a>';
      form.reset();
      return;
    }
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        try {
          let arr = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(arr) && arr[3] === email) {
            logText.innerHTML = '<span style="color:red;font-weight:bold;">ID or Email already registered.</span> <a class="login" href="login.html">Log in</a>';
            form.reset();
            return;
          }
        } catch {}
      }
    }
    const userArr = [roleValue, password, name, email];
    localStorage.setItem(id, JSON.stringify(userArr));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInName', name);
    window.location.href = 'index.html';
  });
});
