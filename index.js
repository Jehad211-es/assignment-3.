// Part1: Node Internals (3 Grades):

//1 
//event loop مسئوله عن انها تنظ ال async operations بدل ما اوقف الmain thread
//يعني هي لو لقت ال main thread block مش بتدخله reqs
//لكن لو لقته idel بتبدا تتدخله reqs وتنظم ال reqs بين ال main thread w libuv



//2
// مجموعه من ال threads بتستخدمها node js عشان تنفذ ال operations البتاخد وقت من غير ما تعطل شغل ال main thread 



//3
//node js when it comes to aysnc operation dliverd to libuv to handel it without stop work of main thread  so main thread can handle other operations When the operation is completed the result goes back to the Event Loop ال  callback نفسها بتتنفذ على الـ Main Thread.
// بس الفكرة إن العملية اللي بتاخد وقت هي اللي بنطلعها برا الـ Main Threadمش ال ـ callback


//4
// Call Stack
// = الكود اللي بيتنفذ دلوقتي

// Event Queue
// =ال Callbacks اللي خلصت ومستنية دورها

// Event Loop
// = اللي بتشوف ال Call Stack فاضي ولا لأ
// // ولو فاضي تجيب Callback من الـ Queue وتحطها فيه

 //5
// ال Thread Pool عبارة عن مجموعة منال threads جوه Libuv  بتستخدمها Node.js لتنفيذ بعض العمليات اللي بتاخد وقت  عشان ما تعطلش ال  Main Thread
//exp:
// operations related to Cryptography
// async methods I/O [fs]
// DNS lockup >> http://facebook.com >> DNS >> IP
// compression >> gzlib >>
// والـ Thread Pool في Node.js بيكون افتراضيًا 4 threads
// ولو عايزين نغير العدد
// process.env.UV_THREADPOOL_SIZE = 8;


//6
// blocking code makes the main thread wait until the operation is completed while non blocking code allows the main thread to continue other tasks while the operation is running asynchronously



//Part2: Simple CRUD Operations Using Express.js:
//1
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 

// app.post('/user',
//   express.json(),
//       async (req, res) => {
// const {id,name ,pass , email}=req.body;

// let users = await fs.readFile('./users.json',{encoding:"utf-8"})
// users = JSON.parse(users);
// const userExist = users.find((user) => user.email === email);
// if (userExist)
// {
//      return res.json({
//         message: "Email already exists",
//         success: false
//     })

// }
//    users.push({
//             id,
//             name,
//             pass,
//             email
//         });
//         users = JSON.stringify(users);
//         await fs.writeFile("./users.json",users)
//           return res.json({
//             message: "user added successfully",
//             success: true
//         });
//       }

// )
// app.listen(3000, () => {
//     console.log('server is running on port 3000');
// });




// //2
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
//  app.put('/user/:id' ,
//   express.json(),
//   async(req,res)=>
//   {
// const {id}= req.params;
// let users =await fs.readFile("./users.json",{encoding:"utf-8"});
//  users = JSON.parse(users);
// const useridx =users.findIndex((user)=>(user.id===parseInt(id)));
// if(useridx===-1)
// {
//      return res.json({message: "user not found", success: false})
// }
// Object.assign(users[useridx], req.body);
//  users = JSON.stringify(users);
//    await fs.writeFile('./users.json', users);
//      return res.json({
//             message: "user updated successfully",
//             success: true
//         });
//   }
//  )
//  app.listen(3001, () => {
//     console.log('server is running on port 3001');
// });




// 3
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
// app.delete('/user/:id',
//   async(req,res)=>
//   {
//     const {id}=req.params;
//     let users = await fs.readFile('./users.json',{encoding:"utf-8"});
//     users =JSON.parse(users);
//     const useridx =users.findIndex((user)=>(user.id===parseInt(id)));
//     if(useridx===-1){
//       return res.json({message: "user not found", success: false})
//     }
//        users.splice(useridx, 1);
//         users = JSON.stringify(users);
//         await fs.writeFile('./users.json', users);
//          return res.json({
//             message: "user deleted successfully",
//             success: true
//         })
    

//   })

//    app.listen(3002, () => {
//     console.log('server is running on port 3002');
// });




// 4
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
// app.get('/user/getByName',
//   async(req,res)=>{
//     const {name} = req.query ;
// let users = await fs.readFile("./users.json",{encoding:"utf-8"})
// users = JSON.parse(users);
// const user = users.find((user) => user.name === name);
// if(!user){
//    return res.json({
//             message: "user not found",
//             success: false
//         })
// }
// res.json({
//   user,
//     message: "user found",
//             success: true
// })
//   }
// )
//    app.listen(3003, () => {
//     console.log('server is running on port 3003');
// }); 



//5
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
// app.get("/user",
//   async(req,res)=>{
// let users = await fs.readFile('./users.json',{encoding:"utf-8"});
// users=JSON.parse(users);
// res.send({
//   users,
//    message: "users ",      success: true
  
// })
// }) 
//    app.listen(3004, () => {
//     console.log('server is running on port 3004');
// }); 

//6
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
// app.get('/user/filter',
//   async(req,res)=>
//   {
//     const {minAge}= req.query;
//     let users = await fs.readFile('./users.json',{encoding:"utf-8"});
//     users =JSON.parse(users);
//     const filteredUsers = users.filter((user) => user.age >= parseInt(minAge));
//        return res.json({
//             users: filteredUsers,
//             success: true
//         });
//   }
// )
//    app.listen(3009, () => {
//     console.log('server is running on port 3009');
// }); 


// 7
// const express  = require("express");
// const fs = require('fs/promises');
// const app = express(); 
// app.get('/user/:id',
//   async(req,res)=>{
//     const {id} = req.params;
//     let users = await fs.readFile('./users.json',{encoding:'utf-8'});
// users = JSON.parse(users);
// const useridx = users.findIndex((user) => user.id === parseInt(id));
// if(useridx===-1){
//   res.json({
// message: "user not  found",
//          success: false
//   })

// }
// res.json(users[useridx]);

// }
 
// )
//    app.listen(3005, () => {
//     console.log('server is running on port 3005');
// }); 