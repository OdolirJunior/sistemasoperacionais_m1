## Trabalho M1 - SO

### Odolir Junior

#### Instalação:
- Deve possuir o node.js instalado
- Na raiz do projeto executar o comando ``npm install``
  
#### Execução: 
- Na raiz do projeto executar o comando ``node index.js``
- Em uma ferramenta como Insominia, executar uma chamada POST na url 
   <br/> ``localhost:5000/solve-sudoku``
  <br/>
  para execução de threads de acordo com a quantidade de nucleos no processador.
  <br/>
  ``
  body: 
  {
	"sudoku": [
  1, 5, 1, 3, 6, 2, 7, 0, 0,
	0, 4, 0, 0, 5, 8, 0, 0, 0,
	0, 0, 0, 4, 0, 0, 0, 2, 5,
	0, 8, 0, 0, 0, 0, 9, 0, 3,
	0, 0, 0, 0, 0, 0, 0, 0, 0,
	7, 0, 5, 0, 0, 0, 0, 8, 0,
	1, 2, 0, 0, 0, 9, 0, 0, 0,
	0, 0, 0, 2, 8, 0, 0, 6, 0,
	0, 0, 8, 5, 3, 4, 2, 9, 0]
}
  ``
  <br/>

  ``localhost:5000/solve-sudoku-normal``
    <br/>
  para execução de uma thread.
