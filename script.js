// Función para cargar usuarios desde Local Storage
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

// Almacenar usuarios en Local Storage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Inicializar la lista de usuarios
let users = loadUsers();

// Función de inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar contra los datos almacenados
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Ocultar el formulario de inicio de sesión y mostrar el menú de reciclaje
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('recycle-section').style.display = 'block';
    } else {
        // Mostrar un mensaje de error y el botón de registro
        document.getElementById('login-error').textContent = 'Usuario o contraseña incorrectos.';
        document.getElementById('register-button').style.display = 'block';
    }
}

// Mostrar el formulario de registro
function showRegisterForm() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}

// Volver al formulario de inicio de sesión desde el registro
function showLoginForm() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Función de registro de nuevo usuario
function registerUser() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Validar que los campos no estén vacíos
    if (newUsername && newPassword) {
        // Agregar el nuevo usuario al array de usuarios
        users.push({ username: newUsername, password: newPassword });
        
        // Guardar los usuarios actualizados en Local Storage
        saveUsers();

        // Mostrar mensaje de éxito y limpiar el formulario
        document.getElementById('register-success').textContent = 'Usuario registrado con éxito.';
        document.getElementById('new-username').value = '';
        document.getElementById('new-password').value = '';

        // Volver al inicio de sesión después de un breve retraso
        setTimeout(() => {
            document.getElementById('register-section').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
            document.getElementById('register-success').textContent = '';
            document.getElementById('register-button').style.display = 'none';
        }, 2000);
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// ... resto de las funciones sin cambios ...


// Generar campos de prendas para reciclar
function generateFields() {
    const quantity = document.getElementById('quantity').value;
    const form = document.getElementById('clothing-form');
    form.innerHTML = ''; // Limpiar formulario previo

    for (let i = 0; i < quantity; i++) {
        const label = document.createElement('label');
        label.textContent = `Prenda ${i + 1} - Tipo de material y uso:`;

        const select = document.createElement('select');
        select.classList.add('material-select');
        select.innerHTML = `
            <option value="">Selecciona un tipo de material</option>
            <option value="algodon">Algodón</option>
            <option value="poliester">Poliéster</option>
            <option value="lana">Lana</option>
            <option value="jeans">Jeans</option>
        `;
        form.appendChild(label);
        form.appendChild(select);
    }

    document.getElementById('recycle-btn').style.display = 'block';
}

// Función para mostrar ideas de reciclaje basadas en los tipos de prendas seleccionadas
function showRecycleIdeas() {
    const selects = document.querySelectorAll('.material-select');
    let selectedMaterials = [];

    // Recorremos las selecciones y las agregamos a un array
    selects.forEach(select => {
        if (select.value) {
            selectedMaterials.push(select.value);
        }
    });

    // Limpiamos la sección de ideas
    const ideasSection = document.getElementById('ideas-section');
    const ideasDiv = ideasSection.querySelector('.ideas');
    ideasDiv.innerHTML = ''; // Limpiar las imágenes previas

    // Asegurarse de que el número de imágenes mostradas sea igual al número de prendas
    selectedMaterials.forEach((material) => {
        let imgSrc;

        // Asignar imágenes basadas en el material
        if (material === 'lana') {
            imgSrc = 'idea1.jpg'; // Imagen para lana
        } else if (material === 'algodon') {
            imgSrc = 'idea2.jpg'; // Imagen para algodón
        } else if (material === 'poliester') {
            imgSrc = 'idea3.jpg'; // Imagen para poliéster
        } else if (material === 'jeans') {
            imgSrc = 'idea4.jpg'; // Imagen para jeans
        }

        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Idea para ${material}`;
            img.onclick = () => showMaterialsAndSteps(material);
            ideasDiv.appendChild(img);
        }
    });

    // Mostrar la sección de ideas
    document.getElementById('recycle-section').style.display = 'none';
    ideasSection.style.display = 'block';
}

// Mostrar materiales y pasos de la idea seleccionada
function showMaterialsAndSteps(material) {
    const materialsList = document.getElementById('materials-list');
    const stepsList = document.getElementById('steps-list');

    materialsList.innerHTML = ''; // Limpiar la lista de materiales anterior
    stepsList.innerHTML = ''; // Limpiar la lista de pasos anterior

    // Definir los materiales y pasos para cada tipo de prenda
    let materials, steps;
    if (material === 'lana') {
        materials = ['Tela de lana', 'Tijeras', 'Hilo y aguja'];
        steps = ['Corta la tela', 'Cose los bordes', 'Dale forma final'];
    } else if (material === 'algodon') {
        materials = ['Tela de algodón', 'Tijeras', 'Hilo y aguja'];
        steps = ['Corta la tela', 'Cose los bordes', 'Dale forma final'];
    } else if (material === 'poliester') {
        materials = ['Tela de poliéster', 'Tijeras', 'Hilo y aguja'];
        steps = ['Corta la tela', 'Cose los bordes', 'Dale forma final'];
    } else if (material === 'jeans') {
        materials = ['Tela de jeans', 'Tijeras', 'Hilo y aguja'];
        steps = ['Corta la tela', 'Cose los bordes', 'Dale forma final'];
    }

    // Mostrar los materiales
    materials.forEach(material => {
        const listItem = document.createElement('p');
        listItem.textContent = material;
        materialsList.appendChild(listItem);
    });

    // Mostrar los pasos
    steps.forEach(step => {
        const listItem = document.createElement('p');
        listItem.textContent = step;
        stepsList.appendChild(listItem);
    });

    // Ocultar la sección de ideas y mostrar los materiales y pasos
    document.getElementById('ideas-section').style.display = 'none';
    document.getElementById('materials-steps-section').style.display = 'block';
}

// Resetear el formulario
function resetForm() {
    document.getElementById('materials-steps-section').style.display = 'none';
    document.getElementById('recycle-section').style.display = 'block';
    document.getElementById('clothing-form').innerHTML = '';
    document.getElementById('quantity').value = '';
}


