# 🎅 Secret Santa Management System

A modern web application for managing Secret Santa gift exchanges with features for user management, participant selection, exclusion rules, and match generation.

## 🌟 Features

- **User Management**: Create and manage admin users
- **Gift Exchanges**: Create multiple gift exchanges with custom names and budgets
- **Participant Management**: Add participants to exchanges
- **Exclusion Rules**: Set rules to prevent certain participants from being matched
- **Match Generation**: Automatically generate fair and random matches

## 🚀 Technical Stack

- **Frontend**: React.js with React Router
- **UI**: React Bootstrap
- **State Management**: React Hooks
- **Notifications**: React Toastify
- **Build Tool**: Create React App

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn
- A modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd secret-santa-front
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your backend API URL:

```env
REACT_APP_API_URL=http://your-backend-api-url
```

### 4. Start the Development Server

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── common/
│   ├── apis/          # API service definitions
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── components/        # Reusable UI components
├── features/          # Feature-based components
│   ├── exchanges/     # Gift exchange management
│   ├── login/         # Authentication
│   ├── matches/       # Match viewing
│   ├── participant/   # Participant management
│   └── users/         # User management
└── App.js            # Main application component with routing
```

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

---

# 📖 User Guide

## Getting Started

### 1. Login

1. Open the application in your web browser
2. You'll be redirected to the login page
3. Enter your email address and click "Login or Create Account"
4. If this is your first time, a new admin account will be created
5. You'll be redirected to the dashboard

## Managing Users

### 1. Add New Users

1. From the dashboard, you'll see the "Manage Users" section
2. In the "Add New User" form:
   - Enter the user's name
   - Enter the user's email address
   - Click "Add New User"
3. The user will be added to the system immediately

### 2. Delete Users

1. In the "Existing Users" section, find the user you want to remove
2. Click the "Delete" button next to their name
3. The user will be removed from the system

## Managing Gift Exchanges

### 1. Create a New Exchange

1. Click on "Manage Exchanges" in the sidebar
2. Click "Create New Exchange"
3. Fill in the exchange details:
   - Name (e.g., "Family Christmas 2025")
   - Description (optional)
   - Budget (optional)
4. Click "Add New Exchange"

### 2. Add Participants to an Exchange

1. From the exchange list, click "Add Participants" on your desired exchange
2. You'll see a list of all available users
3. Select users by clicking on their cards (selected users will be highlighted)
4. Use "Select All" to quickly add all users
5. Use "Clear Selection" to start over
6. Click "Add Selected" to add the selected users to the exchange
7. Click "Continue to Exclusion Rules" when done

### 3. Set Exclusion Rules

1. On the exclusion rules page, you'll see a matrix of participants
2. Check the boxes to prevent certain participants from being matched with each other
   - For example, check the box where "User1" row meets "User2" column to prevent them from being matched
3. Click "Save Exclusions" when done

### 4. Generate Matches

1. After setting up exclusions, you'll be taken to the matches page
2. Click "Generate Matches" to create the Secret Santa assignments
3. The system will ensure no one is matched with someone on their exclusion list
4. Matches will be displayed in a list format

## Viewing Matches

### Admin View

- Can see all matches for all exchanges
- Accessible via the "Manage Matches" link in the sidebar

## Navigation

- **Dashboard**: View and manage users
- **Manage Exchanges**: Create and manage gift exchanges
- **Manage Matches**: View all matches across exchanges
