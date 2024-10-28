# Elders Explorer

**Elders Explorer** is an accessible and intuitive user registration system designed to help users explore local points of interest based on their location and personal interests. With support for RTL languages, high-contrast mode, and custom validation in Hebrew, Elders Explorer provides a tailored experience for all users.

![Screenshot](assets/screenshot.png)

## Features

- **Location-Based Recommendations**: View local points of interest filtered by user-selected hobbies and interests.
- **Custom Validation & Error Handling**: Hebrew alert messages, password length requirements, and location input validation.
- **Accessibility Features**: Includes RTL (right-to-left) language support and high-contrast mode for improved accessibility.
- **User-Friendly Interface**: Allows easy registration, profile updates, and interaction with location-based suggestions.

## Technologies Used

- **Frontend**: React, Bootstrap, React Router.
- **API Integration**: Axios for API requests to backend endpoints.
- **Context API**: Manages user data, accessibility preferences, and location context.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/assaf-malki/elders-explorer.git
   cd elders-explorer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   Create a `.env` file in the root directory and add:
   ```
   REACT_APP_SERVER_URL=your_server_url
   REACT_APP_GOOGLE_API_KEY=your_google_maps_api_key
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

## Usage

1. **Register**: New users can sign up by entering their username, password, birthday, location, and hobbies.
2. **Login & Profile Update**: Returning users can log in and update their information.
3. **Explore Points of Interest**: View local places of interest related to selected hobbies.

## Project Structure

```
├── src
│   ├── components          # UI components
│   ├── contexts            # Context providers for user, contrast, and text size
│   ├── assets              # Images, icons, etc.
│   ├── App.js              # Main app component
│   ├── index.js            # React entry point
│   └── ...
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Contributing

1. Fork the repository.
2. Create a new branch with your feature or bug fix:
   ```bash
   git checkout -b your-feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature or bug fix"
   ```
4. Push to the branch:
   ```bash
   git push origin your-feature-branch
   ```
5. Open a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Thank you for your interest in contributing to **Elders Explorer**!
