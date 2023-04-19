## Quicktionary: A Chrome Extension Using Javascript
### Video Demo:  https://youtu.be/pAZe_g859_Q
### Description:
This project is a Simple Chrome Extension using javascript.
Quicktionary extension helps you stay focused on what you are reading by eliminating the need to search for meaning, Double-clicking any word will view its definition in a small pop-up bubble. Now you never have to leave what you are reading to search meaning for the words you don't know.
Enjoy Reading uninterrupted!

#### Tools used: ####
- Javascript
- CSS


### How the extension works?
A chrome extension adds additional features to the browser. Different extensions perform different tasks.This extension
helps user to find meaning of words just on a double-click.
The following files are required  for the implementation of the extension:
- manifest.json
- content.js
- content.css
- background.js
- logo.svg


Let's go through each of these files to understand the working of the extension!

**1) manifest.json** :
The manifest.json file tells Chrome important information about the extension.
Information such as name of the extension, version, permissions required, script files added and many more such data is enclosed within this file.
As the name suggests the file will be in the JSON format.

The following is the the most basic manifest.json file that can be written:

---
```json
{
  "manifest_version": 2,
  "name": "My Cool Extension",
  "version": "0.1"
}

```
---


***Note:*** The manifest_version should always be 2, because version 1 is unsupported as of January 2014.


**2) content.js**  :
Content scripts are files that run in the context of web pages. By using the standard Document Object Model (DOM), they are able to read
details of the web pages the browser visits, make changes to them, and pass information to their parent extension.

Once the user double-clicks a word, content scripts sends the selected word to the background-scripts and awaits for the meaning from the
background-scripts. Communication between extensions and their content scripts works by using message passing.
Sending a request from a content script looks like this:

---
```json



chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});



```
---
On receiving the meaning, content-scripts creates a popup containing the meaning of the word and positions it right-below the selected text.
The pop-up can be removed either by clicking on the close button present already or by clicking anywhere on the webpage.

***Why send selected text to the background scripts for api call?***
***Why not use content scripts?***<br/>
Technically, Chrome won't allow you to do that. If you use content script to inject into a website then you can just send request only on that site,
if you're trying to send a request into another site, Chrome will stop you due to CORS policy.
So to achieve it, you have to setup a background script which receives passed-on messages from your content script and then send request into API endpoint and then you can return the result into your content script via defined message channel.


**3) content.css**
The popup created in the content scripts has to be styled. This task is performed by content.css file.The styling is done to beautify the contents of the popup so that it is well-indented and well-designed.
A number of other css files can be used for the extension but be sure to include them in the manifest.json file. Else it may not exist for the extension.



**4) background.js**
Background script can react to browser events and perform certain actions, the background page is loaded when it is needed, and unloaded when it goes idle.
Once it has been loaded, a background page will stay running as long as it is performing an action, such as calling a Chrome API or issuing a network request.
Effective background scripts stay dormant until an event they are listening for fires, react with specified instructions, then unload.


Background scripts are registered in the manifest under the "background" field. They are listed in an array after the "scripts" key:

---
```json
{
  "name": "xyz",
  ...
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  ...
}

```
---

Quicktionary extension requires an API to fetch the meaning of the word. background scripts receives the selected text sent by the content script
and calls for an API. The API used in this extension is "free dictionary API".
Sending a request from the extension to a content script looks very similar, except that you need to specify which tab to send it to.
This example demonstrates sending a message to the content script in the selected tab.

---
```json

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });

```
---

Once required data is obtained, it is converted to JSON format(easy-readable format) and conveyed to the content scripts.

### LOAD THE EXTENSION ###
- To load the extension in Chrome, open up chrome://extensions/ in the browser and click “Developer mode” in the top right.
- Now click “Load unpacked extension…” and select the extension’s directory. The extension is now visible on the screen.
- If any changes are made in any of the extensions file, the extension has to be reloaded in order to commit to new changes.
- Any errors generated can be visible on the page.

Now we are all set to use the extension.
Read all your best stories online and discover new-words along the way!





