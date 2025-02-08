import photo_profile from "./photo-profile2.svg";
import logo from "./logo.png";
import start from "./start.png";
import confetti from "canvas-confetti";

export const assets = {
  photo_profile,
  logo,
  start,
};

export const audio = {
  clap: new Audio(
    "https://res.cloudinary.com/dszbo6z9j/video/upload/v1738912116/clapping_Audio_Trimmer_com_d3d1cbb020.mp3"
  ),
  shuffle: new Audio(
    "https://res.cloudinary.com/dszbo6z9j/video/upload/v1738989570/slowed_shuffle_2d8b851f3f.mp3"
  ),
  trumpet: new Audio(
    "https://res.cloudinary.com/dszbo6z9j/video/upload/v1738912176/SOUND_EFEK_TEROMPET_TEWTTETETETETEWT_MP_3_39c64ea45b.mp4"
  ),
};

export const fireConfetti = () => {
  // Stars
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);

  // School Pride
  const end = Date.now() + 3 * 1000;

  // go Buckeyes!
  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
