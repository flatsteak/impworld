const KeyMap: Record<string, string> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

export function mapKey(e: KeyboardEvent) {
  return KeyMap[e.key] || e.key;
}
