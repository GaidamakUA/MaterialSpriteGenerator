const SexEnum = Object.freeze({
  FEMALE: "female",
  MALE: "male"
});
const RaceEnum = Object.freeze({
  HUMAN: "human",
  ORC: "orc",
  SKELETON: "skeleton"
})

let SELECTED_SEX = SexEnum.MALE;
const DEFAULT_RACE = RaceEnum.HUMAN;

let SELECTED_RACE = RaceEnum.HUMAN;

function setSelectedSex(sex) {
  $('#female')[0].className = "btn btn-outline-primary";
  $('#male')[0].className = "btn btn-outline-primary";
  $(`#${sex}`).addClass('btn-primary').removeClass('btn-outline-primary');
  SELECTED_SEX = sex;
  syncUi();
}

function setSelectedRace(race) {
  SELECTED_RACE = race;
  syncUi();
}

class RaceComponent {
  constructor(raceEnum, allowedSexes) {
    this.race = raceEnum;
    this.allowedSexes = allowedSexes;
    this.button = $(`#${this.race}`)[0]
    console.log(this)
  }

  syncUi() {
    let satisfyConstraints = this.allowedSexes.includes(SELECTED_SEX);
    let isSelected = SELECTED_RACE === this.race
    this.button.disabled = !satisfyConstraints;
    this.button.className = isSelected && satisfyConstraints ? "btn btn-primary" : "btn btn-outline-primary";
    if (isSelected && !satisfyConstraints) {
      SELECTED_RACE = DEFAULT_RACE;
      syncUi();
    }
  };
}

let raceUiComponents

function createRaceUi() {
  raceUiComponents = [
    new RaceComponent(RaceEnum.HUMAN, [SexEnum.MALE, SexEnum.FEMALE]),
    new RaceComponent(RaceEnum.ORC, [SexEnum.MALE, SexEnum.FEMALE]),
    new RaceComponent(RaceEnum.SKELETON, [SexEnum.MALE])
  ]
}

function syncUi() {
  painter.clear();
  raceUiComponents.forEach(function(component) {
    component.syncUi()
  })
  let pictureName = `${SELECTED_SEX}_${SELECTED_RACE}.png`;
  painter.drawImage(pictureName);
}

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

  painter.drawImage('male_human.png');
  createRaceUi()
}
window.onload = setup;
