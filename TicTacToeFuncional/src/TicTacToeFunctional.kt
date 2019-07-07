import org.w3c.dom.*
import kotlin.browser.*

fun imageX() = """<img width="60" height="60" src="img/x.png"/>"""
fun imageO() = """<img width="60" height="60" src="img/o.png"/>"""

/*
Preenche toda a célula com o texto para busca e classificação em outras funções
A criação do valor como elemento de Tabela cria um documento do tipo da celula setada no HTML do tipo TableCell
 */
fun fillX(pos: String){
    val x = getElement(pos) as HTMLTableCellElement
    x.innerHTML = "X"
}

fun fillO(pos: String){
    val x = getElement(pos) as HTMLTableCellElement
    x.innerHTML = "O"
}
//Facilita a escrita e reduz a quantidade de código
fun getElement(id: String): HTMLElement{
    return document.getElementById(id) as HTMLElement
}

class Player(var nome: String,val icon: String) //classe criada pra poder setar os dois jogadores do jogo
var playerX = Player("xPlayer", "X")
var playerO = Player("oPlayer", "O")
var player:Player = Player("Padrão","-") //primeiro jogador instanciado para manipulação
var roundsCounter = 0 //contador para poder ser visualizado no navegador a quantidade de jogadas
var instCounter = 0 //contador para quantas vezes a recursao retornou verdadeira


fun fillCellSpecific(pos: String,type: Player){
    val cell = getElement(pos) as HTMLTableCellElement
    val turnNumber = getElement("TurnNumber")
    val turnIcon = getElement("TurnIcon")

    if(cell.textContent.equals("-")) {
        roundsCounter++
        if (type.equals(playerO)) {
            cell.style.background = "green"
            fillO(pos)
            turnNumber.innerHTML = (roundsCounter).toString()
            player = playerX
            println(cell.textContent)
            turnIcon.innerHTML = playerX.icon
        }

        if (type.equals(playerX)) {
            cell.style.background = "orange"
            fillX(pos)
            turnNumber.innerHTML = (roundsCounter).toString()
            player = playerO
            println(cell.textContent)
            turnIcon.innerHTML = playerO.icon
        }

        //checar se ja ha alguma regiao preenchida
        checkGame()
    }
    else{
        println("Já preenchido! Tente outro")
        //Colocar um else com InnerHTML pra mostrar ao usuario que ja foi preenchido por outro jogador
    }

}

fun checkGame(){
    if(roundsCounter<5) {
        println("not enough moves")
    }
    else{
        println("five moves or more have been played. Verifications started")
        diagonalAnalysis()
        antiDiagonalAnalysis()
        /*rowAnalysis(0)
        rowAnalysis(1)
        rowAnalysis(2)
        columnAnalysis(0)
        columnAnalysis(1)
        columnAnalysis(2)*/

        checkRows(0,0)
        checkColumns(0,0)

    }
}




fun checkRows(row:Int, column:Int){
    val currentCell = document.getElementById(row.toString() + column.toString())
    if(row<=2 && column<=2){
        when(currentCell!!.textContent){
            "-" -> {checkRows(row+1, 0); instCounter = 0;println("jumped row"+row)}
            else -> {checkRows(row, column+1); instCounter++;println("stayed on row" + row)}
        }

    }

    if(instCounter == 3){
        rowAnalysis(row)
    }
}

fun checkColumns(row: Int,column: Int){
    val currentCell = document.getElementById(row.toString() + column.toString())
    if(row<=2 && column<=2){
        when(currentCell!!.textContent){
            "-" -> {checkColumns(0,column+1 ); instCounter = 0;println("jumped column"+column)}
            else -> {checkColumns(row+1, column); instCounter++;println("stayed on column"+column)}
        }

    }

    if(instCounter == 3){
        columnAnalysis(column)
    }
}

fun rowAnalysis(row: Int){
    val first = getElement(row.toString()+0.toString()).textContent
    val second = getElement(row.toString()+1.toString()).textContent
    val third = getElement(row.toString()+2.toString()).textContent

    println("this is the returned row "+ row)

    if(first==second){
        if(second==third){
            println("we have a winner! "+ first + " on row " + row.toString())
            callWinner(first!!)
        }
    }
}

fun columnAnalysis(column: Int){
    val first = getElement(0.toString() + column.toString()).textContent
    val second = getElement(1.toString() + column.toString()).textContent
    val third = getElement(2.toString() + column.toString()).textContent

    println("this is the returned column "+ column)

    if(first==second){
        if(second==third){
            println("we have a winner! "+ first + " on column " + column.toString())
            callWinner(first!!)
        }
    }
}

fun diagonalAnalysis(){
    val first = getElement(0.toString() + 0.toString()).textContent
    val second = getElement(1.toString() + 1.toString()).textContent
    val third = getElement(2.toString() + 2.toString()).textContent

    if(first==second){
        if(second==third){
            println("we have a winner! "+ first + " on the diagonal ")
            callWinner(first!!)
        }
    }
}

fun antiDiagonalAnalysis(){
    val first = getElement(2.toString() + 0.toString()).textContent
    val second = getElement(1.toString() + 1.toString()).textContent
    val third = getElement(0.toString() + 2.toString()).textContent

    if(first==second){
        if(second==third){
            println("we have a winner! "+ first + " on the anti diagonal! ")
            callWinner(first!!)
        }
    }
}


fun callWinner(winner:String){
    if(winner == "X"){
        println("PARABENS! ${playerX.nome} ganhou")
        showResult(playerX)
    }
    else if(winner=="O"){
        println("PARABENS! ${playerO.nome} ganhou")
        showResult(playerO)
    }
    else{
        showResult(player)
    }

}

fun showResult(player: Player):Boolean {
    when(player.icon){
        "O" -> {
            window.alert("Parabéns pela vitória, " + player.nome)
            return true

        }
        "X" -> {
            window.alert("Parabéns pela vitória, " + player.nome)

            return true
        }
    }

    return false
}





@JsName("fillCell")
fun fillCell(pos: String):Unit{
    if((player == playerO)) {
        fillCellSpecific(pos,playerO)
    } else {
        //Primeira Jogada, já que o else engloba o -
        fillCellSpecific(pos,playerX)
    }
}



