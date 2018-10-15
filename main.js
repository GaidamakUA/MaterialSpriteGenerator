var SexEnum = Object.freeze({
  "female": 0,
  "male": 1
});
var RaceEnum = Object.freeze({
  "human": 0,
  "orc": 1,
  "skeleton": 2
})

let RACE_STATE = RaceEnum.human;

var SEX_STATE = SexEnum.male;

function setup() {
  var canvas = document.getElementById('spritesheet');
  painter = {
    width: canvas.width,
    height: canvas.height,
    ctx: canvas.getContext('2d'),
    drawImage: function(url) {
      var ctx = this.ctx;
      var image = new Image();
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };
      image.src = url;
    },
    clear: function() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  initSexSwitch(painter)

  painter.drawImage('male_human.png');
}
window.onload = setup;

function initSexSwitch(painter) {
  var femaleConfig = {
    button: document.getElementById('female'),
    image: 'human_female.png',
    state: SexEnum.female
  }
  var maleConfig = {
    button: document.getElementById('male'),
    image: 'human_male.png',
    state: SexEnum.male
  }
}

function switchSex(sex) {
  painter.clear();
  $('#female')[0].className = "btn btn-outline-primary";
  $('#male')[0].className = "btn btn-outline-primary";
  $(`#${sex}`).addClass('btn-primary').removeClass('btn-outline-primary');
  switch (sex) {
    case 'male':
      painter.drawImage('male_human.png');
      SEX_STATE = SexEnum.male;
      break;
    case 'female':
      painter.drawImage('female_human.png');
      SEX_STATE = SexEnum.female;
      break;
  }
}

function switchRace(race) {
  console.log('switch to race', race);
  painter.clear();
  $('#human')[0].className = "btn btn-outline-primary";
  $('#orc')[0].className = "btn btn-outline-primary";
  $('#skeleton')[0].className = "btn btn-outline-primary";
  $(`#${race}`).addClass('btn-primary').removeClass('btn-outline-primary');
  let currentSexValue = Object.keys(SexEnum).filter(sex => SexEnum[sex] === SEX_STATE)[0];
  let pictureName = `${currentSexValue}_${race}.png`;
  switch (race) {
    case 'human':
        RACE_STATE = RaceEnum.human;
        break;
    case 'orc':
        RACE_STATE = RaceEnum.orc;
        break;
    case 'skeleton':
        RACE_STATE = RaceEnum.skeleton;
        pictureName = `male_${race}.png`;
        break;
  }
  painter.drawImage(pictureName);

}
