export class ToggleSet<T> extends Set<T> {
  toToggled(value: T) {
    const result = new ToggleSet(this)
    if (result.has(value)) {
      result.delete(value)
    }
    else {
      result.add(value)
    }

    return result
  }
}
