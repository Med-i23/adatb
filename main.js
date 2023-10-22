document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            alert('Jelszavak nem egyeznek!');
            return;
        }

        const data = { username: formData.get('username'), password };
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Sikeres regisztráció.');
            } else {
                alert('Sikertelen regisztráció. A felhasználó név már foglalt.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = { username: formData.get('username'), password: formData.get('password') };
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Sikeres belépés');
            } else {
                alert('Helyetelen felhasználó név vagy jelszó');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
