require('interactjs')

export function testInteract() {

  const position = { x: 0, y: 0 }

  interact('.draggable')
    .draggable({
      listeners: {
        start (event) {
          console.log(event.type, event.target)
        },
        move (event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        },
      },
      startAxis: 'xy',
      lockAxis: 'start',
      modifiers: [
        interact.modifiers.snap()
      ]
    })
}
