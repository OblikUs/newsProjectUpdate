document.getElementById('website').addEventListener('click', () =>{
  chrome.tabs.create({'url': 'https://www.google.com/'});
});