// DOM Elements
const counterElement = document.getElementById('counter');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const increaseBtn = document.getElementById('increase');

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

const colorDisplay = document.getElementById('colorDisplay');
const colorText = document.getElementById('colorText');
const generateColorBtn = document.getElementById('generateColor');

// Counter functionality
let count = 0;

function updateCounter() {
    counterElement.textContent = count;
    counterElement.style.color = count > 0 ? '#28a745' : count < 0 ? '#dc3545' : '#667eea';
}

decreaseBtn.addEventListener('click', () => {
    count--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateCounter();
});

increaseBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});

// Todo List functionality
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
            <span class="todo-text">${todo.text}</span>
            <button class="todo-delete" onclick="deleteTodo(${index})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Color Generator functionality
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateColorDisplay() {
    const color = generateRandomColor();
    colorDisplay.style.backgroundColor = color;
    colorText.textContent = color;
    
    // Adjust text color based on background brightness
    const brightness = getBrightness(color);
    colorText.style.color = brightness > 128 ? '#333' : '#fff';
    colorText.style.textShadow = brightness > 128 ? 
        '1px 1px 2px rgba(255,255,255,0.8)' : 
        '1px 1px 2px rgba(0,0,0,0.8)';
}

function getBrightness(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

generateColorBtn.addEventListener('click', updateColorDisplay);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    renderTodos();
    updateColorDisplay();
    
    // Add some sample todos if the list is empty
    if (todos.length === 0) {
        todos = [
            { text: 'Learn JavaScript', completed: false },
            { text: 'Build a web app', completed: false },
            { text: 'Deploy to production', completed: false }
        ];
        saveTodos();
        renderTodos();
    }
});

// Add some fun animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add click sound effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add todo
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement === todoInput) {
        addTodo();
    }
    
    // Space to generate new color
    if (e.code === 'Space' && document.activeElement !== todoInput) {
        e.preventDefault();
        updateColorDisplay();
    }
    
    // Arrow keys for counter
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        count++;
        updateCounter();
    }
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        count--;
        updateCounter();
    }
    if (e.code === 'KeyR') {
        e.preventDefault();
        count = 0;
        updateCounter();
    }
});
