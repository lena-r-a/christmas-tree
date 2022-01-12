import './media.scss';
import BaseComponent from '../../base-component';

export let isPlay = localStorage.getItem('isPlay') ? JSON.parse(localStorage.getItem('isPlay')!) : false;

const audio = document.querySelector('audio') as HTMLAudioElement;
audio.src = 'https://raw.githubusercontent.com/lena-r-a/christmas/master/asset/audio/audio.mp3';
audio.loop = true;
window.addEventListener('click', () => {
  audio.muted = false;
  if (isPlay) audio.play();
});

class Media extends BaseComponent {
  soundButton: BaseComponent;

  snowButton: BaseComponent;

  constructor() {
    super('div', ['media-settings']);
    this.soundButton = new BaseComponent('button', ['settings-button', 'sound-button']);
    this.snowButton = new BaseComponent('button', ['settings-button', 'snow-button']);
    this.element.append(this.soundButton.element);
    this.element.append(this.snowButton.element);
    this.soundButton.element.addEventListener('click', (e) => this.toggleAudio(e, audio));
    if (isPlay) this.soundButton.element.classList.add('active');
  }

  toggleAudio(e: Event, audioElement: HTMLAudioElement): void {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (isPlay) {
      isPlay = false;
      target.classList.remove('active');
      audioElement.pause();
    } else {
      isPlay = true;
      target.classList.add('active');
      audioElement.play();
      audioElement.muted = false;
    }
    localStorage.setItem('isPlay', JSON.stringify(isPlay));
  }

  createSnowFlake(el: HTMLElement): void {
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('fas');
    snowFlake.classList.add('fa-snowflake');
    snowFlake.style.left = 25 + Math.random() * 50 + '%';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snowFlake.style.opacity = String(Math.random());
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';

    el.appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  offMusic(): void {
    isPlay = false;
    audio.pause();
    this.soundButton.element.classList.remove('active');
  }
}

export default Media;
