# What is this repository:

This is my main repository for WebDriverIO. It is based on Rahul's tutorials. Some of the material is changed either because Rahul's code did not work, or the original web app's used did not work.

# Tasks:

1. I need to create proper documentation that goes through each spec file so I can give tutorials
2. Move all notes from WebDriverIO notes.docx (on my desktop) to the spec files. They need to be written in lecturing format
3. Q. Is there a way we can use require to import chai? Rahul did it, but I wasn't able to, I think it's to do with the ES version. Main reason we need to do this is so we can use both chai & WDIO assertions at the same time, so it's not a big blocker
4. Completing the tutorials: pick up from Section 7 - Video: Debugging WebDriverIO Code with Visual Studio editor video & continue building tests & taking notes.

# Installation:

1. You require Node.js. Install it here - https://nodejs.org/en/download
2. You require Visual Studio Code. Install it here - (https://code.visualstudio.com/download)

# Creating your first WDIO Project:

1. Create an empty folder for your project (i.e. WebDriverIO)
2. Navigate inside that folder via the Command Prompt, & run `npm init wdio .` to create the project & add dependencies.

- Running this command will prompt some questions regarding your project structure & dependencies. You can click Enter for all of these questions to accept the default answers. However, here are the answers I entered:
  - Where is the automation backend? Local machine
  - Framework? Mocha
  - Compiler? No
  - Where are the tests? Clicked Enter (selecting default location)
  - Default files? Yes
  - Page objects? Yes
  - Page objects location? Clicked Enter (selecting default location)
  - Add plugin? No
  - Base URL? Clicked Enter (selecting default value)
  - Run `npm install`? Yes (adding all dependencies specified above to your local project)
- The above steps will create your first WDIO project.

# Going through the project structure:

1. Open the project in VS Code & go through the files:
   a. `Node_modules` stores all the dependencies that your tests require.
   b. `Package.json` lists the names of the projects dependencies, & the scripts used to run your project.
   c. Running `npm install` at the beginning creates the `node_modules` folder, adding all dependencies listed in `package.json`
   d. test/specs stores all your tests (as specified initially)
   e. `describe()` blocks are basically test suites, & `it` blocks are individual tests / test cases
   f. `wdio.conf.js` is like your test runner (In here, you can specify the base URL, where your tests are stored, your browser, etc.)

# Adjusting VS Code Settings:

- It will be a lot easier to write WDIO tests if we add autocompletion. This doc explains how to add them in VS Code: https://webdriver.io/docs/autocompletion/
- The explanation in the above doc is missing some things, so I did the following:

  - Create `jsconfig.json` file in the root of your project & add the following code (this code will specify which files we want the types autosuggestions to pick up):

  ```
  {
  "compilerOptions": {
    "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
  },
  "include": [
    "test/specs/*.js",
    "**/*.json",
    "node_modules/@wdio/sync",
    "node_modules/@wdio/mocha-framework"
  ]
  }

  ```

  - After creating the above file, restart VS Code to make sure the changes take effect.
  - Verify the suggestions are working in your spec file by typing `browser` & the suggestions should appear.

# Async Code & Awaits:

- JavaScript is asynchronous, so there's no guarantee of the order of execution.
- Go through an example using 2 `console.log()`. They run at the same time, or in a different order to execute the code as quickly as possible.
- Promises:
  - Each step returns a promise. A `promise` is basically the result of the step.
  - A `promise` can 3 different states:
    - Pending (in-progress)
    - Resolved (complete)
    - Rejected (failed)
- How do we get around this async issue? We use the `await` keyword
- By using `await` you're telling the code to wait until this promise is resolved before continuing onto the next line of code
- When using awaits, you need to update your function to an `async` function. This tells the compiler that you'll be using awaits to handle the asynchronous code

# Running your tests:

- `npx wdio run wdioconfig.js` (you must specify your configuration file in the run command). In the config file, you specify which tests to run inside the `specs[]` array

# Issues:

- Specifying the browser using selenium-standalone
  - In 'Section 6 – Running Tests in Firefox & Edge using Selenium Standalone', he makes this change.
  - Previously, In our config (wdio.conf.js) we specified the Chrome browser (`Services: chromedriver`)
  - These are the changes he made here:
    - Go to the documentation, you see Selenium Standalone Service (webpage)
    - The docs tell you to add the wdio/selenium-standalone-service dependency to your project.
    - Rahul adds that to the package.json (devDependencies)
    - Run `npm i`
    - Change the services array in config file to `selenium-standalone`
    - Now, we can use any browser directly
    - Where we have set `browserName` in the config file, we can say `firefox`
    - Previously, we didn’t have support for firefox as we were using chromedriver rather than selenium-standalone service. This now supports all 3 browsers (including edge)
    - We run the test as normal, & the test opens in Firefox.
    - ISSUE: When I run the tests a 2nd/3rd/etc time, I get the error that a port is being used by Java. If I kill that process, then the test runs fine, but I need to kill it each time. When he does it in the video, he doesn’t get this issue. I’ve emailed them to see what the fix is, I’m waiting for a response.

# Tips:

- Different ways to use Parent -> Child:
  - Get the 1st child using a CSS selector - `tr th:nth-child(1)`
  - Get the 1st child using XPath - `//tr/th[1]`
- You can enter a selector in the browser console. If it’s valid, the element will get printed to the console: `document.querySelector('tr th:nth-child(1)')`
