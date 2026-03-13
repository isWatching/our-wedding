import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Phaser from 'phaser';
import { EventBus } from '../game/EventBus';
import { MainScene } from '../game/scenes/MainScene';

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene }, ref) {
  const game = useRef(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: 375,
        height: 725,
        pixelArt: true,
        scene: [MainScene],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
          },
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        audio: {
          noAudio: true
        },
      });

      if (ref !== null) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = null;
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene_instance) => {
      if (currentActiveScene && typeof currentActiveScene === 'function') {
        currentActiveScene(scene_instance);
      }

      if (ref !== null) {
        ref.current.scene = scene_instance;
      }
    });

    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, [currentActiveScene, ref]);

  return <div id="phaser-game" className="w-full h-full" />;
});
