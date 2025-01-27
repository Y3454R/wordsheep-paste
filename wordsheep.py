import pyperclip
import time
import json
import os

def log_clipboard_to_json(file_path):
    # Load existing words from JSON if the file exists
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            words = json.load(file)
    else:
        words = []

    last_clipboard = ""

    while True:
        current_clipboard = pyperclip.paste().strip()  # Remove extra whitespace

        if current_clipboard != last_clipboard and current_clipboard:  # Avoid empty strings
            if current_clipboard not in words:  # Only add unique words
                words.append(current_clipboard)

                # Save the updated list to the JSON file
                with open(file_path, 'w', encoding='utf-8') as file:
                    json.dump(words, file, indent=4, ensure_ascii=False)
                
                print(f"New word added: {current_clipboard}")

            last_clipboard = current_clipboard
        
        time.sleep(1)  # Check every 1 second

if __name__ == "__main__":
    print("wordsheep running...")
    log_clipboard_to_json('clipboard_log.json')
