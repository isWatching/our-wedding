import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
// import gentlemanSprite from '../../Tilesheets/gentleman.png';
// import gentlemanAtlas from '../../Tilesheets/gentleman.json';
import bg1 from '../../assets/nature_1/1.png';
import bg2 from '../../assets/nature_1/2.png';
import bg3 from '../../assets/nature_1/3.png';
import bg5 from '../../assets/nature_1/5.png';
import bg6 from '../../assets/nature_1/6.png';
import bg7 from '../../assets/nature_1/7.png';
import bg8 from '../../assets/nature_1/8.png';
import bg10 from '../../assets/nature_1/10.png';
import we from '../../assets/Tilesheets/we.png';
import Text from '../../assets/Tilesheets/text.png';

export class MainScene extends Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('background1', bg1);
    this.load.image('background2', bg2);
    this.load.image('background3', bg3);
    this.load.image('background5', bg5);
    this.load.image('background6', bg6);
    this.load.image('background7', bg7);
    this.load.image('background8', bg8);
    this.load.image('background10', bg10);
    this.load.image('text', Text);

    
    this.load.spritesheet('we', we, {
      frameWidth: 256,
      frameHeight: 256
    });

    this.objects = {}
  }

  create() {

    this.objects.camera = this.cameras.main;
    
    const centerX = this.game.scale.width / 2;
    const centerY = this.game.scale.height / 2;

    this.objects.image1 = this.add.image(centerX, centerY, 'background1');
    this.objects.image2 = this.add.image(centerX, centerY, 'background2');
    this.objects.image3 = this.add.image(centerX, centerY, 'background3');
    this.objects.image5 = this.add.image(centerX, centerY, 'background5');
    this.objects.image6 = this.add.image(centerX, centerY, 'background6');
    this.objects.image7 = this.add.image(centerX, centerY, 'background7');
    this.objects.image8 = this.add.image(centerX, centerY, 'background8');
    this.objects.image10 = this.add.image(centerX, centerY, 'background10');
    

    this.anims.create({
      key: 'we_idle',
      frames: this.anims.generateFrameNumbers('we', { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1
    });
    
    this.objects.weSprite = this.add.sprite(550, 500, 'we');
    this.objects.weSprite.play('we_idle');
    this.objects.weSprite.setScale(0.8);
    this.objects.weSprite.setDepth(8);
    this.objects.weSprite.setScrollFactor(0.9);

    this.imageConfigs = [
      { img: this.objects.image1, depth: 0, scrollFactor: 0.2 },
      { img: this.objects.image2, depth: 1, scrollFactor: 0.3 },
      { img: this.objects.image3, depth: 2, scrollFactor: 0.4 },
      { img: this.objects.image5, depth: 3, scrollFactor: 0.5 },
      { img: this.objects.image6, depth: 4, scrollFactor: 0.6 },
      { img: this.objects.image7, depth: 5, scrollFactor: 0.7 },
      { img: this.objects.image8, depth: 6, scrollFactor: 0.8 },
      { img: this.objects.image10, depth: 7, scrollFactor: 0.9 }
    ];

    this.zoomLevel = 1;
    
    this.updateImageSizes();

    this.cameras.main.setZoom(this.zoomLevel)
    this.cameras.main.scrollX = -10

    this.scale.on('resize', this.onResize, this);

    this.objects.jinheeText = this.add.image(545, 330, 'text');
    this.objects.jinheeText.setScale(1.5);
    this.objects.jinheeText.setDepth(10);
    this.objects.jinheeText.setScrollFactor(0.9);

    this.objects.wookText = this.add.image(535, 330, 'text');
    this.objects.wookText.setScale(1.5);
    this.objects.wookText.setDepth(10);
    this.objects.wookText.setScrollFactor(0.9);
    
    const textWidth = this.objects.jinheeText.width;
    const textHeight = this.objects.jinheeText.height;
    this.objects.jinheeText.setCrop(textWidth / 2, 0, textWidth / 2, textHeight);
    this.objects.wookText.setCrop(0, 0, textWidth / 2, textHeight);

    this.objects.jinheeText.setVisible(false);
    this.objects.wookText.setVisible(false);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameraSpeed = 1.5;

    this.elapsedTime = 0;

  }

  updateImageSizes() {
    this.imageConfigs.forEach(({ img, depth, scrollFactor }) => {
      const scaleX = this.game.scale.width / img.width;
      const scaleY = this.game.scale.height / img.height;
      const baseScale = Math.max(scaleX, scaleY);
      
      const depthScaleMultiplier = 1 + (1 - scrollFactor) * 0.3;
      const finalScale = baseScale * depthScaleMultiplier;
      
      img.setScale(finalScale);
      img.setDepth(depth);
      img.setScrollFactor(scrollFactor);
    });
  }

  onResize(gameSize) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.objects.camera.setSize(width, height);
    this.updateImageSizes();
  }

  update(time, delta) {
    if (this.objects.camera.scrollX < 400) {
      this.objects.camera.scrollX += this.cameraSpeed;
    } else {
      this.objects.camera.scrollX = 400;
      
    }

    this.elapsedTime += delta;

    if (this.elapsedTime >= 5000) {
      this.objects.jinheeText.setVisible(true);
      this.objects.wookText.setVisible(true);
    }
  }
}
