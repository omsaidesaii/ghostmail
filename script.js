// Guerrilla Mail API endpoints
const API_BASE_URL = 'https://api.guerrillamail.com/ajax.php';
let sid_token = ''; // Session token
let email_timestamp = 0; // Timestamp for email checking

// State management
let currentEmail = '';
let messages = [];
let countdownInterval;

// Initialize the application
window.onload = () => {
    generateNewEmail();
    startCountdown();
    initializeTheme();
};

// Generate a new email address using Guerrilla Mail API
async function generateNewEmail() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.classList.add('loading', 'active');
    
    try {
        // Get email address from Guerrilla Mail
        const response = await fetch(`${API_BASE_URL}?f=get_email_address`);
        const data = await response.json();
        
        if (data.email_addr) {
            currentEmail = data.email_addr;
            sid_token = data.sid_token;
            document.getElementById('email').value = currentEmail;
            
            // Reset countdown and clear inbox
            resetCountdown();
            clearInbox();
        } else {
            throw new Error('Failed to get email address');
        }
    } catch (error) {
        console.error('Error generating email:', error);
        alert('Failed to generate new email address. Please try again.');
    } finally {
        refreshBtn.classList.remove('loading', 'active');
    }
}

// Copy email address to clipboard
function copyEmail() {
    const emailInput = document.getElementById('email');
    emailInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const copyBtn = document.getElementById('copyBtn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
}

// Sample message templates for demo purposes
const sampleMessages = [
    {
        from: 'notifications@example.com',
        subject: 'Account Verification',
        preview: 'Please verify your account by clicking the link below...'
    },
    {
        from: 'newsletter@example.com',
        subject: 'Weekly Newsletter',
        preview: 'Check out the latest updates and news from our team...'
    },
    {
        from: 'support@example.com',
        subject: 'Welcome to TempMail',
        preview: 'Thank you for using our service. Here are some tips to get started...'
    },
    {
        from: 'info@example.com',
        subject: 'Security Alert',
        preview: 'We detected a new login to your account from...'
    }
];

// Refresh inbox to check for new messages
async function refreshInbox() {
    const inboxElement = document.querySelector('.inbox');
    inboxElement.classList.add('loading', 'active');
    
    try {
        if (!sid_token) {
            throw new Error('No active email session');
        }

        const response = await fetch(`${API_BASE_URL}?f=check_email&sid_token=${sid_token}&seq=${email_timestamp}`);
        const data = await response.json();

        if (data.list && Array.isArray(data.list)) {
            // Update the timestamp for next check
            email_timestamp = data.timestamp || email_timestamp;

            // Add new messages to the list, avoiding duplicates
            data.list.forEach(email => {
                // Check if message with this ID already exists
                const exists = messages.some(msg => msg.id === email.mail_id);
                
                if (!exists) {
                    const newMessage = {
                        id: email.mail_id,
                        from: email.mail_from,
                        subject: email.mail_subject,
                        preview: email.mail_excerpt,
                        timestamp: new Date(email.mail_timestamp * 1000).toLocaleString()
                    };
                    messages.unshift(newMessage);
                }
            });

            displayMessages();
        }
    } catch (error) {
        console.error('Error refreshing inbox:', error);
        alert('Failed to refresh inbox. Please try again.');
    } finally {
        inboxElement.classList.remove('loading', 'active');
    }
}

// Display messages in the inbox
function displayMessages() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = messages.length ? '' : '<p class="no-messages">No messages yet</p>';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <h3>${message.subject}</h3>
            <div class="meta">
                <span>From: ${message.from}</span>
                <span>• ${message.timestamp}</span>
            </div>
            <div class="preview">${message.preview}</div>
        `;
        
        messageElement.onclick = () => openMessage(message);
        messagesContainer.appendChild(messageElement);
    });
}

// Open a message to view its full content
async function openMessage(message) {
    try {
        if (!sid_token) {
            throw new Error('No active email session');
        }

        const response = await fetch(`${API_BASE_URL}?f=fetch_email&sid_token=${sid_token}&email_id=${message.id}`);
        const data = await response.json();

        if (data.mail_body) {
            // Create a modal to display the email content
            const modalHtml = `
                <div class="email-modal">
                    <div class="email-modal-content">
                        <div class="email-modal-header">
                            <h3>${data.mail_subject}</h3>
                            <button onclick="closeEmailModal()">×</button>
                        </div>
                        <div class="email-modal-body">
                            <p><strong>From:</strong> ${data.mail_from}</p>
                            <p><strong>Date:</strong> ${new Date(data.mail_timestamp * 1000).toLocaleString()}</p>
                            <div class="email-content">${data.mail_body}</div>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to the page
            const modalElement = document.createElement('div');
            modalElement.innerHTML = modalHtml;
            document.body.appendChild(modalElement);

            // Add event listener to close modal when clicking outside
            document.querySelector('.email-modal').addEventListener('click', (e) => {
                if (e.target.classList.contains('email-modal')) {
                    closeEmailModal();
                }
            });
        } else {
            throw new Error('Failed to fetch email content');
        }
    } catch (error) {
        console.error('Error opening message:', error);
        alert('Failed to open message. Please try again.');
    }
}

// Close the email modal
function closeEmailModal() {
    const modal = document.querySelector('.email-modal');
    if (modal) {
        modal.remove();
    }
}

// Clear all messages from inbox
function clearInbox() {
    messages = [];
    displayMessages();
}

// Countdown timer management
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    let timeLeft = 600; // 10 minutes in seconds
    
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft === 0) {
            generateNewEmail();
        } else {
            timeLeft--;
        }
    }, 1000);
}

// Reset countdown timer
function resetCountdown() {
    clearInterval(countdownInterval);
    startCountdown();
}

// Event listener for page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(countdownInterval);
    } else {
        startCountdown();
    }
});

// Initialize theme based on system preference or saved preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.body.classList.toggle('light-mode', savedTheme === 'light');
    } else {
        document.body.classList.toggle('light-mode', false); // Default to dark mode
    }

    updateThemeToggleIcon();
}

// Update the theme toggle button icon
function updateThemeToggleIcon() {
    const isLightMode = document.body.classList.contains('light-mode');
    const toggle = document.getElementById('themeToggle');
    toggle.setAttribute('data-theme', isLightMode ? 'light' : 'dark');
    toggle.innerHTML = isLightMode 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Toggle theme and save preference
document.getElementById('themeToggle').addEventListener('click', function () {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeToggleIcon();
});

// Ensure theme initialization on page load
window.onload = () => {
    generateNewEmail();
    startCountdown();
    initializeTheme();
};