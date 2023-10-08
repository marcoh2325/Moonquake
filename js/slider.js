import coords from '../seismdata.json';//assert { type: 'json' };
// Content setup
let years = [...Array(19).keys()].slice(1);
years = years.map(x => x + 1967);

// Define an array to store the number of months per year (default is 12 months)
let monthsPerYear = new Array(years.length).fill(12);

function makeDiv(x, class_) {
  let div = document.createElement("div");
  div.classList.add(class_);
  div.innerHTML = x;

  return div;
}

let timeline = document.getElementsByClassName("timelineContainer")[0];

let monthID = 0;
years.forEach((y, yearIndex) => {
  let yearContainer = makeDiv("", "yearContainer");
  yearContainer.setAttribute("id", `${"y" + y}`);

  let yearDiv = makeDiv(`${y}`, "year");
  let monthContainer = makeDiv("", "monthContainer");

  // Use the number of months specified in monthsPerYear array
  for (let i = 0; i < monthsPerYear[yearIndex]; i++) {
    let monthDiv = makeDiv("|", "month");
    monthDiv.setAttribute("id", `${"m" + monthID}`);
    monthID++;

    monthContainer.appendChild(monthDiv);
  }

  yearContainer.appendChild(yearDiv);
  yearContainer.appendChild(monthContainer);
  timeline.append(yearContainer);
});

// Update the number of months when the user manually changes it
function updateMonthsPerYear(yearIndex, newMonthCount) {
  if (yearIndex >= 0 && yearIndex < monthsPerYear.length) {
    monthsPerYear[yearIndex] = newMonthCount;
    timeline.innerHTML = ""; // Clear the timeline
    monthID = 0;

    years.forEach((y, index) => {
      let yearContainer = makeDiv("", "yearContainer");
      yearContainer.setAttribute("id", `${"y" + y}`);

      if (y < 1967) yearContainer.classList.add("notcovered");
      if (y > 1977) yearContainer.classList.add("notcovered");

      let yearDiv = makeDiv(`${y}`, "year");
      let monthContainer = makeDiv("", "monthContainer");

      for (let i = 0; i < monthsPerYear[index]; i++) {
        let monthDiv = makeDiv("|", "month");
        monthDiv.setAttribute("id", `${"m" + monthID}`);
        monthID++;

        monthContainer.appendChild(monthDiv);
      }

      yearContainer.appendChild(yearDiv);
      yearContainer.appendChild(monthContainer);
      timeline.append(yearContainer);
    });

    sizeMonths();
  }
}
// Example of how to update the number of months for a specific year (e.g., year 1967)
// updateMonthsPerYear(1, 6); // Set year 1967 to have 6 months
// updateMonthsPerYear(2, 10); // Set year 1967 to have 6 months
// updateMonthsPerYear(3, 3); // Set year 1967 to have 6 months
updateMonthsPerYear(0, 5); // Set year 1967 to have 6 months
updateMonthsPerYear(1, 1); // Set year 1967 to have 6 months
updateMonthsPerYear(2, 1); // Set year 1967 to have 6 months
updateMonthsPerYear(3, 4); // Set year 1967 to have 6 months
updateMonthsPerYear(4, 14); // Set year 1967 to have 6 months
updateMonthsPerYear(5, 9); // Set year 1967 to have 6 months
updateMonthsPerYear(6, 7); // Set year 1967 to have 6 months
updateMonthsPerYear(7, 6); // Set year 1967 to have 6 months
updateMonthsPerYear(8, 7); // Set year 1967 to have 6 months
updateMonthsPerYear(9, 9); // Set year 1967 to have 6 months
updateMonthsPerYear(10, 9); // Set year 1967 to have 6 months
updateMonthsPerYear(11, 1); // Set year 1967 to have 6 months


// Right-click functionality to go to a specific position on the timeline
document.querySelectorAll('.month').forEach((month, index) => {
  month.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Calculate the target offset based on the clicked month
    const targetMonthID = `m${index}`;
    const targetOffset = calculateOffset(targetMonthID);

    // Set the new left offset of the timeline
    timeline.style.left = `${targetOffset}px`;

    // Size the months accordingly
    sizeMonths();
  });
});

let minOffset = calculateOffset("y1967");
let maxOffset = calculateOffset("y1977");
timeline.style.left = `${minOffset}px`;
sizeMonths();



// scroll setup
let isDown = false;
let startX;
let scrollLeft;

function handleDown(e) {
  isDown = true;
  timeline.classList.add('active');
  startX = e.screenX;
  scrollLeft = parseInt(timeline.style.left);
}

function handleOff(e) {
  isDown = false;
  timeline.classList.remove('active');
}

function handleMove(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.screenX;
  const walk = (x - startX) * 1;
  let offset = Math.floor(scrollLeft + walk);
  offset = offset > minOffset ? minOffset : offset;
  offset = offset < maxOffset ? maxOffset : offset;
  timeline.style.left = `${offset}px`;

  sizeMonths();
}

timeline.addEventListener('pointerdown', (e) => { handleDown(e) });
timeline.addEventListener('pointerleave', (e) => { handleOff(e) });
timeline.addEventListener('pointerup', (e) => { handleOff(e) });
timeline.addEventListener('pointermove', (e) => { handleMove(e) });

window.addEventListener('resize', (e) => {
  minOffset = calculateOffset("y1967");
  maxOffset = calculateOffset("y1977");
  timeline.style.left = `${minOffset}px`;
  sizeMonths();
});

function resizeText(textDiv) {
  let xOffset = textDiv.getBoundingClientRect().x;
  let xMid = window.innerWidth / 2.08;
  let distance = Math.abs(xMid - xOffset);
  let textSize = 200 - (distance);
  textSize = textSize < 100 ? 100 : textSize;

  return `${Math.floor(textSize)}%`;
}

function sizeMonths() {
  let allMonths = [...document.getElementsByClassName("month")];
  allMonths.forEach(m => {
    m.style.fontSize = resizeText(m);
  });
}

function calculateOffset(id) {
  let xMid = window.innerWidth / 2;

  let year = document.getElementById(id);
  let timeline = document.getElementsByClassName("timelineContainer")[0];

  if (year && timeline) {
    let yearX = year.getBoundingClientRect().left;
    let tlX = timeline.getBoundingClientRect().left;

    return Math.floor(tlX - (yearX - xMid));
  }

  return 0; // Return a default offset if the elements are not found
}

// Function to scroll to a specific month index
function scrollToMonth(monthIndex) {
  const targetMonthID = `m${monthIndex}`;
  const targetOffset = calculateOffset(targetMonthID);
  timeline.style.left = `${targetOffset}px`;
  sizeMonths();
}
fillData();
var actualLat;
var actualLon;
function fillData(){
  var dates = document.getElementsByClassName('month');
  var j = 0;
  for (var i=5;i<coords.length;i++)
  {
    dates[i].setAttribute("lat",coords[j].Lat);
    dates[i].setAttribute("lon",coords[j].Long);
    actualLat = coords[i].Lat;
    actualLon = coords[i].Long;
    dates[i].onclick = function (event){
      console.log(event);
      postMessage([event.srcElement.getAttribute("lat"),event.srcElement.getAttribute("lon")],location.origin);
    }
    j++;
  }
}