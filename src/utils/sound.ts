// Lightweight Audio stub - disabled per user request
class SoundManager {
  public enabled: boolean = false;

  playSend() {}
  playReceive() {}
  playTap() {}
}

export const soundManager = new SoundManager();

