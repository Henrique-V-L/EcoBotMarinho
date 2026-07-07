document.addEventListener('DOMContentLoaded', function() {
//evita que a pagina seja recarregada ao enviar o formulário, permitindo que os dados sejam salvos no localStorage e exibidos na página de resultados.  
    
    const formulario = document.getElementById('formulario');
    // Verifica se o formulário existe na página antes de adicionar o evento de envio
    
    if (formulario) {
        formulario.removeAttribute('method');
        formulario.removeAttribute('action');
        // Adiciona o evento de envio do formulário

        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            // Cria um objeto com os dados do formulário

            const novaResposta = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                cidade: document.getElementById('cidade').value,
                local: document.getElementById('local').value,
                residuo: document.getElementById('residuo').value,
                descricao: document.getElementById('descricao').value,
                impacto: document.querySelector('input[name="impacto"]:checked')?.value || 'Não informado',
                data: new Date().toLocaleDateString('pt-BR') // Adiciona a data do envio
            };
            // Recupera a lista existente do localStorage ou cria uma nova lista vazia

           
            let listaExistente = localStorage.getItem('todasRespostasEcoBot');
            listaExistente = listaExistente ? JSON.parse(listaExistente) : [];
            // Adiciona a nova resposta à lista existente e salva novamente no localStorage

            listaExistente.push(novaResposta);
            

            
            localStorage.setItem('todasRespostasEcoBot', JSON.stringify(listaExistente));

            window.location.href = 'resultados.html';

        });
    }

    
    const listaResultados = document.getElementById('listaResultados');
    
    if (listaResultados) {

        const dadosSalvos = localStorage.getItem('todasRespostasEcoBot');

        if (dadosSalvos) {
            const lista = JSON.parse(dadosSalvos);


            listaResultados.innerHTML = '';

            lista.reverse().forEach(function(dados) {
                // Adiciona cada conjunto de dados à lista de resultados na página de resultados
                listaResultados.innerHTML += `
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd; line-height: 1.6; margin-bottom: 20px; color: #333;">
                        <span style="font-size: 0.85em; color: #888; float: right;">Enviado em: ${dados.data}</span>
                        <h3 style="margin-top: 0; color: #0056b3;">Dados do Participante</h3>
                        <p><strong>Nome:</strong> ${dados.nome}</p>
                        <p><strong>Email:</strong> ${dados.email}</p>
                        <p><strong>Cidade:</strong> ${dados.cidade || 'Não informada'}</p>
                        
                        <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                        
                        <h3 style="color: #0056b3;">Proposta para o EcoBot</h3>
                        <p><strong>Local de Aplicação:</strong> ${dados.local ? dados.local.toUpperCase() : 'Não selecionado'}</p>
                        <p><strong>Tipo de Resíduo:</strong> ${dados.residuo ? dados.residuo.toUpperCase() : 'Não selecionado'}</p>
                        <p><strong>Ideia enviada:</strong> ${dados.descricao || 'Sem descrição.'}</p>
                        <p><strong>Impacto Esperado:</strong> ${dados.impacto.toUpperCase()}</p>
                    </div>
                `;
            });
        } else {
            listaResultados.innerHTML = `<p style="color: #666; font-style: italic;">Nenhuma contribuição foi enviada ainda. Vá até a página de formulário para participar!</p>`;
        }
    }
});