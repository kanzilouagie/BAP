class InputManager {
  constructor() {
    this.keys = {};
    const keyMap = new Map();
    this.isEnabled = false;

    const setKey = (keyName, pressed) => {
      const keyState = this.keys[keyName];
      keyState.justPressed = pressed && !keyState.down;
      keyState.down = pressed;
    };

    const addKey = (keyCode, name) => {
      this.keys[name] = { down: false, justPressed: false };
      keyMap.set(keyCode, name);
    };

    this.setKeyFromKeyCode = (keyCode, pressed) => {
      const keyName = keyMap.get(keyCode);
      if (!keyName) {
        return;
      }
      setKey(keyName, pressed);
    };

    addKey(37, 'left');
    addKey(39, 'right');
    addKey(38, 'up');
    addKey(40, 'down');
    addKey(32, 'spacebar');
    addKey(90, 'a');
    addKey(88, 'b');

    this.handleKeyDown = e => {
      this.setKeyFromKeyCode(e.keyCode, true);
    };
    this.handleKeyUp = e => {
      this.setKeyFromKeyCode(e.keyCode, false);
    };
  }

  addListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  removeListeners() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  update() {
    for (const keyState of Object.values(this.keys)) {
      if (keyState.justPressed) {
        keyState.justPressed = false;
      }
    }
  }
}

export default InputManager;
