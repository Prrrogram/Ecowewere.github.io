// Inicialización de variables globales
let users = JSON.parse(localStorage.getItem('users')) || [];

// Función para guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Función para registrar un nuevo usuario
function registerUser() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername && newPassword) {
        if (users.some(user => user.username === newUsername)) {
            document.getElementById('register-error').textContent = 'El usuario ya existe. Por favor, elige otro nombre de usuario.';
            return;
        }

        users.push({ username: newUsername, password: newPassword });
        saveUsers();

        document.getElementById('register-success').textContent = 'Usuario registrado con éxito.';
        document.getElementById('new-username').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('register-error').textContent = '';

        setTimeout(() => {
            showLoginForm();
            document.getElementById('register-success').textContent = '';
        }, 2000);
    } else {
        document.getElementById('register-error').textContent = 'Por favor, completa todos los campos.';
    }
}

// Función para iniciar sesión
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.getElementById("welcome-section").style.display = "block";
        document.getElementById("welcome-username").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("recycle-section").style.display = "block";
        document.getElementById("login-error").textContent = "";
        document.getElementById("register-login-btn").style.display = "none";
    } else {
        document.getElementById("login-error").textContent = "Usuario o contraseña incorrectos.";
        document.getElementById("register-login-btn").style.display = "block";
    }
}

// Función para mostrar el formulario de registro
function showRegisterForm() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

// Función para mostrar el formulario de inicio de sesión
function showLoginForm() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Función para generar campos de entrada de prendas
function generateFields() {
    const quantity = document.getElementById("quantity").value;
    const form = document.getElementById("clothing-form");
    form.innerHTML = '';  // Limpiar los campos anteriores

    for (let i = 1; i <= quantity; i++) {
        const label = document.createElement("label");
        label.innerText = "Prenda " + i;
        form.appendChild(label);

        const select = document.createElement("select");
        const options = ["Seleccione una opcion","Lana", "Algodon", "Poliester", "Jean"];
        options.forEach(function(option) {
            const opt = document.createElement("option");
            opt.value = option.toLowerCase();
            opt.textContent = option;
            select.appendChild(opt);
        });

        form.appendChild(select);
    }

    document.getElementById("recycle-btn").style.display = "block";
}

// Función para mostrar ideas de reciclaje
function showRecycleIdeas() {
    const selects = document.querySelectorAll('#clothing-form select');
    let selectedMaterials = [];

    selects.forEach(select => {
        if (select.value) {
            selectedMaterials.push(select.value.toLowerCase());
        }
    });

    const ideasSection = document.getElementById('ideas-section');
    const ideasDiv = ideasSection.querySelector('.ideas');
    ideasDiv.innerHTML = ''; 

    selectedMaterials.forEach((material) => {
        let imgSrc;

        switch (material) {
            case 'lana':
                imgSrc = 'idea1.jpg';
                break;
            case 'algodon':
                imgSrc = 'idea2.jpg';
                break;
            case 'poliester':
                imgSrc = 'idea3.jpg';
                break;
            case 'jean':
                imgSrc = 'idea4.jpg';
                break;
            default:
                imgSrc = '';
        }

        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Idea para ${material}`;
            img.onclick = () => showMaterialsAndSteps(material);
            ideasDiv.appendChild(img);
        }
    });

    document.getElementById('recycle-section').style.display = 'none';
    ideasSection.style.display = 'block';
}

// Función para mostrar materiales y pasos
function showMaterialsAndSteps(material) {
    const materialsList = document.getElementById('materials-list');
    const stepsList = document.getElementById('steps-list');

    materialsList.innerHTML = '';
    stepsList.innerHTML = '';

    let materials, steps;
    
    switch (material) {
        case 'lana':
            materials = ['Suéter de lana viejo', 'Tijeras de tela', 'Hilo y aguja', 'Botones decorativos (opcional)'];
            steps = ['Lava y seca el suéter de lana', 'Corta las mangas del suéter', 'Cose los bordes cortados para evitar que se deshilachen', 'Decora con botones si lo deseas', 'Tu nueva bufanda de lana está lista'];
            break;
        case 'algodon':
            materials = ['Camiseta de algodón vieja', 'Tijeras', 'Regla', 'Marcador de tela'];
            steps = ['Lava y seca la camiseta', 'Corta la camiseta en tiras anchas', 'Estira las tiras para que se enrollen', 'Trenza las tiras', 'Usa la trenza para crear un tapete circular'];
            break;
        case 'poliester':
            materials = ['Chaqueta de poliéster vieja', 'Tijeras', 'Máquina de coser', 'Cierre'];
            steps = ['Corta la chaqueta en paneles', 'Cose los paneles para formar un bolso', 'Añade un cierre en la parte superior', 'Cose las asas del bolso', 'Tu nuevo bolso de poliéster está listo'];
            break;
        case 'jean':
            materials = ['Pantalón jean viejo', 'Tijeras', 'Lija', 'Tachuelas o lentejuelas (opcional)'];
            steps = ['Corta las piernas del jean a la altura deseada', 'Deshilacha los bordes con la lija', 'Dobla y cose el dobladillo', 'Decora con tachuelas o lentejuelas si lo deseas', 'Tus nuevos shorts de jean están listos'];
            break;
        default:
            materials = ['No se encontraron materiales para este tipo de prenda'];
            steps = ['No se encontraron pasos para este tipo de prenda'];
    }

    materials.forEach(material => {
        const listItem = document.createElement('p');
        listItem.textContent = material;
        materialsList.appendChild(listItem);
    });

    steps.forEach(step => {
        const listItem = document.createElement('p');
        listItem.textContent = step;
        stepsList.appendChild(listItem);
    });

    document.getElementById('ideas-section').style.display = 'none';
    document.getElementById('materials-steps-section').style.display = 'block';
}

// Función para reiniciar el formulario
function resetForm() {
    document.getElementById("ideas-section").style.display = "none";
    document.getElementById("materials-steps-section").style.display = "none";
    document.getElementById("recycle-section").style.display = "block";
    document.getElementById("clothing-form").innerHTML = "";
    document.getElementById("quantity").value = "";
    document.getElementById("recycle-btn").style.display = "none";
}

// Función para togglear el menú
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Función de inicialización
function init() {
    document.getElementById('register-nav-btn').addEventListener('click', showRegisterForm);
    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('recycle-section').style.display = 'none';
    document.getElementById('ideas-section').style.display = 'none';
    document.getElementById('materials-steps-section').style.display = 'none';
    document.getElementById('register-login-btn').style.display = 'none';

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('#sidebar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        });
    });
}

// Evento que se ejecuta cuando se carga la página
window.onload = init;