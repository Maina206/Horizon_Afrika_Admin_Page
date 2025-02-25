# HorizonAfrika Tour Booking App Admin Page

## Description

This is a web-based tour and travel booking application built using React and Tailwind CSS. It allows users to browse and book travel packages in Kenya.

## Features

- Navigation bar with quick access links
- Search functionality
- Display of travel packages
- Footer section with company details and social media links

## Installation

1. Clone the repository:
   ```sh
   git@github.com:Maina206/Horizon_Afrika_Admin_Page.git
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
- How many Travellers have booked and viewed the packages.
- It allows the agency incharge to delete, edit or create a new package.
- Users can navigate through quick access links in the footer.
- Social media icons provide external links to follow the company.

## Technologies Used

- React.js
- Tailwind CSS
- FontAwesome for icons

## File Structure

```
/src
  ├── components
  │   ├── Navbar.jsx
  │   ├── SearchBar.jsx
  │   ├── PackageCard.jsx
  ├── assets
  │   ├── safari.jpeg
  │   ├── saf.webp
  │   ├── tanzania-7416241_640.jpg
  ├── App.jsx
  ├── index.css
  ├── main.jsx
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

## License

This project is licensed under the MIT License.
