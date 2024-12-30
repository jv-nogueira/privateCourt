document.addEventListener("keydown", function(event) {
    if (event.keyCode === 113) { // F2 para iniciar
        console.log("F2 pressionado, verificando IDs na página...");

        // Solicitar ao usuário para inserir os IDs separados por vírgula
        const inputIDs = prompt("Insira os IDs dos usuários, separados por vírgula:");
        if (inputIDs) {
            // Processar a string de IDs fornecida pelo usuário
            const valoresUserID = inputIDs.split(',').map(id => id.trim());
            console.log("IDs inseridos:", valoresUserID);

            // Pega os elementos da página e verifica se o userID está na lista fornecida
            const profileNames = document.querySelectorAll("[data-ad-rendering-role='profile_name']");
            const commitsNames = document.querySelectorAll("[role='article']")
        
                for (let i = 0; i < profileNames.length; i++) {
                    // Pega o ID do usuário infrator
                    const userIDMatch = profileNames[i].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);
                    const userIDMatchCommit = commitsNames[i+1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);
                    
                    if(valoresUserID.some(id => userIDMatchCommit.includes(id))){
                        commitsNames[i+1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].style.color = "red";
                    }else{console.log("Os valores commit não aparecem "+i+1)}

                    // Verifica se o input está no userID
                    if (valoresUserID.some(id => userIDMatch.includes(id))) {
                        // Muda a cor do nome para vermelho
                        profileNames[i].children[0].children[0].children[0].children[0].style.color = "red";
                    }else{console.log("Os valores post não apareceram "+i)}
                }
        } else {
            console.log("Nenhum ID foi inserido.");
        }
    }
});
