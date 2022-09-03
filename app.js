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

let fireFlyTotal = 0;

let clickValue = 1;

const clickUpgrades = [
  {
    name: "flyCatcher",
    clickValue: 1,
    amount: 0,
    cost: 10,
    type: "dmg",
  },
  {
    name: "electricCatcher",
    clickValue: 5,
    amount: 0,
    cost: 20,
    type: "dmg",
  },
  {
    name: "lantern",
    amount: 0,
    clickValue: 3,
    cost: 20,
    type: "time",
  },
  {
    name: "megaLight",
    amount: 0,
    clickValue: 10,
    cost: 50,
    type: "time",
  },
];

function clickFirefly() {
  fireFlyTotal += clickValue;
  updateText();
  console.log(clickValue, fireFlyTotal);
}

// function autoClick(val) {
//   clickValue;
// }
function updateText() {
  // @ts-ignore
  document.getElementById("cost1").innerText = clickUpgrades[0].cost;
  document.getElementById("cost2").innerText = clickUpgrades[1].cost;
  document.getElementById("cost3").innerText = clickUpgrades[2].cost;
  document.getElementById("cost4").innerText = clickUpgrades[3].cost;
  if (clickUpgrades[3].cost > fireFlyTotal) {
    document.getElementById("cost3").classList.toggle("hidden");
  }

  // clickUpgrades.forEach(clickUpgrade=> )
  // if(clickUpgrade<0)
  // document.querySelectorAll('btn').classlist.remove('disabled')

  let buttons = document.querySelectorAll("btn");
  let crazies = clickUpgrades;

  clickUpgrades.forEach((clickUpgrade) => {
    if (clickUpgrade.cost > fireFlyTotal) {
      buttons.forEach((button) => {
        button.classList.toggle("hidden");
        console.log("hello");
      });
    }
  });

  total.innerText = fireFlyTotal;
  // @ts-ignore
  clickStats1.innerText = clickUpgrades[0].amount;
  // @ts-ignore
  clickStats2.innerText = clickUpgrades[1].amount;
  autoStats1.innerText = clickUpgrades[2].amount;
  autoStats2.innerText = clickUpgrades[3].amount;

  // @ts-ignore
  ffOnClick.innerText = clickValue;
}

function allClick(name) {
  let clicker = clickUpgrades.find((c) => c.name == name);
  console.log(clicker);

  if (fireFlyTotal >= clicker.cost) {
    fireFlyTotal -= clicker.cost;
    clicker.amount++;
    clicker.cost += clicker.cost * 1.5;
  } else if (clicker.type == "dmg") {
    clickValue += clicker.clickValue;
  }
  updateText();
}

function applyClick() {
  clickUpgrades.forEach((clickUpgrade) => {
    if (clickUpgrade.amount > 0) {
      console.log("disabled");
      if (clickUpgrade.type == "time") {
        fireFlyTotal += clickUpgrade.clickValue;
        console.log(clickUpgrade.clickValue);
        // NOTE good try here but no
        //  clickUpgrade.forEach((upgrade) => {
        //   ffOverTime.innerText = clickUpgrade.clickValue * clickUpgrade.amount;
        // // ffOverTime.innerText = clickUpgrade.clickValue * clickUpgrade.amount;
        // })
      }
    }
    updateText();
  });
}

setInterval(applyClick, 1000);
