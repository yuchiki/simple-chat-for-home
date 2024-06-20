import { ToggleSet } from '../util/toggleSet.js'

type Message = { id: string, name: string, message: string, date: string }
type State = { name: string, message: string, messages: Message[], selectedRows: ToggleSet<string> }

export class StateManager {
  private _state: State = { name: '', message: '', messages: [], selectedRows: new ToggleSet() }
  render: () => void = () => {}

  get state(): State {
    return this._state
  }

  set state(value: State) {
    this._state = value
    this.render()
  }

  registerRender(render: () => void) {
    this.render = render
  }

  updateState(value: Partial<State>) {
    this.state = { ...this._state, ...value }
  }
}
