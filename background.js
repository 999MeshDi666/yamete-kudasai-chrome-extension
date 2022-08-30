let sound = "./soundEffects/sound_yameteKudasai1.mp3"
let icon = "./images/yameteKudasai1.png"



chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({sound})
    chrome.storage.sync.set({icon});
    console.log(" set default sound and icon")
})

chrome.runtime.onMessage.addListener((msg, sender, response)=>{
    if(msg.name === "currentSound"){
        let soundPath = msg.sound;
        let audio = new Audio(soundPath)
        audio.play()
    }
})
