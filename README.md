# QuickNotes App

QuickNotes is a clean, modern, and responsive single-page web application designed to help users quickly capture, categorize, search, and manage daily thoughts and tasks directly inside their web browser.

## Features

- **Add Categorized Notes**: Create notes assigned to Personal, Work, or Study categories.
- **Visual Category Styling**: Distinct visual card highlights and badges for each category.
- **Input Validation**: Prevents empty submissions and limits notes to 200 characters with real-time error messages.
- **Real-time Search**: Instant keyword filtering across all existing notes.
- **Local Persistence**: Notes are saved using browser `localStorage` and persist across page refreshes.
- **Dynamic Note Counter**: Accurate singular and plural note counts.
- **Clear All Option**: Delete all notes at once with confirmation prompting.
- **Responsive Layout**: Form controls stack vertically on small mobile viewports 

## Local Setup & Running

1. Clone or download this repository:
   ```bash
   git clone [https://github.com/sherilkerubo/quicknotes-app.git](https://github.com/sherilkerubo/quicknotes-app.git)


# What I Learned
1.DOM Construction & XSS Safety: Building elements dynamically using document.createElement() and textContent ensures secure rendering without risking security vulnerabilities from innerHTML.

2.Local Storage Synchronization: Parsing and stringifying JSON data allows complex objects and state to seamlessly survive browser refreshes.

3.Flexbox & Mobile-First CSS: Implementing Flexbox layout controls and @media queries creates a seamless experience from mobile viewports up to desktop widths.
