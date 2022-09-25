import * as ex from 'excalibur'

export class EndScreen extends ex.Scene {
    onActivate(_context: ex.SceneActivationContext<unknown>): void {
        const ui = document.getElementById('ui')
        const game = _context.engine
        // Add a CSS class to `ui` that helps indicate which scene is being displayed
        ui.classList.add('MainMenu')

        // Create a <button /> element
        const btnStart = document.createElement('button')

        // Style it outside JavaScript for ease of use
        btnStart.className = 'button button--start'
        btnStart.innerText = 'You have won the game'
        btnStart.style.zIndex = '1000'
        btnStart.style.background = 'white'
        btnStart.style.padding = '15px 40px'
        btnStart.style.borderRadius = '40px'

        btnStart.style.border = 'none'

        // Handle the DOM click event
        btnStart.onclick = (e) => {
            e.preventDefault()

            // Transition the game to the new scene
            game.goToScene('start')
        }

        // Append the <button /> to our `ui` container
        ui.appendChild(btnStart)
    }

    onDeactivate() {
        // Ensure we cleanup the DOM and remove any children when transitioning scenes
        ui.classList.remove('MainMenu')
        ui.innerHTML = ''
    }
}
