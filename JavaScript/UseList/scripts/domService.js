import { User } from "./user.js";

const drawTableRows = (users) => {
  const tableBody = document.querySelector("#users-table-body");

  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isLogedIn ? "מוחבר" : "מנותק"}</td>
        `;
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = user.isLogedIn ? "התנתקות" : "התחברות";

    logoutBtn.addEventListener("click", () => {
      if (user.isLogedIn) {
        User.logout(user.id);
      } else {
        const passwordInput = prompt("אנא הזן סיסמה על מנת להתחבר");
        if (passwordInput && passwordInput === user.password) {
          User.login(user.id);
        } else {
          alert("הסיסמה לא נכונה");
        }
      }
      drawTableRows(User.usersList);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "מחיקה";
    deleteBtn.addEventListener("click", () => {
      User.removeUser(user.id);
      drawTableRows(User.usersList);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "עריכה";
    editButton.addEventListener("click", () => {
        const newFirstName = prompt("הזן שם פרטי חדש:", user.firstName);
        const newLastName = prompt("הזן שם משפחה חדש:", user.lastName);
        const newEmail = prompt("הזן אימייל חדש:", user.email);
        const newPassword = prompt("הזן סיסמה חדשה:", user.password);

        if (newFirstName && newLastName && newEmail && newPassword) {
            user.firstName = newFirstName;
            user.lastName = newLastName;
            user.email = newEmail;
            user.password = newPassword;

            User.updateUser(user);
            drawTableRows(User.usersList);
        } else {
            alert("יש להכניס ערכים נכונים לכל השדות.");
        }
    });

    row.appendChild(logoutBtn);
    row.appendChild(deleteBtn);
    row.appendChild(editButton);
    tableBody.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  drawTableRows(User.usersList);
});

const registerForm = document.querySelector(".register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = e.target.elements.firstName.value;
  const lastName = e.target.elements.lastName.value;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  const users = User.usersList;

  if (users.find((user) => user.email === email)) {
    alert('משתמש עם כתובת דוא"ל זו כבר קיים');
    return;
  }
  new User(firstName, lastName, email, password);
  e.target.reset();
});

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  const user = User.usersList.find((user) => user.email === email);
  if (user && user.password === password) {
    User.login(user.id);
    e.target.reset();
  } else {
    alert("שם משתמש או סיסמה לא נכונים");
  }
});

export { drawTableRows, registerForm, loginForm };
