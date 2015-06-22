// todo: textarea size
// todo: 最後にスラッシュ有る無し問題
// todo: when too many pull requests

window.onload = function(){
    restore();
    document.getElementById("save-button").addEventListener("click", save);
};

// Saves options to chrome.storage.
function save() {
    var urls = document.getElementById("urls").value;
    chrome.storage.sync.set({urls: urls},function() {
        if (chrome.runtime.lastError) {
            showMessage("<font color='#FF0000'>Failed to save...</font>");
        } else {
            showMessage("Saved!");
        }
    });
}

function restore() {
    chrome.storage.sync.get(["urls"],function(items){
        document.getElementById("urls").value = items.urls || "";
    });
}

function showMessage(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
    setTimeout(function() {
        status.innerHTML = "";
    }, 3000);
}

