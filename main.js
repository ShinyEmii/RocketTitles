const presets = {
    "Default": ["9FA4A8"],
    "Developer": ["00FFAA", "00FFFF"],
    "Special": ["00FFAA"],
    "Legacy Champion": ["FFEB5C", "FFA300"],
    "RLCS": ["AEF7FF", "43AFFF"],
    "RLCS Challenger": ["43CDFF", "9966CC"],
    "Tourney Lime": ["9BFF00"],
    "Tourney Pink": ["FF8DDD", "FF8DDD"],
    "GC": ["FF2800", "FF2800"],
    "SSL": ["E8E8E8", "E8E8E8"]
};

const titles = [];

window.addEventListener("resize", () => {
    for (let i = 0; i < titles.length; i++) 
        resizeTitle(i);
})

const openMenu = (index) => {
    const menu = document.querySelector(".menu");
    const input = document.querySelector("#title");
    const inputColor = document.querySelector("#color");
    const inputGlowColor = document.querySelector("#glow");
    const presetsSelect = document.querySelector("#presets");
    presetsSelect.value = "";
    const title = titles[index];
    input.value = title.innerText;
    let colors = JSON.parse(title.getAttribute("color"));
    inputColor.value = colors[0];
    if (colors.length > 1)
        inputGlowColor.value = colors[1];
    else 
        inputGlowColor.value = "";
    presetsSelect.onchange = (e) => {
        colors = presets[presetsSelect.value];
        setTitleColor(index, colors);
        inputColor.value = colors[0];
        if (colors.length > 1)
            inputGlowColor.value = colors[1];
        else 
            inputGlowColor.value = "";
    }
    input.oninput = (e) => setTitleName(index, e.target.value);
    inputColor.oninput = (e) => {
        colors[0] = e.target.value;
        setTitleColor(index, colors);
    }
    inputGlowColor.oninput = (e) => {
        colors[1] = e.target.value;
        setTitleColor(index, colors);
    }
    menu.style.height = "15%";
}

const closeMenu = () => {
    const menu = document.querySelector(".menu");
    menu.style.height = "0%";
}

document.addEventListener("DOMContentLoaded", () => {
    const titleElements = document.querySelectorAll(".title");
    const presetsSelect = document.querySelector("#presets");
    for (const preset in presets) {
        let option = document.createElement("option");
        option.value = preset;
        option.innerHTML = preset;
        presetsSelect.appendChild(option);
    }
    for (const title of titleElements)
        titles.push(title);
    for (let i = 0; i < titles.length; i++) {
        resizeTitle(i);
        setTitleColor(i, presets["Default"])
        titles[i].onclick = () => openMenu(i);
    }
});

const hexToText = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3)
        hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
    return hexToText("#9fa4a8");
}

const setTitle = (index, name, color) => {
    setTitleName(index, name);
    setTitleColor(index, color);
}

const setTitleName = (index, name) => {
    let title = titles[index];
    title.innerText = name;
    resizeTitle(index);
}

const setTitleColor = (index, color) => {
    let title = titles[index];
    let colorText = hexToText(color[0]);
    title.style.color = `rgb(${colorText})`;
    title.setAttribute("color", JSON.stringify(color));
    if (color[1] != null) {
        let glowText = hexToText(color[1]);
        title.style.textShadow = `0 0 calc((3 / 2560) * 100vw) rgba(${colorText}, 0.3), 0 0 calc((14 / 2560) * 100vw) rgba(${glowText}, 0.6), 0 0 calc((18 / 2560) * 100vw) rgb(${glowText})`;
    } else {
        title.style.textShadow = ``;
    }
}

const resizeTitle = (index) => {    
    let initial = 1;
    let title = titles[index];
    title.style.transform = `scale(${initial}, ${initial})`;
    
    while (title.scrollWidth * initial > title.offsetWidth) {
      initial -= 0.005;
      title.style.transform = `scale(${initial}, ${initial})`;
    }
}