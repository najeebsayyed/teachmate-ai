<<<<<<< HEAD
# TeachMate 🤖⚡

> **AI-Powered Quiz & Question Paper Generator**  
> *Awarded Top 50 Rank out of 900+ Apps in the Octopus Hackathon* 🏆
=======


# 🧠 Teach Mate AI - an intelligent quiz-generation app built with React Native and powered by Google Gemini API.
>>>>>>> d65b059b5efd096d83f33908e9e5b181c196060c

TeachMate is a modern, high-performance mobile application built with **React Native**, **TypeScript**, **NativeWind v4**, **Redux Toolkit**, and **Google Gemini API**. It enables educators, students, and self-learners to generate structured exam test papers and interactive quizzes on any topic in seconds—with **Zero Backend**, **Zero Auth**, and **100% On-Device Storage**.

<<<<<<< HEAD
---

## ✨ Features

- **🧠 Instant Gemini AI Engine**: Powered by Google Gemini 2.5 Flash with structured JSON output formatting.
- **🚀 Animated First-Time Onboarding**: 3-slide interactive walkthrough explaining key app features (persisted via `@react-native-async-storage/async-storage`).
- **🎯 Flexible Paper Customization**:
  - **Education Levels**: Kindergarten, Primary, Secondary, Higher Secondary, Graduation.
  - **Question Formats**: Multiple Choice (MCQ), True/False, Short Answer.
  - **Difficulty & Count**: Flexible pill pickers and question count steppers (5 to 20 Qs).
- **🎮 Interactive Quiz Player**:
  - Step-by-step flashcard quiz environment with progress tracking.
  - Instant option verification (Green/Red option feedback).
  - Short answer text input submission with self-verification solutions.
  - **Skip Question** option.
  - Detailed scorecard summary with **Correct**, **Incorrect**, and **Skipped** statistics.
- **📄 Printable Test Paper View**: Rendered Markdown exam papers complete with institutional headers, marking schemes, and answer keys.
- **📥 Save as PDF & Share**: Built-in system share integration allowing teachers and students to export test papers directly to PDF, Drive, WhatsApp, or Notes.
- **📂 Offline Saved Library**: Re-open past test papers, replay interactive quizzes, or search history anytime offline.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React Native 0.81](https://reactnative.dev) (TypeScript `.tsx`) |
| **Styling Engine** | [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS) |
| **Animations** | [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/) |
| **AI Integration** | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini 2.5 Flash) |
| **State Management** | [@reduxjs/toolkit](https://redux-toolkit.js.org/) + `react-redux` |
| **Navigation** | [@react-navigation/stack v7](https://reactnavigation.org/) |
| **Persistence** | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |

---

## 📁 Directory Structure

```
TeachMate/
├── App.tsx                     # Main App Component & Redux Provider
├── env.d.ts                    # Module declaration for @env
├── global.css                  # NativeWind Tailwind CSS directives
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── src/
    ├── components/             # Reusable UI Components
    │   ├── Card.tsx            # Glassmorphic Card Container
    │   ├── ChipSelect.tsx      # Multi/Single Select Pill Buttons
    │   ├── CustomButton.tsx    # Primary, Secondary & Outline Buttons
    │   ├── CustomInput.tsx     # Styled Text Inputs
    │   ├── CustomText.tsx      # Typography Wrapper
    │   ├── Header.tsx          # Screen App Bar
    │   └── LoadingSkeleton.tsx # Shimmer Skeleton Loader
    ├── navigation/
    │   └── Navigation.tsx      # Stack Navigator
    ├── redux/
    │   ├── Slice.ts            # Redux Quiz State Slice
    │   └── Store.ts            # Redux Store Config
    ├── screens/
    │   ├── SplashScreen.tsx    # Launch & Onboarding Check
    │   ├── OnboardingScreen.tsx# First-Time Feature Carousel
    │   ├── HomeScreen.tsx      # Dashboard & Preset Topics
    │   ├── GenerateScreen.tsx  # Parameter Form
    │   ├── OutputScreen.tsx    # Test Paper & Question Summary
    │   ├── QuizPlayerScreen.tsx# Interactive Stepper & Scorecard
    │   └── HistoryScreen.tsx   # Offline Saved Library
    ├── types/
    │   └── index.ts            # TypeScript Interface Definitions
    └── utils/
        └── storage.ts          # AsyncStorage Persistence Utility
=======
## Setup 
## Step 1: Install Dependencies


```sh
npm install

>>>>>>> d65b059b5efd096d83f33908e9e5b181c196060c
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 20)
- React Native CLI Environment Setup ([Guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio & Emulator (or connected physical device)

<<<<<<< HEAD
### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/NajeebSayyed/teachmate-ai.git
   cd TeachMate
   ```
=======
```sh

npm run android

```
>>>>>>> d65b059b5efd096d83f33908e9e5b181c196060c

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start Metro Bundler**:
   ```sh
   npm start
   ```

5. **Run on Android**:
   ```sh
   npm run android
   ```

---

## 🏆 Hackathon Recognition

Built for the **Octopus Hackathon**, securing a **Top 50 Rank out of 900+ competing apps**.

<<<<<<< HEAD
---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
=======
```sh

npm run ios

```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 🚀 Features
✨ AI-Powered Quiz Generation – Enter any topic and get instant MCQs generated by Gemini API.

🧩 Customizable Difficulty – Choose between easy, medium, or hard levels.

📱 Cross-Platform App – Built with React Native, works seamlessly on Android and iOS.

💡 Instant Feedback – Know the correct answers and explanations immediately.

🔒 Lightweight & Secure – Data processed securely through Google AI API.
>>>>>>> d65b059b5efd096d83f33908e9e5b181c196060c
