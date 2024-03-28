const sourceInput = document.getElementById("source-text");
const targetInput = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
let timeoutId;
let isLoading = false;
sourceInput.addEventListener("textarea", handleTyping);

function handleTyping() {

    clearTimeout(timeoutId)
    timeoutId = setTimeout(async() => {
        await translate();
    }, 1000);  
}

async function translate(){
    if (isLoading || !sourceInput.value) {
        return;
    }

    isLoading = true;
    const sourceLangChecked = Array.from(sourceLang).find(el => el.checked).value;
    const targetLangChecked = Array.from(sourceLang).find(el => el.checked).value;
    
    targetInput.value = targetInput.value === "Tradução" ? "Traduzindo..." : targetInput.value + "...";
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
    const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: new URLSearchParams({
        q:  sourceInput.value,
        target: targetLangChecked,
        source: sourceLangChecked
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        targetInput.value = result.data.translations[0].translatedText;
        console.log(result.data.translations[0].translatedText);
    } catch (error) {
        console.error(error);
    }
    finally {
        isLoading = false
    }
}



// 'use strict']


// const textareaTo = document.querySelector("#textareaTo")
// const selects = document.querySelectorAll("select")
// const textareaFrom = document.getElementById("textareaFrom");

// const modoEscuro = document.getElementById('modo')

// modoEscuro.addEventListener('click', () => {

//     if(modoEscuro.children[0].src.includes('sol')){
//         modoEscuro.children[0].src = './img/lua-crescente.png'
//     }else {
//         modoEscuro.children[0].src = './img/sol.png'
//     }

// })

// const languages = {

//     "pt-BR": "Português",
//     "en-US": "Inglês",
//     "de-DE": "Alemão",
//     "fr-FR": "Frances",
//     "es-ES": "Espanhol"

// };

// selects.forEach((tag) => {
//     for (let language in languages) {
//         let selectd
//         if (tag.className.includes("selectFrom") && language == "pt-BR") {
//             selectd = "selectd"
//         } else 
//         if (tag.className.includes("selectTo") && language == "en-GB" ) {
//             selectd = "selectd"
//         }
//         // A linha vai gerar uma opção HTML para um menu suspenso, com valores dinâmicos para atributos como "value" - definido dinamicamente com base na variavel.
//         const option = `<option value="${language}" ${selectd}>${languages[language]}</option>`;

//         // ultimo elemento a ser inserido
//         tag.inn("beforeend", option);
//     }
// })



// function teste () {
//     if (textareaFrom.value) {
//         assignTrasnlation();
//     } else {
//         textareaTo.value = "";
//     }
// }

// textareaFrom.addEventListener("keypress", () => {

// })

// function assignTrasnlation() {
//     fetch(`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`)
//     .then((res) => res.json())
//     .then((data) => {textareaTo.value = data.responseData.translatedText;})
// };