# My Daily Word

A mobile application designed to help users learn new words in different languages every day.

## Overview

My Daily Word is a language learning application built with React Native and Expo. It helps users expand their vocabulary by providing a new word each day in their chosen language, complete with translations, pronunciations, and example sentences. The app tracks progress, maintains a history of learned words, and sends daily reminders to keep users engaged in their language learning journey.

## Features

- **Multiple Language Support**: Learn words in Turkish, English, Spanish, French, German, Italian, and more.
- **Daily Word Learning**: Get a new word each day with translation, pronunciation, and example usage.
- **Progress Tracking**: Monitor your learning streak and view statistics on words learned.
- **Word History**: Access a history of all previously learned words for review.
- **Customizable Notifications**: Set up daily reminders to maintain your learning habit.
- **Vocabulary Levels**: Choose difficulty levels for the words you want to learn.
- **Offline Support**: Access your learned words even without an internet connection.
- **AI-Powered Word Generation**: Utilizes Google's Gemini REST API to generate contextually relevant words and translations.

## Technology Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: React Native components with custom styling
- **Notifications**: Expo Notifications
- **Navigation**: Expo Router
- **AI Integration**: Google Gemini API for intelligent word selection and translation

## App Structure

- **Main Screen**: Select a language and get a daily word
- **Progress Screen**: View learning statistics and streaks
- **Settings Screen**: Configure app preferences, notification settings, and more

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Google Gemini API key (set in .env file)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/my-daily-word.git
cd my-daily-word
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env` file in the root directory with your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npx expo start
```

5. Open the app on your device using the Expo Go app or run it in an emulator

## Usage

1. Select your preferred language from the available options
2. Tap "Get Word" to receive a new word in your chosen language
3. Review the word, its translation, pronunciation, and example sentence
4. Check your progress in the Progress tab
5. Configure notifications and other settings in the Settings tab

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Expo team for the excellent React Native development platform
- Google for the Gemini AI API
- Unsplash for the beautiful language images
- All contributors who have helped improve this app
