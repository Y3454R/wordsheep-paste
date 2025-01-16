import clipboardy from 'clipboardy';
import fs from 'fs';
import path from 'path';

// Use import.meta.url to get the current directory
const historyFilePath = path.join(new URL('.', import.meta.url).pathname, 'clipboard_history.json');

// Read previous clipboard history from the file (if exists)
let clipboardHistory = [];
if (fs.existsSync(historyFilePath)) {
  clipboardHistory = JSON.parse(fs.readFileSync(historyFilePath, 'utf-8'));
}

// Function to save clipboard history to the file
function saveToFile() {
  fs.writeFileSync(historyFilePath, JSON.stringify(clipboardHistory, null, 2));
}

// Function to monitor the clipboard and save content if it's new
function monitorClipboard() {
  let lastContent = clipboardy.readSync(); // Get the current clipboard content

  // Poll clipboard every second
  setInterval(() => {
    const content = clipboardy.readSync(); // Read clipboard again
    if (content !== lastContent) {
      console.log(`New content copied: ${content}`);

      // Avoid saving the same content multiple times
      if (!clipboardHistory.some(item => item.content === content)) {
        const timestamp = new Date().toISOString();
        clipboardHistory.push({ content, timestamp }); // Add new content to the history

        saveToFile(); // Save updated history to file
      }

      lastContent = content; // Update last copied content
    }
  }, 1000); // Check every second
}

// Start monitoring the clipboard
monitorClipboard();

