import LoginFB from "./component/LoginFB.jsx"
import useStore from "./store/store.js"

function App() {
    const { userData } = useStore()

    return (
        <>
            <LoginFB appId="700664738182285" classLogout="" />
            <button
                onClick={() => {
                    console.log(userData)
                }}
            >
                Obtener datos
            </button>
        </>
    )
}

export default App
