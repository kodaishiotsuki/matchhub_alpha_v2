// import { getAuth } from "firebase/auth";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   getFirestore,
//   onSnapshot,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { useState, useEffect, useRef } from "react";
// import { app } from "../../app/config/firebase";

// export default function UserTypePage() {
//   const [users, setUsers] = useState([]);
//   const db = getFirestore(app);
//   const auth = getAuth(app);

//   useEffect(() => {
//     const userId = auth.currentUser.uid;
//     const userDocumentRef = doc(db, "users", userId);
//     getDoc(userDocumentRef).then((documentSnapshot) => {
//       console.log(documentSnapshot.data());
//     });


    
//   }, [db, auth.currentUser.uid]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userType = event.target.value;
//     const userId = auth.currentUser.uid;
//     const userDocumentRef = doc(db, "users", userId);
//     await addDoc(userDocumentRef, {
//       userType: userType,
//     });
//     console.log(userType);
//   };

//   return (
//     <div style={{ margin: "50px" }}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>名前</label>
//           <input
//             name='userType'
//             type='text'
//             placeholder='名前'
//           />
//         </div>
//         <div>
//           <button>登録</button>
//         </div>
//       </form>
//       <h1>ユーザ一覧</h1>
//       <div>
//         {users.map((user) => (
//           <div key={user.id}>{user.userType}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
