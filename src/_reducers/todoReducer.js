import CommonString from "../api/CommonString";


/**
 * todo 리듀서
 */
const initState = {
  todoList: undefined
}

const todoReducer = (state=initState, action)=>{
  switch(action.type){
    case CommonString.ADD_TODO: {
      const todoList = {
        text:action.text,
        id: Date.now()
      }
      return {
        ...state,
        todoList
      }
    }
    case CommonString.DEL_TODO:
      const todoList = state.todoList.filter(toDo => toDo !== action.id);
      return {
        ...state,
        todoList
      }
    default: {
      return state
    }
  }
}

export default todoReducer;