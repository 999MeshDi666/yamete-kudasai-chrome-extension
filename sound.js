let changeSound = document.getElementById('changeSound')
let page = document.getElementById("buttonDiv");
let selectedClassName = "current"
let buttonOptions = [ "./images/yameteKudasai1.png", "./images/yameteKudasai2.png", "./images/yameteKudasai3.png","./images/yameteKudasai4.png"]

chrome.storage.sync.get("icon", ({icon}) =>{
    changeSound.style.backgroundImage = `url(${icon})`    
})



function handleButtonClick(e){
    const current = e.target.parentElement.querySelector(`.${selectedClassName}`)
    if(current && current !== e.target){
        current.classList.remove(selectedClassName)
    }
    let icon = e.target.dataset.icon;
    let sound = `./soundEffects/sound_${icon.substr(9, 14)}.mp3` 

    e.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ icon });
    chrome.storage.sync.set({ sound });
    changeSound.style.backgroundImage = `url(${icon})`    
}

function constructOptions(buttonIcons){
    chrome.storage.sync.get("icon", (data) =>{
        let currentIcon = data.icon

        for(let buttonIcon of buttonIcons){
            let button = document.createElement("button");
            button.dataset.icon = buttonIcon
            button.style.backgroundImage = `url(${buttonIcon})`
            if(buttonIcon === currentIcon){
                button.classList.add(selectedClassName)
            }

            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    })
    
    
    
}

constructOptions(buttonOptions)

document.addEventListener('keydown', function() {
    // const key = event.key;
    // console.log(key)
    chrome.extension.sendMessage({action: "play"})
    chrome.storage.sync.get("sound", ({sound}) =>{
        let currentSound = sound    
        chrome.runtime.sendMessage(({name: "currentSound", sound: currentSound}))
    })

});