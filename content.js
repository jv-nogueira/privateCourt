async function startFlags() { 

        // URL da planilha CSV
        const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9v7ggaDK4SnnG7PqCIYV7vlroNWLgIW8MdOkz_PBCpnpJmBmM_dMDk1KqDIK982cK9EsdajNUoCwG/pub?gid=0&single=true&output=csv";

        try {
            // Fetch do CSV
            const response = await fetch(csvUrl);
            if (!response.ok) {
                throw new Error("Erro ao acessar a planilha: " + response.statusText);
            }

            // Processa o CSV para extrair a coluna C (IDs)
            const csvText = await response.text();
            const rows = csvText.split("\n");
            const valoresUserID = rows
                .slice(1) // Ignorar o cabeçalho
                .map(row => row.split(",")[2]?.trim()) // Coluna C
                .filter(Boolean); // Remove valores inválidos

            console.log("IDs obtidos da planilha:", valoresUserID);
            // Verifica os perfis das publicações
            const profileNames = document.querySelectorAll("[data-ad-rendering-role='profile_name']");
            for (let i = 0; i < profileNames.length; i++) {
                console.log("O numero do indice profile é "+i)
                // Pega o ID do usuário infrator


                try {
                var userIDMatchProfile1 = profileNames[i].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);

                if(valoresUserID.some(id => userIDMatchProfile1.includes(id))){
                    console.log("APARECEU PROFILE!!!")
                    try{
                        profileNames[i].children[0].children[0].children[0].children[0].children[0].children[0].style.color = "red"
                    } catch{
                        console.log("Cor do profile deu erro")
                    }
                }else{console.log("Os valores profile não aparecem "+i)}  
            } catch{
                console.log("não encontrado userIDMatchProfile1")
                try{
                var userIDMatchProfile2 = profileNames[i].children[0].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);

                if(valoresUserID.some(id => userIDMatchProfile2.includes(id))){
                    console.log("APARECEU PROFILE!!!")
                    try{
                        profileNames[i].children[0].children[0].children[0].children[0].children[0].children[0].style.color = "red"
                    } catch{
                        console.log("Cor do profile deu erro")
                    }
                }else{console.log("Os valores profile não aparecem "+i)} 
            }catch {
                    console.log("não encontrado userIDMatchProfile2")
                }
            }
            }

            // Verifica os perfis dos commits das publicações
            const commitsNames = document.querySelectorAll("[role='article']");
            for (let i = 0; i < commitsNames.length; i++) {
                console.log("O numero do indice commits é "+i)
                // Pega o ID do usuário infrator
                try{
                    var userIDMatchCommit3 = commitsNames[i + 1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);

                    if(valoresUserID.some(id => userIDMatchCommit3.includes(id))){
                        console.log("APARECEU COMMIT!!!")
                        try{
                            commitsNames[i+1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].style.color = "red";
                        } catch{
                            console.log("Cor do commit 1 deu erro")
                        }
                    }else{console.log("Os valores commit3 não aparecem "+(i+1))}  
                } catch {
                    console.log("Erro commit 3")
                    try{
                        var userIDMatchCommit2 = commitsNames[i + 1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].href.match(/user\/(\d+)\//);
                        if(valoresUserID.some(id => userIDMatchCommit2.includes(id))){
                            console.log("APARECEU COMMIT 2")
                            try{
                                commitsNames[i+1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].style.color = "red";
                            } catch{
                                console.log("Cor do commit 2 deu erro")
                            }
                        }else{console.log("Os valores commit2 não aparecem "+(i+1))} 
                    } catch{
                        console.log("Erro commit 2")
                    }
                }
            };
        } catch (error) {
            console.error("Erro ao acessar ou processar a planilha:", error);
        };
}

if(document.domain == "www.facebook.com") {
// Inicializa o contador
let updateCounter = 0;

// Função para registrar alterações no feed
function observeFeed() {
    // Seleciona o elemento do feed (ajuste o seletor conforme necessário)
    const feedElement = document.querySelector('*');

    // Configura o MutationObserver para monitorar alterações no feed
    const observer = new MutationObserver(() => {
        updateCounter++;
        startFlags()
    });

    // Inicia a observação de alterações no feed
    observer.observe(feedElement, {
        childList: true, // Observa a adição/remoção de elementos
        subtree: true,   // Observa alterações em elementos descendentes
    });
    console.log('Observando atualizações na página...');
}

// Aguarda o carregamento completo da página para iniciar o observer
window.addEventListener('load', () => {
  observeFeed();
});
}
