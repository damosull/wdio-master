# What is this repository:

This is my main repository for WebDriverIO. It is based on Rahul's tutorials. Some of the material is changed either because Rahul's code did not work, or the original web app's used did not work.

# Tasks:

1. I need to create proper documentation that goes through each spec file so I can give tutorials
2. Move all notes from WebDriverIO notes.docx (on my desktop) to the spec files. They need to be written in lecturing format
3. Completing the tutorials: pick up from Section 7 - Video: Debugging WebDriverIO Code with Visual Studio editor video & continue building tests & taking notes.

# Tips:

Different ways to use Parent -> Child:
• Get the 1st child using a CSS selector - tr th:nth-child(1)
• Get the 1st child using XPath - //tr/th[1]
You can enter a selector in the browser console. If it’s valid, the element will get printed to the console: document.querySelector('tr th:nth-child(1)');
