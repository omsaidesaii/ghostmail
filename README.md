# GhostMail

---

## 👻 GhostMail - Your Disposable Email Service

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Guerrilla Mail API](https://img.shields.io/badge/API-Guerrilla_Mail-red?style=for-the-badge)](https://www.guerrillamail.com/developers)

GhostMail is a sleek, client-side **disposable email service** that uses the **Guerrilla Mail API** to give you temporary, secure, and anonymous email addresses. It's built to help you protect your privacy and keep your main inbox free of spam. Get a throwaway email in seconds, use it for anything online, and see incoming messages right in the clean GhostMail interface.

---

## ✨ Features

* **Instant Temporary Email:** Get a unique, disposable email address immediately when the page loads or whenever you need a new one.
* **Copy to Clipboard:** Easily copy your temporary email address with a single click.
* **Real-time Inbox:** Messages sent to your temporary address appear in the inbox, fetched directly from the Guerrilla Mail API.
* **Automatic Inbox Refresh:** The inbox refreshes every 10 minutes to show new emails (this aligns with the email's temporary validity).
* **Manual Inbox Refresh:** Need to check sooner? Just hit the "Refresh" button.
* **New Email Generation:** Generate a completely new temporary email address whenever you want, which also clears the current inbox and resets the timer.
* **Clear Inbox:** Remove all displayed messages from your current temporary inbox.
* **Email Content Viewer:** Click on any message to open a pop-up and read its full content.
* **Dark/Light Theme Toggle:** Switch between a comfortable dark mode and a bright light mode.
* **Responsive Design:** Looks great and works smoothly on desktops, tablets, and phones.
* **Privacy-Focused:** Protect your real email from spam, phishing attempts, and unwanted newsletters—no sign-up required.

---

## 💡 Why Use GhostMail?

In today's digital world, nearly every online service asks for your email address. Using your main email for everything can lead to a messy inbox, tons of spam, and even security risks. GhostMail offers a simple solution: a temporary, anonymous email address you can use for:

* Signing up for newsletters or promotions.
* Accessing one-time downloads or free trials.
* Testing new apps or services without commitment.
* Protecting your privacy on forums or social media.
* Keeping spam and unwanted solicitations out of your primary inbox.

---

## 💻 Technologies Used

* **HTML5:** For structuring the web page.
* **CSS3:** For all the styling and responsive design, including the theme toggle.
* **JavaScript:** Powers the dynamic behavior, API interactions, and UI updates.
* **React (via CDN):** Used for specific components like the hamburger menu (as indicated in `index.html`).
* **Guerrilla Mail API:** The core service that handles temporary email address generation and message retrieval.
* **Font Awesome:** Provides the cool icons.
* **Google Fonts (Inter):** For the modern typography.

---

## 🚀 Getting Started

Getting GhostMail up and running locally is super easy!

### Prerequisites

All you need is a modern web browser. Since it's a client-side app, you don't need any complex server setup.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/omsaidesaii/ghostmail.git](https://github.com/omsaidesaii/ghostmail.git)
    ```
2.  **Move into the project directory:**
    ```bash
    cd ghostmail
    ```
3.  **Open `index.html`:**
    Simply open the `index.html` file in your favorite web browser, and you're good to go!

---

## ⚙️ How it Works Under the Hood

GhostMail runs entirely in your browser. It talks to the **Guerrilla Mail API** to manage your temporary emails:

1.  **Email Generation:** When you open the page or click "New Email," GhostMail sends a request to the Guerrilla Mail API to get a fresh temporary email address and a session ID (`sid_token`).
2.  **Message Retrieval:** The app regularly checks the Guerrilla Mail API, using your unique `sid_token`, to see if any new messages have arrived in your temporary inbox.
3.  **Content Display:** If you click on an email in your inbox, another API call fetches the full content of that specific message, displaying it in a neat pop-up.

This setup means GhostMail doesn't store your email data itself; it relies completely on the Guerrilla Mail service for all email handling.

---

## ➡️ How to Use

1.  **Get Your Email:** When you first open the page, a temporary email address will automatically appear in the main input field.
2.  **Copy It:** Click the **"Copy"** button next to the email address to save it to your clipboard.
3.  **Use It Anywhere:** Use this temporary email address on any website or service where you'd rather not use your real one.
4.  **Check Your Inbox:** Any emails sent to your temporary address will show up in the "Inbox" section below. The inbox refreshes automatically every 10 minutes, or you can click the **"Refresh"** button for an instant check.
5.  **Read Messages:** Click on any message in the inbox to open a modal and view its full content.
6.  **New Email:** Want a different email? Click the **"New Email"** button. This will generate a fresh address, reset the timer, and clear your current inbox.
7.  **Clear All:** Use the **"Clear All"** button in the inbox controls to remove all messages from the displayed inbox. (Note: this only clears your local view, not the actual emails on the Guerrilla Mail servers).
8.  **Change Theme:** Click the moon/sun icon in the header to switch between the sleek **dark mode** and a bright **light mode**.

---

## 🤝 Contributing

Contributions are what make the open-source community so vibrant and amazing! If you have ideas to make GhostMail even better, we'd love your help.

Here's how you can contribute:

1.  **Fork the Project.**
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

Also, feel free to open an issue with the tag "enhancement" if you have suggestions. And don't forget to give the project a star! Thanks for your support!

---

## 🛣️ Roadmap

We're always looking for ways to enhance GhostMail. Here are some ideas for future development:

* [ ] Implement more robust error handling and clearer user feedback for API interactions.
* [ ] Explore options for displaying email attachments (if supported by the Guerrilla Mail API and feasible).
* [ ] Add search and filtering capabilities to the inbox for easier message management.
* [ ] Improve email content rendering to better handle various HTML and plain text formats.
* [ ] Further enhance the UI/UX with more advanced animations and user-friendly features.

---

## 📄 License

This project is distributed under the **MIT License**. See the `LICENSE` file for more information.

---

## 📞 Contact

Omsai Desai - [omsaidesai9@gmail.com](mailto:omsaidesai9@gmail.com)

Project Link: [https://github.com/omsaidesaii/ghostmail](https://github.com/omsaidesaii/ghostmail)
