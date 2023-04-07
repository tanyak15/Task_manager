import {
  EDITTASK,
  DELETETASK,
  ADDTASK,
  FILTERTASKBYDATE,
  FILTERTASKBYSTATUS,
  FILTERTASKBYTITLE,
  REMOVEFILTER,
} from "../constants/TaskConstants";

// this whole reducer is tasksState
export const taskReducer = (
  taskState = { tasks: [], filterTasks: [], filterApplied: false },
  action
) => {
  let newState;
  switch (action.type) {
    case EDITTASK:
      // first of all apan index find karenge
      const index = taskState.tasks.findIndex(
        (itm) => itm.id === action.payload.task.id
      );
      // store previous state in some variable
      // update the new variable
      const newTasks = taskState.tasks;

      // update the filtered tasks also
      const filterIndex = taskState.filterTasks.findIndex(
        (itm) => itm.id === action.payload.task.id
      );

      const newFilteredTasks = taskState.filterTasks;
      if (filterIndex >= 0) {
        newFilteredTasks[filterIndex] = {
          ...newFilteredTasks[filterIndex],
          ...action.payload.task,
        };
      }
      newTasks[index] = { ...newTasks[index], ...action.payload.task };
      // set the new varibale as new tasks
      return { ...taskState, tasks: newTasks, filteredTasks: newFilteredTasks };
    // return state;

    // ----------------------------------------------------------------------------------//

    case DELETETASK:
      newState = taskState.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      const newFilteredTasks2 = taskState.filterTasks.filter(
        (task) => task.id !== action.payload.id
      );
      return { ...taskState, tasks: newState, filterTasks: newFilteredTasks2 };

    // ----------------------------------------------------------------------------------//

    case ADDTASK:
      const sameTask = taskState.tasks.find(
        (task) => task.title === action.payload.task.title
      );

      if (!sameTask?.title) {
        return {
          ...taskState,
          tasks: [action.payload.task, ...taskState.tasks],
        };
      } else {
        return { ...taskState };
      }
    // ----------------------------------------------------------------------------------//

    case FILTERTASKBYDATE:
      const filterResDate = taskState.tasks.filter(
        (task) => task.dueDate === action.payload.date
      );

      return { ...taskState, filterTasks: filterResDate, filterApplied: true };

    case FILTERTASKBYSTATUS:
      const filterResStatus = taskState.tasks.filter(
        (task) => task.status === action.payload.status
      );
      return {
        ...taskState,
        filterTasks: filterResStatus,
        filterApplied: true,
      };

    case FILTERTASKBYTITLE:
      const search = (objects, substring) => {
        // Create a regular expression that matches the substring at the beginning of the title or preceded by a space
        const regex = new RegExp(`(?:^|\\s)${substring}\\w*`, "i");

        // Use the regular expression to find all matching objects
        const matchingObjects = objects.filter((obj) => regex.test(obj.title));

        // Return the array of matching objects
        return matchingObjects;
      };
      const filterResTitle = search(taskState.tasks, action.payload.title);
      return { ...taskState, filterTasks: filterResTitle, filterApplied: true };

    // ----------------------------------------------------------------------------------//

    case REMOVEFILTER:
      return { ...taskState, filterTasks: [], filterApplied: false };

    default:
      return taskState;
  }
};

/*

// suupose yeh redux wali window hai
reduxState : {

  tasksState : taskReducer => { tasks:[ {id:'hello' , name:'pulkit' } , {id:'tello' , name:'divya' } , {id:'kello' , name:'ishan' } ] , loading:false , error : null }

  countState : counterReducer => { count:0 , user:'tanya' }
                    .
                    .
                    .
                    .
  otherStates : otherReduces
}

// useDispatch :-> reduxState ko update karne ke  

// useSelector :-> sirf use hota hai reduxState ko dekhne ke liye (not at all updating) , kewal dekhne ke liye
// use selector reduxState ko as parameter leta hai , then as return statement apan usme se kuch bhi le sakte hai

// jab bhi apan ko React ke andar apni state ko screen pe dikahna ho via components aur html elements , tab use karte hai 
// useState react ke app ke state change krne k kaam aati h (iska redux se koi link nhi h )
// dont confuse it with useState , useEffect etc


const countState =  useSelector((reduxState)=>{
  return reduxState.countState;
})

countState.count , countState.user 
 NOT ALLOWED ---- dipatch(actionCreator(countState.count , countState.user))


// specially for arrays 
NOT ALLOWED ---- tasksState.tasks.id // this is javascript error , not at all related to redux , react or anything
ALLOWED ---- tasksState.tasks[index].id


// IMPORTANT POINT
 jab bhi apan React me input lete hai kisi bhi cheej ka apan ko useState , onChange ke sath karna hi hota hai 
 in input ke saath jo bhi value ayegi un values se apan apni reduxState ko update kar sakte hai only and only via useDispatch

 // IMPORTANT POINT FOR REDUX --- action

 in reducer agar action ata hai toh uske anadar do cheeje hoti hai

 action.type ---> switch statement ispe lagate hai
 action.payload ---> ki madad se  apan apni reducerState ( tasksState , counState , etc) ko update krte h

 action.payload me kuch bhi aa sakta hai , a string , a number , an object , koi id , koi date , kuch bhi 
 woh apne updar depend karta hai apan ko kya need hai 


 // agar upar wali cheej humesa confusing lagti hai toh always set payload as object

 suppose -->

 // action Creators 
 const actionCreator1 = (id)=>{
  const type = "FIND";
  const payload = { id : id } // always make payload as object
  return { type , payload };
 }

 const actionCreator2 = (title , description)=>{
  const type = "CREATE";
  const post  =  { title , description }
  const payload = { post : post   } // always make payload as object
  return { type , payload };
 }

  const actionCreator3 = (name)=>{
  const type = "ADDNEWMEMEBR";
  const user = getUserDetailsByName(name)
  const payload = { user : user  } // always make payload as object
  return { type , payload }
 }


 // reducer 
 const reducer = ( reducerState = {  users: [] , posts : [] } , action )=>{
   switch(action.type){
      case "FIND": 
       let findPost = reducerState.posts.find(post=>post.id===action.payload.id);
       return { ...state };
      case "CREATE":
        state.posts looks like [{},{},{}]
        return { ...state , posts : [action.paylod.post , ...state.posts] } 
      case "ADDNEWMEMBER":
        return { ...state , users : [action.paylod.user , ...state.users] }
      case default: 
      return state; // always do this nahi toh error ayega
   }
 }


// agar mere pass tyeh array hai : -> [
  "sherry","berry","carry","merry", "berry"] , programeticlayy 3 aur 6 ki jagah 7 aur 8 dalna hai 

  const index = array.findIndex(item=>item==="berry");
  array[index] = 3;



*/
