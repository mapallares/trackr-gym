/* 

███╗░░██╗░█████╗░██╗░░░██╗░█████╗░████████╗░█████╗░
████╗░██║██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝██╔══██╗
██╔██╗██║██║░░██║╚██╗░██╔╝███████║░░░██║░░░██║░░██║
██║╚████║██║░░██║░╚████╔╝░██╔══██║░░░██║░░░██║░░██║
██║░╚███║╚█████╔╝░░╚██╔╝░░██║░░██║░░░██║░░░╚█████╔╝
╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░░╚════╝░
NOVATO Development - Functions Tools 2.2.7v
Copyright NOVATO Corporation 2023

ECMA Script 6 (Modular ver.)
-> import * as novato from '/novato/novato.mjs';
-> import { nameTool } from '/novato/novato..mjs'

*/

//Validate Image

export function isValidImageType(fileType) {
    return /^image\//.test(fileType);
}

// Value of JSON text

export function valueOfJSONText(jsonText, value) {
    let v = undefined;
    try {
        v = JSON.parse(jsonText)[value];
    } catch (error) {
        v = null;
    }
    return v;
}

//Filter Rendered Elements

export function filterRenderedElements(filter, container, selector) {
    filter = filter.toUpperCase();
    let elements = container.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      let value = elements[i].textContent || elements[i].innerText;
      value.toUpperCase().indexOf(filter) > -1 
      ? elements[i].style.display = "" 
      : elements[i].style.display = "none";
    }
  }

export function clipboard(textToCopy) {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            const successful = document.execCommand("copy");
        } catch (err) {
            console.error("Error al copiar contenido:", err);
        }
        document.body.removeChild(textArea);
}

export function randomNumber(min, max, inclusive) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if(inclusive) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    else {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export function UUID() {
    let d = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c == "x" ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function ID(length = 16) {
    var id = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i <= length; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        id += str.charAt(char);
    } 
    return id;
}

export function TIME() {
    return new Date().getTime();
}

export function DATE() {
    return new Date();
}

export function UDC(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Genera un color en tonos pastel en HSL aleatorio

export function cakeColorHSL() {
    let h = Math.floor(Math.random() * 360);
    return `hsl(${h}deg, 55%, 85%)`;
}

//Genera un color RGB aleatorio

export function colorRGB() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

//Dado un mail obtener el nombre de usuario

export function emailUsername(email) {
    var match = email.match(/^([^@]*)@.*$/);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}

//Retorna un string indicando hace que tiempo se creo o genero algo

export function CountdownDate(id) {
    let nowDate = new Date().getTime();
    let minutes = Math.round((nowDate - id) / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
    let weeks = Math.round(days / 7);
    let months = Math.round(days / 30);
    let years = Math.round(days / 365);
    let countdown = null;

    if (minutes < 60) {
        if (minutes <= 1) {
            countdown = "Hace un momento";
        }
        else {
            countdown = `Hace ${minutes} minutos`;
        }
    }

    else if (minutes >= 60 && minutes < 1440) {
        if (hours <= 1) {
            countdown = "Hace una hora";
        }
        else {
            countdown = `Hace ${hours} horas`;
        }
    }

    else if (minutes >= 1440 && minutes < 10080) {
        if (days <= 1) {
            countdown = "Hace un dí­a";
        }
        else {
            countdown = `Hace ${days} dí­as`;
        }
    }

    else if (minutes >= 10080 && minutes < 43800) {
        if (weeks <= 1) {
            countdown = "Hace una semana";
        }
        else {
            countdown = `Hace ${weeks} semanas`;
        }
    }

    else if (minutes >= 43800 && minutes < 525600) {
        if (months <= 1) {
            countdown = "Hace un mes";
        }
        else {
            countdown = `Hace ${months} meses`;
        }
    }

    else {
        if (years <= 1) {
            countdown = "Hace un año";
        }
        else {
            countdown = `Hace ${years} años`;
        }
    }

    return countdown;
}

export function CountdownTime(id) {
    let nowDate = new Date().getTime();
    let minutes = Math.round((nowDate - id) / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
    let weeks = Math.round(days / 7);
    let months = Math.round(days / 30);
    let years = Math.round(days / 365);
    let countdown = null;

    if (minutes < 60) {
        if (minutes <= 1) {
            countdown = "Hace un momento";
        }
        else {
            countdown = `${minutes} minutos`;
        }
    }

    else if (minutes >= 60 && minutes < 1440) {
        if (hours <= 1) {
            countdown = "1h";
        }
        else {
            countdown = `${hours}h`;
        }
    }

    else if (minutes >= 1440 && minutes < 10080) {
        if (days <= 1) {
            countdown = "1d";
        }
        else {
            countdown = `${days}d`;
        }
    }

    else if (minutes >= 10080 && minutes < 43800) {
        if (weeks <= 1) {
            countdown = "1 semana";
        }
        else {
            countdown = `${weeks} semanas`;
        }
    }

    else if (minutes >= 43800 && minutes < 525600) {
        if (months <= 1) {
            countdown = "1 mes";
        }
        else {
            countdown = `${months} meses`;
        }
    }

    else {
        if (years <= 1) {
            countdown = "1 años";
        }
        else {
            countdown = `${years} años`;
        }
    }

    return countdown;
}

export function dateFormatter(date) {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    let months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${months[month]} ${day}, ${year}`;
}

export function dayFormatter(weekday, day, month) {
    let weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${weekdays[weekday]}, ${day} de ${months[month]}`;
}

export function dayFormatterDateText(date) {
    const parseDate = new Date(date);
    return dayFormatter(parseDate.getDay(), parseDate.getDate(), parseDate.getMonth()) + " de " + parseDate.getFullYear();
}

export function timeFormatter(time = new Date().getHours()) {
    let greetingTime = null;

    if (time >= 0 && time < 12) {
        greetingTime = "Buenos días";
    }

    else if (time >= 12 && time < 18) {
        greetingTime = "Buenas tardes";
    }

    else if (time >= 18 && time < 24) {
        greetingTime = "Buenas noches";
    }

    return greetingTime;
}

export function generateArrayInt(n, a, b) {
    var numeros = [];
    
    for (var i = 0; i < n; i++) {
      var numero = Math.floor(Math.random() * (b - a + 1)) + a;
      numeros.push(numero);
    }
    
    return numeros;
  }

export function visibility(mode, location) {
    let element = location instanceof HTMLElement ? location : document.querySelector(location);
    if (mode) {
        element.style.visibility = "visible";
        element.style.opacity = 1;
    }
    else {
        element.style.visibility = "hidden";
        element.style.opacity = 0;
    }
}

// Graphs

export function drawArea(data, width, height, type, colors, content) {
    data.unshift(0);
    const id = UUID();
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("class", "novato-area-chart-svg");
    svg.innerHTML = `
    <defs>
        <linearGradient id="gradiente-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="15%" style="stop-color: ${colors[0]};" />
        <stop offset="50%" style="stop-color: ${colors[1]};" />
        <stop offset="90%" style="stop-color: ${colors[2]};" />
        </linearGradient>
    </defs>
    <defs>
        <linearGradient id="gradiente-2-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: ${colors[0]};" />
            <stop offset="100%" style="stop-color: ${colors[0]};" />
        </linearGradient>
    </defs>
    `;

    const max = Math.max(...data) + 1;
    const min = Math.min(...data) + 1;

    const xScale = width / (data.length - 1);
    const yScale = height / (max - min);

    let areaPoints = `0,${height} `;
    for (let i = 0; i < data.length-1; i++) {
        areaPoints += `${i * xScale},${height - ((data[i] - min) * yScale)} `;
    }
    areaPoints += `${width},${height} 0,${height}`;
    const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    area.setAttribute("points", areaPoints);
    area.setAttribute("fill", `url(#gradiente-${id})`);
    area.setAttribute("fill-opacity", "0.1")

    let curvePoints = "";
    for (let i = 1; i < data.length-1; i++) {
        curvePoints += `${i * xScale},${height - ((data[i] - min) * yScale)} `;
    }
    const curve = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    curve.setAttribute("points", curvePoints);
    curve.setAttribute("stroke-width", "2px");
    curve.setAttribute("stroke-linejoin", "round");
    curve.setAttribute("stroke-linecap", "round")
    curve.setAttribute("stroke", `url(#gradiente-2-${id})`);
    curve.setAttribute("fill", "none");

    svg.appendChild(area);
    svg.appendChild(curve);
    content.innerHTML = "";
    content.appendChild(svg);
}

export function drawAreaChart(data, width, height, type, colors, content) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("class", "novato-area-chart-svg");
    svg.innerHTML = `
    <defs>
        <linearGradient id="gradiente" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="15%" style="stop-color: ${colors[0]};" />
        <stop offset="50%" style="stop-color: ${colors[1]};" />
        <stop offset="90%" style="stop-color: ${colors[2]};" />
        </linearGradient>
    </defs>
    <defs>
        <linearGradient id="gradiente2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: ${colors[0]};" />
            <stop offset="100%" style="stop-color: ${colors[1]};" />
        </linearGradient>
    </defs>
    `;

    const max = Math.max(...data) + 1;
    const min = Math.min(...data) + 1;

    const xScale = width / (data.length - 1);
    const yScale = height / (max - min);

    let areaPoints = `0,${height} `;
    for (let i = 0; i < data.length-1; i++) {
        areaPoints += `${i * xScale},${height - ((data[i] - min) * yScale)} `;
    }
    areaPoints += `${width},${height} 0,${height}`;
    const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    area.setAttribute("points", areaPoints);
    area.setAttribute("fill", "url(#gradiente)");
    area.setAttribute("fill-opacity", "0.3")

    let curvePoints = "";
    for (let i = 1; i < data.length-1; i++) {
        curvePoints += `${i * xScale},${height - ((data[i] - min) * yScale)} `;
    }
    const curve = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    curve.setAttribute("points", curvePoints);
    curve.setAttribute("stroke-width", "5px");
    curve.setAttribute("stroke-linejoin", "round");
    curve.setAttribute("stroke-linecap", "round")
    curve.setAttribute("stroke", "url(#gradiente2)");
    curve.setAttribute("fill", "none");

    svg.appendChild(area);
    svg.appendChild(curve);
    content.innerHTML = "";
    dataAreaChart(data, width, height, type, content);
    content.appendChild(svg);
}

function dataAreaChart(data, width, height, type, content) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const xScale = width / (data.length - 1);
    const yScale = height / (max - min);
    for (let i = 1; i < data.length-1; i++) {
        let interval = document.createElement("div");
        interval.classList.add("novato-area-chart-interval");
        interval.style.height = height + "px";
        interval.style.width = xScale + "px";
        interval.style.left = i * xScale + "px";
        interval.innerHTML = `<div class="novato-area-chart-interval-indicator" style="top: ${height - ((data[i] - min) * yScale) +30}px;">${data[i]}${type}</div>`;
        content.appendChild(interval);     
    }
}

export class Notify {
    constructor() {
        this.notifies = [];
    }

    async notice(message) {
        let notify = {
            "id": `notify-${novato.UUID()}`,
            "message": message,
        }
        this.notifies.push(notify.id);
        let notifyCard = document.createElement("div");
        notifyCard.classList.add("notify-card");
        notifyCard.setAttribute("id", notify.id);
        notifyCard.innerText = notify.message;
        notifyCard.style.top = (this.notifies.length * 60) + "px";
        notifyCard.addEventListener("click", () => {
            this.closeNotify(notify.id);
        });
        document.body.appendChild(notifyCard);
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 6000));
        this.closeNotify(notify.id);
    }
    
    async closeNotify(id) {
        let notifyCard = null;
        if(this.notifies.length > 0) {
            this.notifies.forEach(function(notify) {
                if(id == notify) {
                    if(document.getElementById(notify) != null) {
                        notifyCard = document.getElementById(id);
                        notifyCard.classList.add("notify-card-out");
                    }
                }
            });
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 1000));
            if(notifyCard != null) {
                notifyCard.remove();
            }
            this.notifies = this.notifies.filter(fil => fil != id);
            this.resizeNotifies();
        }
    }
    
    resizeNotifies() {
        if(this.notifies.length > 0) {
            this.notifies.forEach(function(notify, index) {
                if(document.getElementById(notify) != null) {
                    document.getElementById(notify).style.top = ((index + 1) * 60) + "px";
                }
            });
        }
    }
}

export const toString = {
    values: (data) => {
        let values = [];
        for (var key in data) {
            values.push(`'${data[key]}'`);
        }
        return values.toString();
    },
    keys: (data) => {
        let keys = [];
        for (var key in data) {
            keys.push(`"${key}"`);
        }
        return keys.toString();
    },
    equals: (data) => {
        let equals = [];
        for (var key in data) {
            equals.push(`"${key}" = '${data[key]}'`);
        }
        return equals.toString();
    }
}


//Dado un string genera los links si encuentra tags "#----";

export function Taggear(str) {
    const same = str;
    const pattern = /#[A-Za-z0-9:]+/g;
    const result = str.match(pattern);
    if (result != null) {
        result.forEach(function(tag){
            str = str.replace(tag, `<a class="pub-body-link" href="./search/?t=${tag.substring(1, tag.length)}">${tag}</a>`);
        });
        return str;
    }
    else {
        return same;
    }
}

export function Userear(str) {
    const same = str;
    const pattern = / @[A-Za-z0-9:]+/g;
    const result = str.match(pattern);
    if (result != null) {
        result.forEach(function(tag){
            str = str.replace(tag, `<a class="pub-body-link" href="./search/?a=${tag.substring(2, tag.length)}">${tag}</a>`);
        });
        return str;
    }
    else {
        return same;
    }    
}

export function Linkear(str) {
    const same = str;
    const pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    const result = str.match(pattern);
    if (result != null) {
        let pv = false;
        result.forEach(function(tag){
            if (tag.includes("https://") || tag.includes("http://")) {
                str = str.replace(tag, `<a class="pub-body-link" href="${tag}" target="blank_">${tag}</a>`);
            }
            else {
                str = str.replace(tag, `<a class="pub-body-link" href="https://${tag}" target="blank_">${tag}</a>`);
            }

            if (tag.includes("https://www.youtube.com/watch?v=") && pv == false) {
                let url = new URL(tag)
                let v = url.search.substring(3, url.search.length);
                str += `<iframe class="pub-youtube" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${v}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                pv = true;
            }
            else if (tag.includes("https://www.youtube.com/shorts/") && pv == false) {
                let v = tag.replace("https://www.youtube.com/shorts/", "");
                str += `<iframe class="pub-youtube" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${v}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                pv = true;
            }
            else if (tag.includes("https://open.spotify.com/album/") && pv == false) {
                let d = tag.replace("https://open.spotify.com/album/", "");
                str += `<iframe class="pub-spotify" style="border-radius:12px" src="https://open.spotify.com/embed/album/${d}?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                pv = true;
            }
            else if (tag.includes("https://open.spotify.com/track/") && pv == false) {
                let d = tag.replace("https://open.spotify.com/track/", "");
                str += `<iframe class="pub-spotify" style="border-radius:12px" src="https://open.spotify.com/embed/track/${d}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                pv = true;
            }
        });
        return str;
    }
    else {
        return same;
    }
}
