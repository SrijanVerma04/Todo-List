import React, { useEffect, useState , useRef} from 'react'
import { Todo } from '../model'
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {MdDone} from "react-icons/md"

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    //filter returns an array containing the element that satisfies the conditions.!!
    const handleDelete = (id : number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id? {...todo, isDone: !todo.isDone}: todo ));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo , todo: editTodo} : todo
        )))

        setEdit(false);
    }

    // to maintain the focus after clicking the edit button .
    useEffect(() => {
      inputRef.current?.focus();
    }, [edit])
    

    const inputRef = useRef <HTMLInputElement> (null)


  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e , todo.id)}>

        {
            edit ? (
                
                <input type="text" className='todos__single--text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} ref={inputRef}/>

            ) : (
                    todo.isDone ? (
                        <s className='todos__single--text'>
                            {todo.todo}
                        </s>
                    ) : (
                        <span className='todos__single--text'>
                            {todo.todo}
                        </span>
                    )
            )

        }

        
       

        <div>
            <span className='icon' onClick={() => {
                if(!edit && !todo.isDone){
                    setEdit(!edit);
                }
              }  
            }>
                <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handleDone(todo.id)}>
                <MdDone />
            </span>
        </div>
    </form>
  )
}

export default SingleTodo