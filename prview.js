window.onload = load;

// todo: design
function load(){
    chrome.storage.sync.get(["urls"],function(items){
        var prURLs = items.urls.split("\n").map(function(url){return url + "/pulls";});
        prURLs.forEach(function(url){
            var req = new XMLHttpRequest();
            req.onload = function(){
                // todo: 200じゃなかった時
                if (this.status === 200) {
                    var dom = new DOMParser().parseFromString(this.responseText, "text/html");
                    var prs = dom.getElementsByClassName("issue-title");
                    var liRepository = document.createElement("li");
                    var linkRepository = document.createElement("a");
                    linkRepository.href = url;
                    linkRepository.innerHTML = url;
                    liRepository.appendChild(linkRepository);
                    var container = document.createElement("ul");
                    while(prs.length > 0){
                        var anchors = prs[0].getElementsByTagName("a");
                        for (var i = 0; i < anchors.length; i++){
                            var urlOrigin = url.match(/https?:\/\/[^/]+/)[0];
                            anchors[i].href = urlOrigin + anchors[i].getAttribute("href");
                        }
                        var li = document.createElement("li");
                        li.appendChild(prs[0]);
                        container.appendChild(li);
                    }
                    liRepository.appendChild(container);
                    document.getElementById("contents").appendChild(liRepository);
                }
            };
            req.open("GET", url);
            req.send();
        });
    });
}
