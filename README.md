# React .Net Course Busness Cards Final Project

## Table of Contents

- [Installation](#installation)
- [Usage](#Usage)
- [Author](#Author)
- [License](#license)
- [Disclaimer](# Disclaimer)

## Installation

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your machine. You can download and install them from [https://nodejs.org/](https://nodejs.org/).

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies.

### Dependencies

This project uses the following libraries and frameworks:

- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [axios](https://axios-http.com/)
- [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [React Router DOM](https://reactrouter.com/)

### `npm install`

Start the development server.

### `npm start`

The app will now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### User Features

- Create profiles on the App.
- Create personal business cards.
- View cards created by other users.
- Search for cards by title.
- Filter cards by favorites or cards created by the user.
- Edit personal information after creating the user profile.

### Admin Features

Admin users have all the privileges mentioned above. Additionally, they can:

- Edit or delete any business card.
- Edit other users' names and passwords (Current API limitations).
- Delete any user.

### Interaction with Business Cards

All Users:

- View all business cards.
- Access an expanded card mode.
- Use the call function to contact the phone number on the card.

Registered Users:

- Favorite any business card.

Registered Business Users:

- Creat their own business cards

- Edit or delete their own business cards.

Admin Users:

- Edit or delete all business cards.

### Expanded Card Mode

When a card is selected, it provides further information and options:

- View the expanded card information
- Call the phone number on the business card.
- Send an E-mail to the provided E-mail address.
- Visit the web address on the business card.
- Access Google's geolocation associated with the card.

## Author

[Dr. Tomer Chen](https://github.com/Tomerlivechen)

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

I take no responsibility for the use of this software outside of the examination of this project by HackerU examination personnel.
