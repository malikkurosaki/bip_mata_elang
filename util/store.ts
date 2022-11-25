import { type } from "os"
import store from 'store2'

type nama = "listResult" | "apa"

// const useStore = (name: nama) => ({
//     get() {
//         return store.get(name)
//     },
//     set(value: any) {
//         store.set(name, value)
//     }
// })

function useStore<S = undefined>(name: nama) {
    function get() {
        let d: S = store.get(name)

        console.log("ini ada dimana")
        return d
    }

    function set(value: S) {
        store.set(name, value)
    }

    return {
        get,
        set
    }
}


// function useState2<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

export default useStore