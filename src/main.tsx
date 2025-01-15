import { canvas, clearAllGameDatas, getFlag, narration } from '@drincs/pixi-vn'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { startLabel } from './labels/startLabel'
import './values/characters'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    canvas.initializeHTMLLayout(root)
    if (!canvas.htmlLayout) {
        throw new Error('htmlLayout not found')
    }
    const reactRoot = createRoot(canvas.htmlLayout)

    reactRoot.render(
        <App />
    )
})

narration.onGameEnd = async (props) => {
    let isTheEnd = getFlag("is_the_end")
    if (isTheEnd) {
        clearAllGameDatas()
        props.navigate('/')
    }
    else {
        narration.jumpLabel(startLabel, props)
    }
}

narration.onStepError = async (_error, { notify, t }) => {
    notify(t("allert_error_occurred"), "error")
}
