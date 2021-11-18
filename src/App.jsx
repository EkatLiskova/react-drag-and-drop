import React, {useState} from 'react';
import './App.css'

const App = () => {
    const [boards, setBoards] = useState([
        {id: 1, title:"TO DO", items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Выкинуть мусор'}] },
        {id: 2, title:"DOING", items: [{id: 3, title: 'Выпить воды'}, {id: 4, title: 'Помыть посуду'}] },
        {id: 3, title:"VERIFY", items: [{id: 5, title: 'Позвонить маме'}, {id: 6, title: 'Почистить зубы'}] }
    ])
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
      
    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item')
        {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }
    
    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id){
                return board
            }
            if (b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
    }

    function dropCardHandler(e, board){
        const currentId = board.items.map(item => item.id)
        if (!currentId.includes(currentItem.id)) {
            board.items.push(currentItem)
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                if (b.id === board.id){
                    return board
                }
                if (b.id === currentBoard.id){
                    return currentBoard
                }
                return b
            }))
        }   
    }
    return (
        <div className = 'app'>
            {boards.map(board =>
                <div className = 'board'
                    onDragOver = {(e) => dragOverHandler(e)}
                    onDrop = {(e) => dropCardHandler(e, board)}

                >
                    <div className = "board__title">
                        {board.title}
                    </div>
                    {board.items.map(item =>
                        <div 
                            onDragOver = {(e) => dragOverHandler(e)}
                            onDragLeave = {(e) => dragLeaveHandler(e)}
                            onDragStart = {(e) => dragStartHandler(e, board, item)}
                            onDragEnd = {(e) => dragEndHandler(e)}
                            onDrop = {(e) => dropHandler(e, board, item)}
                            className = "todo"
                            draggable = {true}
                            className = "item"
                        >
                            {item.title}
                        </div>
                        )}
                </div>)}
        </div>
        
        
    )
}

export default App