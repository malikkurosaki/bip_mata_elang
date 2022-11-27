// import { type } from "os"
// import store from 'store2'

// type nama = "listResult" | "apa"

// // const useStore = (name: nama) => ({
// //     get() {
// //         return store.get(name)
// //     },
// //     set(value: any) {
// //         store.set(name, value)
// //     }
// // })


// function useStore<S>(name: nama) {
//     return ({
//         get(): S {
//             return store.get(name)
//         },
//         set(value: S) {
//             store.set(name, value)
//         }
//     })
// }


// // function useState2<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
// // function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

// export default useStore