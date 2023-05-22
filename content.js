var generateHTML = () => {
  return `
  <div class="container">
  <div id="cloud-intro"></div>
</div>
  `;
};

var generateCSS = () => {
  return `<style> 
  html, body, .container{
    width: 100%;
    height: 100%;
    min-width: 500px;
    min-height: 500px;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .container{
    background-color: #007ced;
    background: linear-gradient(to right, #261f21, #b20a2c);
  }
  #cloud-intro{
    position: relative;
    height: 100%;
    background: url(https://static.radulescu.me/examples/clouds/clouds1000.png);
    background: url(https://static.radulescu.me/examples/clouds/clouds1000.png) 0 200px,
                url(https://static.radulescu.me/examples/clouds/clouds1200_1.png) 0 300px,
                url(https://static.radulescu.me/examples/clouds/clouds1000_blur3.png) 100px 250px;
    animation: wind 20s linear infinite;
  }
  @keyframes wind{
    0% {
      background-position: 0 200px, 0 300px, 100px 250px;
    }
    100% {
      background-position: 1000px 200px, 1200px 300px, 1100px 250px;
    }
  
  }
  </style>`;
};
var originalHTML = document.body.innerHTML;
var originalCSS = document.head.innerHTML;

if (
  window.location.hostname === "www.netflix.com" &&
  window.location.pathname === "/browse"
) {
  chrome.storage.local.get("timeSet", function (result) {
    if (result.timeSet === "true") {
      document.body.innerHTML = originalHTML;
      document.head.innerHTML = originalCSS;
    } else {
      document.body.innerHTML = generateHTML();
      document.head.innerHTML = generateCSS();
    }
  });
}
// message passing from background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "Hello from backgroundscript!") {
    console.log(request.message);
    document.body.innerHTML = originalHTML;
    document.head.innerHTML = originalCSS;
  }
});
