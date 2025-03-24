# HorizonAfrika Tour Booking App Admin Page

## Description

This is a web-based tour and travel booking application built using React and Tailwind CSS. It allows agencies to browse and track their travel packages that have been uploaded to the site.

## Features

- Navigation bar with quick access links
- Login button for authentication
- Search functionality
- Display of travel packages
- Footer section with company details and social media links
- Bookings table with data of the agency's packages
- Agencies can create new packages, edit existing ones, and delete outdated listings

## Live link

You can view the live platform at https://horizonafrikaadmin.netlify.app/
Use the following credentials to login
Username: kikao@gmail.com
Password: Trial123

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:Maina206/Horizon_Afrika_Admin_Page.git
   ```
2. Navigate to the project directory:
   ```sh
   cd HORIZON_AFRIKA_ADMIN_PAGE
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- The homepage displays a list of available travel packages that the agency uploaded.
- Agencies must log in to create, edit, delete, and view packages and bookings.
- Displays the number of travelers who have booked and viewed the packages.
- Agencies can manage their packages efficiently.
- Social media icons provide external links to follow the company.

## Technologies Used

- React.js
- Tailwind CSS
- FontAwesome for icons
- React-icons
- Lucide-React for icons

## File Structure

```
/src
  ├── components
  |   ├── CreatePackageModal
  |   | ├── CreatePackageModal.css
  |   | ├── CreatePackageModal.jsx
  |   ├── LoginSignUpModals
  |   | ├── agencylogin.css
  |   | ├── AgencyLogin.jsx
  │   ├── Navbar.jsx
  │   ├── SearchBar.jsx
  │   ├── PackageCard.jsx
  |   ├── BookingsTable.jsx
  ├── public
  │   ├── safari.jpeg
  │   ├── saf.webp
  │   ├── tanzania-7416241_640.jpg
  |   ├── bookingsdata.json
  |   ├── packages.json
  |   ├── sahara-8208094_640.webp
  ├── App.jsx
  ├── index.css
  ├── main.jsx
  ├── App.css
  ├── BookingsTable.css
```

## Troubleshooting

### Icons Not Displaying

Ensure FontAwesome is correctly installed and imported in `App.jsx`:

```sh
npm install @fortawesome/fontawesome-free
```

Add this import in `App.jsx`:

```js
import "@fortawesome/fontawesome-free/css/all.min.css";
```

### Tailwind CSS Not Applying

- Check that `tailwind.config.js` is correctly set up.
- Ensure necessary Tailwind directives are included in `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Build Errors

If you encounter dependency issues, try:

```sh
rm -rf node_modules package-lock.json && npm install
```

## License

This project is licensed under the MIT License.
