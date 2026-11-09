// TV Living Room (Immortal & Restless), 8-Bit Decay, and Springtrap Finale Scenes
// Faithful translation of Unity TvAndFinaleCutscenesScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class TvLivingRoomScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.episode = 1;
    this.returnToExtras = false;
    this.timer = 0;
    this.popcornMunchAnim = 0;
    this.ennardDragX = 1320;
  }

  enter(parameters) {
    this.episode = parameters && parameters.episode ? parameters.episode : 1;
    this.returnToExtras = parameters && parameters.returnToExtras ? parameters.returnToExtras : false;
    this.timer = 0;
    this.popcornMunchAnim = 0;
    this.ennardDragX = 1320;

    this.audio.clearDialogue();
    this.audio.startAmbientLoop('casual_bongos', 0.14);
    this.queueEpisodeDialogue(this.episode);
  }

  queueEpisodeDialogue(ep) {
    if (ep === 1) {
      this.audio.speak('TV Announcer', 'As the sun sets, so also does another chapter in the saga of The Immortal and the Restless!', 'Announcer', 4.5, true);
      this.audio.speak('Clara', "Vlad, you can't keep doing this! The baby is yours!", 'Clara', 4.0, false);
      this.audio.speak('Vlad', "Clara, I tell you, the baby isn't mine! Count the toes, that's no vampire baby!", 'Vlad', 4.8, false);
      this.audio.speak('Clara', "He turns into a bat when he's angry, Vlad! And he only drinks blood-red cranberry juice!", 'Clara', 4.8, false);
      this.audio.speak('Vlad', "Lots of kids do that! Look, I'm a busy undead creature of the night, I don't have time for child support!", 'Vlad', 5.2, false);
    } else if (ep === 2) {
      this.audio.speak('TV Announcer', 'Welcome back to The Immortal and the Restless!', 'Announcer', 3.8, true);
      this.audio.speak('Clara', 'Vlad! The baby burned down the nursery and slept in the ceiling rafters!', 'Clara', 4.5, false);
      this.audio.speak('Vlad', "Honestly Clara, boys will be boys! Maybe he's just an enthusiastic acrobat!", 'Vlad', 4.5, false);
      this.audio.speak('Clara', "Then I'm taking the car, and I'm taking the diamond ring!", 'Clara', 4.2, false);
      this.audio.speak('Vlad', 'Not the station wagon, Clara!', 'Vlad', 3.8, false);
    } else if (ep === 3) {
      this.audio.speak('TV Announcer', 'Tonight on The Immortal and the Restless: passions ignite!', 'Announcer', 4.0, true);
      this.audio.speak('Vlad', 'Clara, I couldn’t stay away. Your fiery temper warms my cold, undead heart.', 'Vlad', 4.5, false);
      this.audio.speak('Clara', 'Oh Vlad! I set your mansion on fire because I missed you so much!', 'Clara', 4.5, false);
      this.audio.speak('Vlad', 'Wait, you burned down my ancestral manor?!', 'Vlad', 3.8, false);
      this.audio.speak('Clara', 'Kiss me, you fool!', 'Clara', 3.5, false);
    } else {
      this.audio.speak('TV Announcer', 'The season finale of The Immortal and the Restless, sponsored by Exotic Butters!', 'Announcer', 4.8, true);
      this.audio.speak('Vlad', "Clara, I've finally accepted the boy. Look how gracefully he hisses at the sun.", 'Vlad', 4.8, false);
      this.audio.speak('Clara', "Oh Vlad, we're one big happy dysfunctional nocturnal family at last!", 'Clara', 4.8, false);
    }
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.popcornMunchAnim > 0) this.popcornMunchAnim -= deltaTime;

    // Episode 4 Ennard dragging
    if (this.episode === 4 && this.timer >= 12.5) {
      if (this.ennardDragX > 960) {
        this.ennardDragX -= 110 * deltaTime;
      }
    }

    if (this.timer >= 24.0) {
      if (this.returnToExtras) {
        this.router.transitionTo(SceneId.EXTRAS_MENU);
      } else if (this.episode === 4) {
        this.router.transitionTo(SceneId.TITLE_MENU);
      } else {
        this.router.transitionTo(SceneId.PRE_NIGHT_INTERLUDE, { night: this.state.state.currentNight });
      }
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#0a0914');

    // TV Set
    canvas.fillRect(400, 100, 480, 360, '#1e293b');
    canvas.strokeRect(400, 100, 480, 360, 6, '#475569');

    // TV Screen content
    canvas.fillRect(420, 120, 440, 320, '#172554');
    canvas.drawText(`THE IMMORTAL AND THE RESTLESS — EPISODE ${this.episode}`, 440, 140, 16, '#93c5fd');

    // Vlad & Clara silhouettes on TV
    canvas.fillRect(460, 240, 90, 160, '#1e1b4b');
    canvas.fillRect(720, 260, 80, 140, '#831843');

    // Popcorn bowl on table
    canvas.fillRect(560, 540, 160, 80, '#fef08a');
    canvas.strokeRect(560, 540, 160, 80, 4, '#ca8a04');
    canvas.drawText('POPCORN', 590, 570, 18, '#854d0e');

    if (this.popcornMunchAnim > 0) {
      canvas.drawText('*MUNCH MUNCH*', 560, 510, 16, '#facc15');
    }

    // Episode 4 Ennard dragging into room
    if (this.episode === 4 && this.timer >= 12.5) {
      canvas.drawAnimatronicHead('ennard', this.ennardDragX, 580, 0.9, 0.2);
    }

    if (canvas.button(560, 640, 160, 42, 'EAT POPCORN', '#ca8a04', '#ffffff', 14)) {
      this.popcornMunchAnim = 0.8;
      this.audio.playSfx('chime', 0.6);
    }

    if (canvas.button(1080, 40, 140, 40, 'SKIP >>', '#334155', '#ffffff', 14)) {
      if (this.returnToExtras) {
        this.router.transitionTo(SceneId.EXTRAS_MENU);
      } else if (this.episode === 4) {
        this.router.transitionTo(SceneId.TITLE_MENU);
      } else {
        this.router.transitionTo(SceneId.PRE_NIGHT_INTERLUDE, { night: this.state.state.currentNight });
      }
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.4);
  }

  exit() {}
}

export class Decay8BitCutsceneScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.stage = 1; // 1 to 7
    this.returnToExtras = false;
    this.timer = 0;
    this.michaelX = 140;
    this.regurgitated = false;
    this.stoodBackUp = false;
  }

  enter(parameters) {
    this.stage = parameters && parameters.stage ? parameters.stage : 1;
    this.returnToExtras = parameters && parameters.returnToExtras ? parameters.returnToExtras : false;
    this.timer = 0;
    this.michaelX = 140;
    this.regurgitated = false;
    this.stoodBackUp = false;

    this.audio.clearDialogue();
    this.audio.startAmbientLoop('casual_bongos', 0.15);
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.timer < 9.0) {
      this.michaelX += 85 * deltaTime;
    } else if (this.stage === 7) {
      // Stage 7: Collapses, vomits Ennard into sewer, hears whispers, rises back up!
      if (this.timer >= 9.5 && !this.regurgitated) {
        this.regurgitated = true;
        this.audio.playSfx('jumpscare', 0.6);
        this.audio.speak('Whisper', "You won't die... You won't die... You won't die...", 'CircusBaby', 5.0, true);
      }
      if (this.timer >= 15.0 && !this.stoodBackUp) {
        this.stoodBackUp = true;
        this.audio.playSfx('chime', 0.8);
      }
      if (this.timer >= 19.0) {
        this.finishScene();
      }
    } else if (this.timer >= 12.0) {
      this.finishScene();
    }
  }

  finishScene() {
    if (this.returnToExtras) {
      this.router.transitionTo(SceneId.EXTRAS_MENU);
    } else {
      this.router.transitionTo(SceneId.CUSTOM_NIGHT_MENU);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#020617');

    // Neighborhood sidewalk & houses
    canvas.fillRect(0, 480, 1280, 240, '#334155');
    canvas.fillRect(0, 480, 1280, 20, '#64748b');

    // Houses in background
    for (let h = 0; h < 4; h++) {
      canvas.fillRect(100 + h * 300, 240, 220, 240, '#1e293b');
      canvas.fillRect(130 + h * 300, 280, 50, 50, '#fef08a');
    }

    // Sewer drain
    canvas.fillRect(920, 500, 80, 40, '#0f172a');

    // Michael skin color decays from normal peach (1) to rotting purple (7)
    let skinCol = '#fbcfe8';
    if (this.stage === 2) skinCol = '#fed7aa';
    else if (this.stage === 3) skinCol = '#fef08a';
    else if (this.stage === 4) skinCol = '#86efac';
    else if (this.stage === 5) skinCol = '#6ee7b7';
    else if (this.stage === 6) skinCol = '#a855f7';
    else if (this.stage === 7) skinCol = '#581c87';

    const mx = this.michaelX;
    if (this.stage === 7 && this.timer >= 9.0 && !this.stoodBackUp) {
      // Collapsed on sidewalk
      canvas.fillRect(mx, 510, 80, 30, skinCol);
      if (this.regurgitated) {
        // Ennard wires disappearing down sewer drain
        canvas.fillRect(940, 480, 40, 30, '#475569');
      }
    } else {
      // Walking Michael
      canvas.fillRect(mx, 380, 36, 120, '#1e3a8a'); // Blue trousers / shirt
      canvas.fillRect(mx + 4, 340, 28, 40, skinCol); // Head
      canvas.fillRect(mx + 6, 355, 6, 6, '#000000'); // Eye
    }

    canvas.drawText(`MICHAEL AFTON — 8-BIT DECAY SEQUENCE (STAGE ${this.stage}/7)`, 260, 40, 20, '#facc15', 'center', 800, 40);

    if (canvas.button(1080, 40, 140, 40, 'SKIP >>', '#334155', '#ffffff', 14)) {
      this.finishScene();
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.4);
  }

  exit() {}
}

export class SpringtrapFinaleScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;
    this.timer = 0;
  }

  enter() {
    this.timer = 0;
    this.audio.clearDialogue();
    this.audio.speak(
      'Michael Afton',
      "Father. It's me, Michael. I did it. I found it. It was right where you said it would be. They were all there. They didn't recognize me at first, but then, they thought I was you. And I found her. I put her back together, just like you asked me to. She's free now. But something is wrong with me. I should be dead. But I'm not. I've been living in shadows. There is only one thing left for me to do now. I'm going to come find you. I'm going to come find you.",
      'MichaelAfton',
      24.0,
      true
    );
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.timer >= 26.0) {
      this.state.state.starsUnlocked.star4_goldenFreddyVHard = true;
      this.state.save();
      this.router.transitionTo(SceneId.TITLE_MENU);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#050302');

    // Fazbear's Fright charred rubble
    canvas.fillRect(100, 420, 1080, 260, '#1c1917');
    for (let r = 0; r < 14; r++) {
      const rx = 120 + r * 75;
      const rh = 60 + (r * 17) % 110;
      canvas.fillRect(rx, 420 - rh, 40, rh, '#292524');
    }

    // Springtrap rises in background rubble
    if (this.timer >= 12.0) {
      const rise = Math.min(1.0, (this.timer - 12.0) / 8.0);
      const sy = 400 - rise * 120;
      canvas.drawAnimatronicHead('yenndo', 640, sy, 1.45, 0.25, 0.4, false);
      canvas.drawText('SPRINGTRAP RISES FROM THE ASHES', 440, 80, 22, '#ca8a04', 'center', 400, 40);
    }

    canvas.drawText('GOLDEN FREDDY 10/20 FINALE — ★ STAR 4 UNLOCKED', 340, 30, 22, '#facc15', 'center', 600, 40);

    if (canvas.button(1080, 40, 140, 40, 'SKIP >>', '#334155', '#ffffff', 14)) {
      this.state.state.starsUnlocked.star4_goldenFreddyVHard = true;
      this.state.save();
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    canvas.drawCrtScanlinesAndStatic(0.18, 0.5);
  }

  exit() {}
}

