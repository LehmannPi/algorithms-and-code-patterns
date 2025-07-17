// Todo List Application
class AccessibleTodoList {
  constructor() {
    this.tasks = [];
    this.currentTaskId = 0;

    // DOM elements
    this.form = document.getElementById('todo-form');
    this.taskInput = document.getElementById('task-input');
    this.errorMessage = document.getElementById('error-message');
    this.todoList = document.getElementById('todo-list');
    this.emptyState = document.getElementById('empty-state');

    this.initializeEventListeners();
    this.updateEmptyState();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask();
    });

    // // Input validation on blur
    // this.taskInput.addEventListener('blur', () => {
    //   this.validateInput();
    // });

    // Clear error on input
    this.taskInput.addEventListener('input', () => {
      this.clearError();
    });

    // Keyboard navigation
    this.taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addTask();
      }
    });
  }

  validateInput() {
    const value = this.taskInput.value.trim();

    if (!value) {
      this.showError('Task description is required');
      return false;
    }

    if (value.length > 40) {
      this.showError('Task description must be 40 characters or less');
      return false;
    }

    this.clearError();
    return true;
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.taskInput.classList.add('error');
    this.errorMessage.setAttribute('aria-live', 'assertive');

    // Announce error to screen readers
    this.announceToScreenReader(message);
  }

  clearError() {
    this.errorMessage.textContent = '';
    this.taskInput.classList.remove('error');
    this.errorMessage.setAttribute('aria-live', 'polite');
  }

  addTask() {
    if (!this.validateInput()) {
      return;
    }

    const taskText = this.taskInput.value.trim();
    const task = {
      id: ++this.currentTaskId,
      text: taskText,
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    this.renderTask(task);
    this.taskInput.value = '';
    this.taskInput.focus();

    this.updateEmptyState();
    this.announceToScreenReader(`Task "${taskText}" added to the list`);
  }

  renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'todo-item';
    taskElement.setAttribute('data-task-id', task.id);

    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
            <span class="todo-text" id="task-${task.id}">${this.escapeHtml(
      task.text
    )}</span>
            <div class="todo-actions">
                <button 
                    type="button" 
                    class="complete-btn"
                    aria-label="${
                      task.completed
                        ? 'Mark task as incomplete'
                        : 'Mark task as complete'
                    }"
                    aria-pressed="${task.completed}"
                    onclick="todoApp.toggleTask(${task.id})"
                >
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                    type="button" 
                    class="delete-btn"
                    aria-label="Delete task"
                    onclick="todoApp.deleteTask(${task.id})"
                >
                    Delete
                </button>
            </div>
        `;

    this.todoList.appendChild(taskElement);
  }

  toggleTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

    if (task.completed) {
      taskElement.classList.add('completed');
      this.announceToScreenReader(`Task "${task.text}" marked as complete`);
    } else {
      taskElement.classList.remove('completed');
      this.announceToScreenReader(`Task "${task.text}" marked as incomplete`);
    }

    // Update button text and aria-pressed
    const completeBtn = taskElement.querySelector('.complete-btn');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.setAttribute(
      'aria-label',
      task.completed ? 'Mark task as incomplete' : 'Mark task as complete'
    );
    completeBtn.setAttribute('aria-pressed', task.completed);
  }

  deleteTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskText = task.text;

    // Remove from array
    this.tasks = this.tasks.filter((t) => t.id !== taskId);

    // Remove from DOM
    taskElement.remove();

    this.updateEmptyState();
    this.announceToScreenReader(`Task "${taskText}" deleted from the list`);

    // Focus management after deletion
    this.manageFocusAfterDeletion(taskElement);
  }

  manageFocusAfterDeletion(deletedElement) {
    // Find the next focusable element
    const nextTask = deletedElement.nextElementSibling;
    const prevTask = deletedElement.previousElementSibling;

    if (nextTask) {
      const nextButton = nextTask.querySelector('button');
      if (nextButton) {
        nextButton.focus();
      }
    } else if (prevTask) {
      const prevButton = prevTask.querySelector('button');
      if (prevButton) {
        prevButton.focus();
      }
    } else {
      // No more tasks, focus the input
      this.taskInput.focus();
    }
  }

  updateEmptyState() {
    if (this.tasks.length === 0) {
      this.todoList.style.display = 'none';
      this.emptyState.style.display = 'block';
    } else {
      this.todoList.style.display = 'flex';
      this.emptyState.style.display = 'none';
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  announceToScreenReader(message) {
    // Create a temporary element for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new AccessibleTodoList();

  // Add CSS for screen reader only content
  const style = document.createElement('style');
  style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
  document.head.appendChild(style);

  // Set initial focus to the input field
  document.getElementById('task-input').focus();
});

// Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
  // Skip to main content with Ctrl + M
  if (e.ctrlKey && e.key === 'm') {
    e.preventDefault();
    document.querySelector('main').focus();
  }

  // Skip to form with Ctrl + F
  if (e.ctrlKey && e.key === 'f') {
    e.preventDefault();
    document.getElementById('task-input').focus();
  }
});

// Add skip links for better accessibility
document.addEventListener('DOMContentLoaded', () => {
  const skipLinks = document.createElement('div');
  skipLinks.innerHTML = `
        <a href="#todo-form-title" class="skip-link">Skip to form</a>
        <a href="#todo-list-title" class="skip-link">Skip to task list</a>
    `;

  const style = document.createElement('style');
  style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2c3e50;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        }
        
        .skip-link:focus {
            top: 6px;
        }
    `;

  document.body.insertBefore(skipLinks, document.body.firstChild);
  document.head.appendChild(style);
});
