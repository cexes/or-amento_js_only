class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
       this.ano = ano
       this.mes = mes
       this.dia = dia
       this.tipo = tipo
       this.descricao = descricao
       this.valor = valor
    }

      
          
       validarDados() {
          for(let i in this){
             if(this[i] === null || this[i]=== "" || this[i] === undefined){
                return false
             }
          }
          return true
       }

}

  // Começo BD
class Bd{
      constructor(){
         let id = localStorage.getItem('id')

          if(id === null){
              localStorage.setItem('id',0)
      }
     }

    getProxId(){
          let prox = localStorage.getItem('id')
           return parseInt(prox) +1
    }
     gravar(d){
        let id = this.getProxId()
        localStorage.setItem(id, JSON.stringify(d))
         localStorage.setItem('id',id)
} 
 
      recuperarTodosRegistros(){
         let despesas = Array()
         let id  = localStorage.getItem('id')

         for(let i = 1; i<= id;i++){
            //recuperar despesa
               let despesa = JSON.parse(localStorage.getItem(i))

               //existe a possibilidade de haver indicies que foram pulados/removidos

                 if(despesa === null){
                     continue
                 }
                despesa.id = i   
                despesas.push(despesa)
                
         }
         return despesas
      }

       pesquisar(despesa){
          let filtradas = Array()
               
              filtradas = this.recuperarTodosRegistros()
              //anos, mes, dia, tipo, descricao e valor
            if(despesa.ano != ''){
              filtradas = filtradas.filter(i => i.ano == despesa.ano)
            }
            if(despesa.mes !=''){
               filtradas = filtradas.filter(i => i.mes == despesa.mes)
            }
            if(despesa.dia != ''){
               filtradas = filtradas.filter(i => i.dia == despesa.dia)
            }
            if(despesa.tipo != ''){
               filtradas = filtradas.filter(i => i.tipo == despesa.tipo)
            }
            if(despesa.descricao != ''){
               filtradas = filtradas.filter(i => i.descricao == despesa.descricao)
            }
            if(despesa.valor != ''){
               filtradas = filtradas.filter(i => i.valor == despesa.valor)
            }
            console.log(filtradas)
            return filtradas
       }

            //  Método Remover Despesa

            removerDespesa(id){

               localStorage.removeItem(id)

            }


}     // final BD
  
     let bd = new Bd()

     function cadastrarDespesa(){
         let ano =  document.getElementById('ano')
         let mes = document.getElementById('mes')
         let dia = document.getElementById('dia')
         let tipo = document.getElementById('tipo')
         let descricao = document.getElementById('descricao')
         let valor = document.getElementById('valor')


    let despesa = new Despesa(
             ano.value, 
             mes.value,
             dia.value, 
             tipo.value, 
             descricao.value, 
             valor.value
         )
      
         if(despesa.validarDados() === false){

            document.getElementById('titulo').innerHTML = 'Erro!'
            document.getElementById('classificacao').className = 'modal-header text-danger'
            document.getElementById('conteudo').innerHTML = 'Preencha todos os campos corretamente'
            document.getElementById('botao').className = "btn btn-danger"
            document.getElementById('botao').innerHTML ='Voltar e Corrigir'
            $('#SucessoErro').modal('show')
            
         } else{
             document.getElementById('titulo').innerHTML = 'Cadastrado com sucesso!!'
             document.getElementById('classificacao').className = 'modal-header text-success'
             document.getElementById('conteudo').innerHTML = 'Despesa inserida com sucesso'
             document.getElementById('botao').className ='btn btn-success'
             document.getElementById('botao').innerHTML = 'Voltar'
             $('#SucessoErro').modal('show')
             bd.gravar(despesa)
             ano.value = ''
             mes.value = ''
             dia.value = ''
             tipo.value = ''
             descricao.value ='' 
             valor.value = ''
         }
      }

     function carregaListaDespesa(despesas = Array(), filtro = false ){
            

           if(despesas.length == 0&& filtro == false){     
          despesas = bd.recuperarTodosRegistros()
         }

          let listaDespesas = document.getElementById('listaDespesas')
          listaDespesas.innerHTML = ''

         

          //percorreer o Array despesas, de forma dinamica

           despesas.forEach(function(i){
           
                //criar a Linha (tr)
                let linha = listaDespesas.insertRow()

                //criar colunas (td)
                linha.insertCell(0).innerHTML = `${i.dia} / ${i.mes}/ ${i.ano}`
                
                switch(i.tipo){
                   case '1': i.tipo = 'Alimentação'
                   break
                   
                   case '2': i.tipo = 'Educação'
                   break

                   case '3': i.tipo = 'Lazer'
                   break

                   case '4': i.tipo = 'Saúde'
                   break

                   case '4': i.tipo = 'Transporte'
                   break
                }
                linha.insertCell(1).innerHTML = i.tipo
                linha.insertCell(2).innerHTML = i.descricao
                linha.insertCell(3).innerHTML = i.valor
                
                // botão de exclusão

                let btn =  document.createElement('button')
                btn.className = 'btn btn-danger'
                btn.innerHTML = '<i class ="fas fa-times"</i>'
                btn.id = 'id_despesa_' + i.id
                btn.onclick = function(){
                   
                    
                    let id = this.id.replace('id_despesa_','')
                     bd.removerDespesa(id)
                     window.location.reload()
                }
                console.log(i)
                linha.insertCell(4).append(btn)

           })
         
         }

     

 function pesquisarDespesa(){
   
    let ano =  document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

      let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

      let despesas = bd.pesquisar(despesa)
        carregaListaDespesa(despesas,true)
      
   
     
     }