const imageId = document.getElementById("imageHere");
const clickButton1 = document.getElementById("click1");
const clickButton2 = document.getElementById("click2");
const clickStats1 = document.getElementById("clickUp1");
const clickStats2 = document.getElementById("clickUp2");
const autoButton1 = document.getElementById("auto1");
const autoButton2 = document.getElementById("auto2");
const autoStats1 = document.getElementById("autoUp1");
const autoStats2 = document.getElementById("autoUp2");
const total = document.getElementById("firefliesTotal");
const ffOverTime = document.getElementById("ffOver");
const ffOnClick = document.getElementById("ffOnClick");

const clickUpgrades = [
  {
    name: "flyCatcher",
    value: 1,
    amount: 0,
    cost: 10,
    type: "dmg",
  },
  {
    name: "electricCatcher",
    value: 5,
    amount: 0,
    cost: 20,
    type: "dmg",
  },
  {
    name: "lantern",
    amount: 0,
    value: 3,
    cost: 20,
    type: "time",
  },
  {
    name: "megaLight",
    amount: 0,
    value: 10,
    cost: 50,
    type: "time",
  },
  {
    name: "electricity",
    amount: 0,
    cost: 5000000,
    value: 500,
    type: "interval",
  },
];
let fireFlyTotal = 0;
let maxTotal = 0;

let clickValue = 1;

let autoClickValue = 0;

var interNum = 1000;

function clickFirefly() {
  fireFlyTotal += clickValue;
  maxTotal += clickValue;
  updateText();
  console.log(clickValue, fireFlyTotal);
}

// function autoClick(val) {
//   clickValue;
// }
function updateText() {
  // @ts-ignore
  document.getElementById("cost1").innerText = Math.floor(
    clickUpgrades[0].cost
  );
  document.getElementById("cost2").innerText = Math.floor(
    clickUpgrades[1].cost
  );
  document.getElementById("cost3").innerText = Math.floor(
    clickUpgrades[2].cost
  );
  document.getElementById("cost4").innerText = Math.floor(
    clickUpgrades[3].cost
  );
  document.getElementById("timer-icon").innerText = interNum / 1000;

  document.getElementById("maxTotal").innerText = Math.floor(maxTotal);

  // NOTE these don't work the way id like them too
  if (clickUpgrades[0].cost > fireFlyTotal) {
    clickButton1.classList.add("disabled");
  } else {
    clickButton1.classList.remove("disabled");
  }

  if (clickUpgrades[1].cost > fireFlyTotal) {
    clickButton2.classList.add("disabled");
  } else {
    clickButton2.classList.remove("disabled");
  }

  if (clickUpgrades[2].cost > fireFlyTotal) {
    autoButton1.classList.add("disabled");
  } else {
    autoButton1.classList.remove("disabled");
  }

  if (clickUpgrades[3].cost > fireFlyTotal) {
    autoButton2.classList.add("disabled");
  } else {
    autoButton2.classList.remove("disabled");
  }

  total.innerText = Math.floor(fireFlyTotal);
  // @ts-ignore
  clickStats1.innerText = clickUpgrades[0].amount;
  // @ts-ignore
  clickStats2.innerText = clickUpgrades[1].amount;
  autoStats1.innerText = clickUpgrades[2].amount;
  autoStats2.innerText = clickUpgrades[3].amount;
  ffOverTime.innerText = autoClickValue;

  // @ts-ignore
  ffOnClick.innerText = Math.floor(clickValue);
}

function manualClick(name) {
  let clickers = clickUpgrades.find((c) => c.name == name);

  if (fireFlyTotal >= clickers.cost) {
    fireFlyTotal -= clickers.cost;
    clickers.amount++;
    clickers.cost += clickers.cost * 1.5;
    // STUB condition ONE
    if (clickers.type == "dmg") {
      clickValue += clickers.value;
      console.log(clickValue);
    }
    // STUB condition TWO
    else if (clickers.type == "time") {
      autoClickValue += clickers.value;

      // STUB condition THREE
      // NOTE this doesn't work as intended need to figure out a way to update an interval in setinterval a looping set timeout wasn't working either
    } else if (interNum > 500) {
      interNum -= clickers.value;
    }
  }
  updateText();
}

function autoClick() {
  fireFlyTotal += autoClickValue;
  maxTotal += autoClickValue;
  updateText();
}
setInterval(autoClick, interNum);
