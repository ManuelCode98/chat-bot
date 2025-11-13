

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const modelIA = ()=>{ 


    const selectForm = document.querySelector('.chat-input-container');
    const selectChatMessages = document.querySelector('#chat-messages');
  

    selectForm.addEventListener( 'submit', (event) => {
        event.preventDefault();

        const question = event.target[0].value;

        selectChatMessages.innerHTML += `<div class="message user">${ question }<div>`

        event.target[0].value = '';

        // Esta funcion es la que hace la peticion a la api
        askTheApi( question, selectChatMessages )
    })

  

};

const askTheApi = ( question, selectChatMessages )=>{ 

    fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "moonshotai/kimi-k2:free",
      "messages": [
        {
          "role": "user",
          "content": `${ question }`
        }
      ]
    })
  })
  .then( res => res.json() )
  .then( data => {

    const response = data.choices[0].message.content;

    selectChatMessages.innerHTML += `<div class="message bot">${response}<div>`
  })

};









//  fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${}`,
//       "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//       "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "moonshotai/kimi-k2:free",
//       "messages": [
//         {
//           "role": "user",
//           "content": `${}`
//         }
//       ]
//     })
//   })